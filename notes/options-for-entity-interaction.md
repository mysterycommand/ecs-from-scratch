# Options for Entity interaction

Read problem: follower follows leader - data A (followers velocity) depends on data B (leader's relative position) - _pulled from leader_. Write problem: button interacts with door - data A (door) depends on data B (button) - _forwarded from button_.

Options for _data relationships_. Systems are _transformations_.

**Steps to implement a system/relationship/transform:**

1. understand the data
2. understand the transform
3. pick the right tool for the job

**Follower vs. Leader**

- Follower(s?)
  - velocity
  - position
  - leader (id?)
- Leader(s?)
  - position

Identify number and frequency of updates (cost). In this example, probably once per follower per frame. `ComponentDataFromEntity<T>` + `IJobForEach<...Components>`:

```cs
[BurstCompile]
struct FollowLeaderJob : IJobForEach<Leader, Position, Velocity>
{
  [ReadOnly] public ComponentDataFromEntity<Postion> PositionData;

  public void Execute([ReadOnly] ref Leader leader, [ReadOnly] ref Position position, ref Velocity velocity)
  {
    if (!PositionData.Exists(leader.Entity))
    {
      return;
    }

    Position leaderPosition = PositionData[leader.Entity];
    velocity.Value += 0.1f * (leaderPosition.Value - position.Value);
  }
}
```

… later …

```cs
protected override JobeHandle OnUpdate(JobHandle inputDependencies)
{
  return new FollowLeaderJob()
  {
    PositionData = GetComponentDataFromEntity<Posiition>(true /* for [ReadOnly] */)
  }.Schedule(this, inputDependencies);
}
```

Pro: access component data from arbitrary entity
Con: essentially random access memory

:star: generally good for read relationships :star:

:warn: `[NativeDisableParallelForRestriction]` :warn:

**Button vs. Door**

- Button
  - activated (tag)
  - repeats signal (tag)
  - target (any entity, rarely changes)
- Door
  - _nothing_

Cost in this example is low, super rare that a button is pressed. Does involve adding/removing components from Door, but … again … rare.

```cs
[BurstCompile][RequireComponentTag(typeof(Tag_Activated), typeof(Tag_RepeatsSignal))]
struct TransmitSignalJob : IJobForEachWithEntity<Target>
{
  public EntityCommandBuffer.Concurrent ECB;

  public void Execute(Entity entity, int index, [ReadOnly] ref Target target)
  {
    ECB.AddComponent(index, target.Entity, typeof(Tag_Activated));
  }
}
```

… elsewhere …

```cs
protected override void OnCreate()
{
  SignalActivationSystem = World.GetOrCreateSystem<SignalActivationEntityCommandBufferSystem>();
}

protected override JobHandle OnUpdate(JobHandle inputDependencies)
{
  var job = new TransmitSignalJob()
  {
    ECB = SignalActivationSystem.CreateCommandBuffer().ToConcurrent();
  }.Schedule(this, inputDependencies);

  SignalActivationSystem.AddJobHandleForProducer(job);

  return job;
}
```

… one neat trick, schedule the add and remove in different buffers from a single job (might not actually be a good idea, new/emerging pattern) …

```cs
// Runs in InitializationSystemGroup
[BurstCompile][RequireComponentTag(typeof(Tag_Button))]
struct ActivateButtonJob : IJobForEachWithEntity<NouseClicked>
{
  public EntityCommandBuffer.Concurrent ECBSimulationBegin;
  public EntityCommandBuffer.Concurrent ECBSimulationEnd;

  public void Execute(Entity entity, int index, [ReadOnly] ref MouseClicked mouse)
  {
    ECBSimulationBegin.AddComponent(index, target.Entity, typeof(Tag_Activated));
    ECBSimulationEnd.RemoveComponent(index, target.Entity, typeof(Tag_Activated));
  }
}
```

ECB is good for writes, stage change, infrequent, timing isn't super critical.

**When to read, when to write**

Reads via `ComponentDataFromEntity<T>` are high frequency, low cost transformations. Writes via `EntityCommandBuffer` are low frequency, high cost … _and_ express authority.
