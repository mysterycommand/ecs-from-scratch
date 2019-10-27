# ECS from Scratch

> Notes and links for my talk for [IGDA DC, Tues. Oct 29, 2019](https://www.meetup.com/IGDA-DC/events/265101365/). [Slides on Projector](http://bit.ly/ecs-from-scratch).

### Outline

1. Who am I?
   - … and why listen to me?
2. What is an <abbr title="entity-component-system">ECS</abbr> (and <abbr title="data oriented design">DOD</abbr>)
   - comparison to <abbr title="object oriented programming">OOP</abbr>
   - entities ("just indexes" - generational indexes)
   - components (just data - e.g. "primitive" or value types)
   - archetypes - groups of components
   - systems - functions that run on queried (by component) groups of entities
   - queries - groups of entities with certain sets of components
   - resources - like "shared components" … usually read only from the perspective of systems
   - jobs - scheduling systems that are dependent on other systems (physics, parent/child transforms)
3. Why use it?
   - performance
   - prototyping & rapid iteration
   - serializable (and therefore streamable)
4. A _very_ simple implementation from scratch
   - JavaScript
   - no generational indexing (limited to `2^53 - 1` (or `9,007,199,254,740,991`) entities)
   - no querying/caching, all systems run on all entities (in a "world")
   - systems:
     - activate/deactivate - lifetime
     - update - fireworks, boids, metaballs, boundaries?, gravity?
5. Unity
   - _very_ new (lots of flux - documentation missing or like, immediately out of date)
   - where to start (no `GameObject`s, no `MonoBehavior`s) - [`RuntimeInitializeOnLoadMethod`](https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html)
   - Pure ECS
   - Project Tiny
6. Other applications
   - Effects & shader graphs
   - Cloud architecture (API as data/components, "functions as a service" as systems)
   - Intersectional feminism?
     > a branch of feminism asserting how different **aspects** of social and political identity discrimination overlap--for example, race with gender. It is a qualitative analytic **framework** that identifies how interlocking **systems** of power affect those who are most marginalized in society.
     > --[Wikepedia](https://en.wikipedia.org/wiki/Intersectionality) (emphasis mine)

### Links

#### Personal favs

- [My RustConf 2018 Closing Keynote](https://kyren.github.io/2018/09/14/rustconf-talk.html#back-to-the-beginning)
- [dbartolini/data-oriented-design](https://github.com/dbartolini/data-oriented-design)
- [Some ideas](https://gist.github.com/mysterycommand/c78c5dc6446dda940d49b36ee6529c45)

#### Unity

- [TransformSystem | Package Manager UI website](https://docs.unity3d.com/Packages/com.unity.entities@0.0/manual/transform_system.html)
- [Scheduling a job from a job - why not? | Package Manager UI website](https://docs.unity3d.com/Packages/com.unity.jobs@0.0/manual/scheduling_a_job_from_a_job.html)
- [Burst User Guide | Package Manager UI website](https://docs.unity3d.com/Packages/com.unity.burst@1.0/manual/index.html)
- [Unity - Scripting API: RuntimeInitializeOnLoadMethodAttribute](https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html)
- [Project Tiny Preview Package is here! – Unity Blog](https://blogs.unity3d.com/2018/12/05/project-tiny-preview-package-is-here/)
- [Entity-Component System in Unity – a tutorial](https://blogs.msdn.microsoft.com/uk_faculty_connection/2018/05/08/entity-component-system-in-unity-a-tutorial/)

##### Source code (GitHub)

- [keijiro/Voxelman: Unity ECS + C# Job System example](https://github.com/keijiro/Voxelman)
- [Unity-Technologies/EntityComponentSystemSamples](https://github.com/Unity-Technologies/EntityComponentSystemSamples)
  - [EntityComponentSystemSamples/ECSSamples/Documentation at master · Unity-Technologies/EntityComponentSystemSamples](https://github.com/Unity-Technologies/EntityComponentSystemSamples/tree/master/ECSSamples/Documentation)
  - [EntityComponentSystemSamples/resources.md at master · Unity-Technologies/EntityComponentSystemSamples](https://github.com/Unity-Technologies/EntityComponentSystemSamples/blob/master/ECSSamples/Documentation/resources.md)
  - [EntityComponentSystemSamples/ecs_principles_and_vision.md at master · Unity-Technologies/EntityComponentSystemSamples](https://github.com/Unity-Technologies/EntityComponentSystemSamples/blob/master/ECSSamples/Documentation/ecs_principles_and_vision.md)
  - [EntityComponentSystemSamples/is_ecs_for_you.md at master · Unity-Technologies/EntityComponentSystemSamples](https://github.com/Unity-Technologies/EntityComponentSystemSamples/blob/master/ECSSamples/Documentation/is_ecs_for_you.md)
- [Unity-Technologies/Unity.Mathematics: A prototype of a C# math library providing vector types and math functions with a shader like syntax](https://github.com/Unity-Technologies/Unity.Mathematics)
- [Unity-Technologies/DOTS-Shmup3D-sample: A demo with Unity DOTS and Unity Physics.](https://github.com/Unity-Technologies/DOTS-Shmup3D-sample)
- [Unity-Technologies/UnityCsReference: Unity C# reference source code](https://github.com/Unity-Technologies/UnityCsReference)
- [Unity-Technologies/unite2019-scenedatatodots: Unite 2019 - Converting Scene Data to DOTS (samples)](https://github.com/Unity-Technologies/unite2019-scenedatatodots)
- [UnityTechnologies/AngryBots_ECS: The DOTS project used for the presentation Converting Your Game to DOTS](https://github.com/unitytechnologies/angrybots_ecs)
- [UnityTechnologies/SpaceShooterECS: The ECS project originally developed with Intel for GDC 2018](https://github.com/UnityTechnologies/SpaceShooterECS)
- [UnityTechnologies/ProceduralPatterns2D](https://github.com/UnityTechnologies/ProceduralPatterns2D)

##### [Unite Copenhagen 2019](https://www.youtube.com/playlist?list=PLX2vGYjWbI0RzLRaqsqcgnuc2RvLPTUmi)

- [Converting your game to DOTS - Unite Copenhagen](https://youtu.be/BNMrevfB6Q0)
  - [slides](https://www.slideshare.net/unity3d/converting-your-game-to-dots-unite-copenhagen-2019)
- [Converting scene data to DOTS - Unite Copenhagen](https://youtu.be/TdlhTrq1oYk)
  - [slides](https://www.slideshare.net/unity3d/converting-scene-data-to-dots-unite-copenhagen-2019)
- [Options for Entity interaction - Unite Copenhagen](https://youtu.be/KuGRkC6wzMY)
  - [slides](https://www.slideshare.net/unity3d/options-for-entity-interaction-unite-copenhagen-2019)
  - [`ComponentDataFromEntity<T>`](https://docs.unity3d.com/Packages/com.unity.entities@0.0/api/Unity.Entities.ComponentDataFromEntity-1.html)
- [Unity ECS for mobile: Metropolis Traffic Simulation - Unite Copenhagen](https://youtu.be/iCnYm7kRC1g)
- [Unboxing DOTS: Designing workflows for humans - Unite Copenhagen](https://youtu.be/VXuR8VVQzwQ)
- [Project Tiny overview and roadmap - Unite Copenhagen](https://youtu.be/kNK_niBNkMY)
  - [a thread on Unity Forums](https://forum.unity.com/threads/wheres-the-project-tiny-package-cant-find-it-in-package-manager.761381/)
- [Overview of physics in DOTS - Unite Copenhagen](https://youtu.be/tI9QfqQ9ATA)
- [Getting started with Burst - Unite Copenhagen](https://youtu.be/Tzn-nX9hK1o)
- [Using Entity Command Buffers - Unite Copenhagen](https://youtu.be/SecJibpoTYw)
- [Creating a third-person zombie shooter with DOTS - Unite Copenhagen](https://youtu.be/yTGhg905SCs)
- [Building a turn-based game prototype using ECS - Unite Copenhagen](https://youtu.be/mL4qrt-15TE)
- [Introduction to the DOTS Sample and the NetCode that drives it - Unite Copenhagen](https://youtu.be/P_-FoJuaYOI)
- Tangentially related?
  - [Overview of Unity Simulation - Unite Copenhagen](https://youtu.be/IoF4JemHw2o)
  - [Understanding the package management ecosystem - Unite Copenhagen](https://youtu.be/22HIEQTyozQ)
  - [Introducing the new Input System - Unite Copenhagen](https://youtu.be/hw3Gk5PoZ6A)

Also collected (by me) in a single playlist: [Unity DOTS & ECS - Unite Copenhagen 2019](https://www.youtube.com/playlist?list=PLU0pFxOcoc94fVbfEJmpJCkxFhybP4cos)

#### Other implementations

- [Flecs](https://github.com/SanderMertens/flecs) (fast lightweight ECS)
  - [@gamesfromscratch intro](https://www.gamefromscratch.com/post/2019/10/02/FLECS-Fast-Lightweight-Entity-Component-System.aspx)
  - [docs](https://github.com/SanderMertens/flecs/blob/master/Manual.md)
- [Specs](https://github.com/slide-rs/specs) (Specs parallel ECS)
  - [docs](https://slide-rs.github.io/specs/)
- [Ecsy](https://github.com/MozillaReality/ecsy)
  - [docs](https://ecsy.io/docs/#/)
- [EcsRx](https://github.com/EcsRx/ecsrx)
  - [docs](https://ecsrx.gitbook.io/project/)
- [Ajeeb Game Engine](https://github.com/nasser/ajeeb)
  - [Ajeeb ECS](https://github.com/nasser/ajeeb-ecs)
  - [Ajeeb Coroutines](https://github.com/nasser/ajeeb-coroutines)
- [EnTT](https://github.com/skypjack/entt)
  - [docs](https://github.com/skypjack/entt/wiki)

#### Misc

- [The truth behind Inversion of Control – Part V – Entity Component System design to achieve true Inversion of Flow Control - Seba&#39;s Lab](http://www.sebaslab.com/ecs-design-to-achieve-true-inversion-of-flow-control/)
- [What&#39;s an Entity System? - Entity Systems Wiki](http://entity-systems-wiki.t-machine.org/)
- [Component Based Engine Design | Randy Gaul&#39;s Game Programming Blog](https://www.randygaul.net/2013/05/20/component-based-engine-design/)
- [Simple physics using Unity&#39;s ECS - Part 1: Introduction - PlayerONE Studio](https://playerone-studio.com/simple-physics-unity-ecs-introduction)
- [ECS Physics - UnityList](https://unitylist.com/p/g5f/ECS-Physics)
- [KptEmreU/Roll-A-Ball-ECS-style: Recreation of Unity Roll-A-Ball tutorial](https://github.com/KptEmreU/Roll-A-Ball-ECS-style)
- [Entities, components and systems - Ingeniously Simple - Medium](https://medium.com/ingeniouslysimple/entities-components-and-systems-89c31464240d)
- [Gamasutra: Tobias Stein&#39;s Blog - The Entity-Component-System - An awesome game-design pattern in C++ (Part 1)](https://www.gamasutra.com/blogs/TobiasStein/20171122/310172/The_EntityComponentSystem__An_awesome_gamedesign_pattern_in_C_Part_1.php)
- [Data Structures for Entity Systems: Contiguous memory – T-machine.org](http://t-machine.org/index.php/2014/03/08/data-structures-for-entity-systems-contiguous-memory/)
- [Using An ES With Physics - Entity Systems Wiki](http://entity-systems-wiki.t-machine.org/using-an-es-with-physics)
- [How we use Box2D with Artemis](https://blog.gemserk.com/2012/02/02/how-we-use-box2d-with-artemis/)
- [Moving the Paddles - Amethyst Documentation](https://book.amethyst.rs/stable/pong-tutorial/pong-tutorial-03.html)
- [amethyst/timing.rs at master · amethyst/amethyst](https://github.com/amethyst/amethyst/blob/master/amethyst_core/src/timing.rs)
- [Game Loop · Sequencing Patterns · Game Programming Patterns](http://gameprogrammingpatterns.com/game-loop.html#play-catch-up)
- [A Detailed Explanation of JavaScript Game Loops and Timing | Isaac Sukin](https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#panic-spiral-death)
- [Understanding Component-Entity-Systems](https://www.gamedev.net/articles/programming/general-and-gameplay-programming/understanding-component-entity-systems-r3013)

#### Some 2D / Sprite stuff:

- [SpriteSheetRenderer](https://github.com/fabriziospadaro/SpriteSheetRenderer)
  - A powerful Unity ECS system to render massive numbers of animated sprites using DynamicBuffers and ComputeBuffer
  - [a thread on Unity Forums](https://forum.unity.com/threads/200k-dynamic-animated-sprites-at-80fps.695809/)
- [Getting Started with ECS in Unity 2019](https://youtu.be/ILfUuBLfzGI) (Code Monkey)
- [Draw a Sprite with ECS in Unity 2019](https://youtu.be/6eV9NR3Vb9U) (Code Monkey)
- [Simple Sprite Sheet Animation in Unity ECS](https://youtu.be/tvi44I_SK3w) (Code Monkey)
- []() (Code Monkey)

### Notes

#### Scratchpad:

```ts
const sim = createSim();
sim.addResource('keyboard' /* do something to init the keyboard */);
sim.addResource('mouse' /* do something to init the mouse */);
sim.addResource('gamepad' /* do something to init the gamepad */);

const world = createWorld(sim /* whatev */);
world.addEntities(count, withComponents); // maybe a config, like { count: number, withComponents: Component[] }
world.registerSystem(query, system); // cache & invalidate queries

// use a functional style
// emitters ... a default "is active" component?
```

---

#### Options for Entity interaction

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

---

#### Project Tiny overview and roadmap

Project Tiny update, overview, & roadmap:

- A new highly-modular runtime to produce smal, light, and fast games/experiences
  - Complete control over size
    - Beat long load times with a small runtime size that loads content fast
  - Scalable performance
    - Deliver fast game-play performance on a broad range of devices
  - Robust editor experience
    - Unity's familiar, easy-to-use developer tools speed up production

Project Tiny Timeline:

- Q4 2018 - Project Tiny First Preview
  - WebGL & 2D
  - Feedback:
    - Learning DOTS is too hard
    - TypeScript is bad
    - Steep learning curve!
- Q2 2019 - C# (preview)
  - Powered by DOTS Runtime for real
  - Feedback:
    - Authoring content needs to align with Unity (no "Pure DOTS")
- Q3 2019 - Today!
  - 2D + Lightweight/HTML5 export is great, but needs 3D & native/mobile

Project Tiny's focus for next previews:

- 3D & 2D "Hyper-Casual" Games (native mobile)
- Playable Ads (HTML5, MRAID & IAB compliance)
- Instant, Social/Messenger ("Web View" games)

Project Tiny's three phases:

| Authoring                                   | Converting                                 | Running                        |
| ------------------------------------------- | ------------------------------------------ | ------------------------------ |
| Familiar Unity Editor experience            | Converters for built-in components         | Optimal runtime representation |
| GameObjects, Materials, Meshrenderers, etc. | Custom conversion code for your components |                                |
| DOTS gameplay code                          | ->                                         | Runtime gameplay code          |

Two runtimes: Unity & DOTS

TinyRacing (coming soon)

- uses URP, Prefabs, ets
- Conversion pipeline
- Uses DOTS runtime hybrid renderer to play in editor
- Uses DOTS runtime tiny renderer (alpha)
- Build configurations enable multi-targeting
- Pipeline control, split on everything, build slices, down-target for performance/features

Project Tiny is built _on top of_ of the DOTS Runtime and other components:

- DOTS Runtime
- DOTS Core
- DOTS 2D
- Tiny 3D Renderer
- DOTS Authoring/Conversion pipeline
- DOTS/RT Animation
- Platform Support
- AR, Audio, etc. coming soon!

All of these are shipped as separate packages. Available in a month or two. Tiny Racing is the "vertical slice" they're working on

2020 (and beyond)

- 3D 1st preview in Q4 2019
- 2D, 3D, AR (all together) previews
- Start learning DOTS now to get a head start on Tiny

footnote: [Project Tiny's been removed from the package manager until this stuff comes true](https://forum.unity.com/threads/wheres-the-project-tiny-package-cant-find-it-in-package-manager.761381/)

---
