# Creating a third-person zombie shooter with DOTS

> [slides](https://www.slideshare.net/unity3d/creating-a-thirdperson-zombie-horde-shooter-using-dots-unite-copenhagen)

Far North Entertainment is working on a third-person zombie horde shooter with DOTS. Two goals for this presentation:

1. Someone who's not familiar with DOTS will get an understanding of DOTS concepts and why they are powerful
2. To show an example of how they took DOTS and implemented it.

Three parts:

1. Gameplay footage
2. Introducing DOTS
   - Prelude & planning
   - Static world objects
   - Enemy updates
3. Conclusion

## Project FNZ

> Looks like strategy/world building + tower defense … it's a survival game at it's core

Massive hordes of zombies (thousands and thousands) + multi-player (coop), needs planning, communication. Procedurally generated (tile based) world. Modding support … XML-based items/data.

Architecture of their game engine:

- MVC pattern (view is client, controller is server)
- Server calculates & sends "model subset"
- Client observes & updates view (bottleneck is here)
- Tick vs. frame rate
- View bottleneck

Does DOTS make sense?

- Entities are _really_ simple (fits the problem really well)
- Start small: world objects
- Then: enemies

### Trees first

- Tree data:
  - position: `Vector2`
  - z-rotation: `float`
  - scale: `float`
  - 3d mesh & material
- Tree archetype
  - `LocalToWorld` (unique: transform)
  - `RenderMesh` (shared: model & material)

```cs
EntityArchetype StaticWorldObjectArchetype = entityManagerCreateArchetype(
  typeof(LocalToWorld),
  typeof(RenderMesh)
)
```

`ArchetypeChunk` contains sets of arrays: an entity array, a `LocalToWorld` array … each tree is an index into those arrays.

```cs
privat static void SetComponentData(EntityManager entityManager, Entity entityView, FNEEntity entityModel)
{
  var meshRenderer = new RenderMesh();

  FNEEntityData objectData = DataBank.Instance.GetData<FNEEntityData>(entityModel.entityNameDef);
  GameObject prefab = PrefabBank.GetPrefab(objectData.prefabPath);
  meshRenderer.mesh = prefab.GetComponentInChildren<MeshFilter>().sharedMesh;
  meshRenderer.material = prefab.GetComponentInChildren<MeshRenderer>().sharedMaterial;
  meshRenderer.castShadows = UnityEngine.Rendering.ShadowCastingMode.On;

  var localToWorld = new LocalToWorld
  {
    Value = float4x4.TRS(
      (Vector3) entityModel.position,
      Quaternion.Euler(0, 180, entityModel.rotationZdegrees),
      prefab.GetComponentInChildren<MeshFilter>().transform.localScale
    )
  };

  entityManager.SetComponentData(entityView, localToWorld);
  entityManager.SetSharedComponentData(entityView, meshRenderer);
}
```

Instantiation becomes assigning data into pre-allocated `ArchetypeChunk`s rather than traditional instantiation cost.

Desruction becomes swapping data with a last known-living tree, and updating a "last living" / "first dead" marker.

### Zombies second

- Archetype
  - position & rotation
  - target position
  - 3d mesh
  - tag: enemy
  - _animation data_
- System (trees don't have this, replaces (kind of) `OnUpdate`)
  - position lerping
  - _animation updates_

Mentions a sample project about animation instancing in ECS by Nordeus and Unity in collaboration, but I can't find a link to it … maybe [this](https://github.com/Unity-Technologies/UniteAustinTechnicalPresentation)? [This](https://blogs.unity3d.com/2018/04/16/animation-instancing-instancing-for-skinnedmeshrenderer/) also seems related/relavent.

Queries describe the entities we want to fetch. Example:

```cs
public class EnemyMovementSystem : JobComponentSystem
{
  private EntityQuery m_Group;

  protected override void OnCreate()
  {
    base.OnCreate();

    var query = new EntityQueryDesc
    {
      All = new []
      {
        typeof(EnemyTransformData),
        ComponentType.ReadOnly<TargetPositionData>()
      },
    };

    m_Group = GetEntityQuery(query);
  }
}
```

#### Why data layout matters

- RAM x100
  - CPU
    - L3 Cache x20
      - L2 x5
        - L1 x1

(lower is better, numbers are "times slower" to look up) … with `MonoBehavior` & `GameObject` a lot of what's in the cache is junk (variables we don't need for the current update/operation)

The Job System "chunks chunks" into smaller chunks and distributes them across cores, and re-distributes if any core becomes idle. Code:

##### Scheduling:

```cs
protected override JobHandle OnUpdate(JobHandle inputDeps)
{
  var transformDataType = GetArchetypeChunkComponentType<EnemyTransformData>();
  var targetPositionDataType = GetArchetypeChunkComponentType<TargetPositionData>(true);

  var updatePosAndHeadingJob = new UpdatePositionAndHeadingJob
  {
    TransformDataType = transformDataType,
    TargetPositionDataType = targetPositionDataType,
    DeltaTime = Time.deltaTime,
    RotationLerpSpeed = 2.0f,
    MovementLerpSpeed = 4.0f,
  };

  return updatePosAndHeadingJob.Schedule(m_Group, inputDeps);
}
```

##### Execution:

```cs
public void Execute(ArchetypeChunk chunk, int chunkIndex, int firstEntityIndex)
{
  var chunkTransformData = chunk.GetNativeArray(TransformDataType);
  var chunkTargetPositionData = chunk.GetNativeArray(TargetPositionDataType);

  for (int i = 0; i < chunk.Count; i++)
  {
    var transformData = chunkTransformDataType[i];
    var targetPositionData = chunkTargetPositionDataType[i];

    float2 toTarget = target.TargetPosition - transformData.Position;
    float distance = math.length(toTarget);

    transformData.Heading = math.select(
      transformData.Heading,
      math.lerp(
        transformData.Heading,
        math.normalize(toTarget),
        math.mul(DeltaTime, RotationLerpSpeed)
      ),
      distance > 0.008
    );

    transformData.Position = math.select(
      target.TargetPosition,
      math.lerp(
        transformData.Position,
        target.TargetPosition,
        math.mul(DeltaTime, MovementLerpSpeed)
      ),
      distance <= 2
    );

    chunkTransformData[i] = transformData;
  }
}
```

##### The Burst Compiler

Compiles C# to highly optimized machine code, makes uses of SIMD (single instruction, multiple data), works extremely well (is made possible by) DOTS, code:

```cs
[BurstCompile] // <-- this is it! this is the magic!
public struct UpdatePositionAndRotationJob : IJobChunk
{
  public ArchetypeChunkComponentType<EnemyTransformData> TransformDataType;

  [ReadOnly]
  public ArchetypeChunkComponentType<TargetPositionData> TargetPositionDataType;

  [ReadOnly] public float DeltaTime;
  [ReadOnly] public float RotationLerpSpeed;
  [ReadOnly] public float MovementLerpSpeed;
}
```

#### Results:

| Stage                       | Count  | Time   | Perf.         |
| --------------------------- | ------ | ------ | ------------- |
| Before DOTS                 | 2,000  | 9ms    | 1x (baseline) |
| ECS                         | 2,000  | 1ms    | 9x            |
| ECS + Job System            | 2,000  | 0.2ms  | 35x           |
| ECS + Jobs + Burst Compiler | 20,000 | 0.04ms | 2250x         |

#### Recap

- Archetype chunks give optimal memory layout
- Systems
  - Looping over arrays instead of accessing `GameObjects`
  - Cache lines contain relevant data when updating
  - Utilizes CPU cache, avoids RAM access
- Job System uses all CPU cores to their fullest
- Burst Compiler
  - produces highly optimized machine code
  - targets specific CPU architecture of running machine

#### Conclusion

- `GameObject` is not dead
- DOTS hybrid is viable
- Embrace the data-oriented mindset
- Use DOTS!
