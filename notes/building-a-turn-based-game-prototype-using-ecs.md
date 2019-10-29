# Building a turn-based game prototype using ECS

> [slides](https://www.slideshare.net/unity3d/building-a-turnbased-game-prototype-using-ecs-unite-copenhagen-2019)

## Setting the stage

- not the next Civilization game
- code focused
- begginer (no ECS experience) is fine
- agenda
  - background:
    - Florian Uhde
    - Three Eyed Games - "slow cooked" indie games
    - Volkswägen - driving simulation?
  - concepts
    - turn based games
      - rogue-likes
      - card games
      - tactical ttrpgs
  - prototype with ECS
  - making it turn-based

#### Game Loop

- continuous update (keeps going when you walk away [unless it's paused])
- poll all events
- change game world, e.g.
  ```cs
  while (true)
  {
    processInput();
    update(elapsed);
    render();
  }
  ```
- game world continuously changes every frame

#### Turn Based Game Loop

- frame != turn
- some continuous systems (input)
- turn based systems (moves, enemies), e.g.
  ```cs
  while (true)
  {
    action = processInput();
    if (action != null)
    {
      update(elapsed);
    }
    render();
  }
  ```
- game world changes only in response to player action

#### Unity ECS

Parts:

- entity (something in the game world/scene)
- components (containers for _data_ [from `MonoBehavior`s])
- systems (take combinations of components and process/transform them)

What it means:

- moves away from inheritance toward composition
- many small atomic parts composed to create complex behavior
- systems don't know what "things" they're operating on (no cars, filter on "movement" and "wheels" [for example])
- systematic design means emergent behavior/game properties

Why now:

- quite usable today (most of the time)
- high degree of control over gameworld (save games)
- performance and data layout
- path into future awesomeness of Unity (it's the future)

### Prototype: Flying Gardener

- Unity 2019.2.6f1
- 3D Template
- Packages:
  - Entities 0.1.1 [preview]
  - Hybrid Renderer 0.1.1 [preview]
- Content from different assets:
  - PolyWorks FullPack, GalaxyBox 1, SurrounDead - Free Sample, Bitgem Texture Pack
- [Source code on GitHub](https://github.com/floAr/UniteCPH_TurnBasedPrototypeECS)

* Grid based world
* Actors:
  - Player
  - Snails
* 2DoF movement

#### Creating actors

- actors move on a grid in game world
- current and target position
  ```cs
  public struct ActorComponent : IComponentData
  {
    public float3 position;
    public float3 targetPosition;
  }
  ```
- "pure" or "hybrid" … hybrid seems like the way of the future, convert from `MonoBehavior` to `Component`
  ```cs
  public void Convert(Entity entity, EntityManager dstManager, GameObjectConversionSystem conversionSystem)
  {
     // taking data from game object!
    float3 gridPos = new float3(
      math.floor(transform.position.x),
      0,
      math.floor(transform.position.z)
    );
    // adding game object data *as a component*!
    dstManager.AddComponentData(
      entity,
      new ActorComponent()
      {
        position = gridPos,
        targetPosition = gridPos,
      });
  }
  ```
- this will be irrelevant soon (see keynote)

#### Moving actors

- interpolate between currena dn target position
- change translation and rotation accordingly
- execute on all entities with `Translation`, `Rotation`, and `ActorComponent` (see code link `ActorSystemJob` and `ActorSystem` … kind of invalid!?, see keynote)
- create `MoveIntention` (tag component)
- system generates random intentions for NPCs
- changes to components need synchronization (command buffers, built-in `PostUpdateCommands`)
- `MonoBehavior`s that implement conversion need `ConvertToEntity` script

#### Bringing thing in order, the player update lock

- Player input / way to pass the turn
- Communicate between systems when allowed to run
  - Variant 1: manual control
  - Variant 2: component-based control
- Changes:
  - `PlayerComponent`
  - `InputSystem`: WASD -> `MoveIntention`

##### Variant 1: Manual Update

- remove turn-based systems from ECS update loop
- manually trigger update after each turn
- `[DisableAutoCreation]` of turn based systems (`MoveSystem` & `RandomMoveSystem`)
- In `TurnBasedGameLoop` query for player and move intention (created by input system) then:
  - `World.GetOrCreateSystem()`
  - `System.Update()`

Pros: fine grained control, low footprint
Cons: manual effort for each system, does not scale

##### Variant 2: Interlocked Components

- Component to communicate
- Player has `AwaitAction`
- `InputSystem` consumes `AwaitAction`
- If no player is waiting, `TurnBasedSystem` hand out `ReadyToHandle` flag
- After one frame every other system updated so we remove the flag again

- remove `[DisableAutoCreation]`
- add `AwaitActionFlag` (component) to player's `Convert`
- remove `AwaitActionFlag` in `InputSystem`
- `TurnBasedGameLoop` queries for a count of waiting entities and manages a kind of "who can move" token
  - needs this weird empty query to work: `Entities.WithAll<PlayerComponent>().ForEAch((Entity id) => {});` (hopefully will go away, maybe the noop query gets optimized out)

Pros: scales (doesn't know anything about input), frontloads effort, extensible, multi-player "for free"
Cons: complexity, order-of-systems related problems (move updates before random move)

##### What next

- gameplay?
- alternative turn modes?: timed, multi-action
- integrate more Unity packages:
  - deterministic, stateless physics
  - live play
  - etc.
- local multi-player
  - kinda clunky, but it's cool that he didn't have to update anything other than add a player id and update the input system
