# ECS from Scratch
Notes and links for my talk for [IGDA DC, Tues. Sept. 24 2019](https://www.meetup.com/IGDA-DC/events/264926660/)

### Outline
1. Who am I?
   - … and why listen to me?
2. What is an <abbr>ECS</abbr> (and <abbr>DOD</abbr>)
   - comparison to <abbr>OOP</abbr>
   - entities ("just indexes" - generational indexes)
   - components (just data - e.g. "primitive" orvalues types)
   - systems - functions that run on queried (by component) groups of entities
   - resources - like "shared components" … usually read only from the perspective of systems
3. Why use it?
   - performance
   - prototyping & rapid iteration
4. A *very* simple implementation from scratch
   - JavaScript
   - no generational indexing (limited to `2^53 - 1` (or `9,007,199,254,740,991`) entities)
   - no querying/caching, all systems run on all entities (in a "world")
   - systems:
     - activate/deactivate - lifetime
     - update - fireworks, boids, metaballs, boundaries?, gravity?
5. Unity
   - *very* new (lots of flux - documentation missing or like, immediately out of date)
   - where to start (no `GameObject`s, no `MonoBehavior`s) - [`RuntimeInitializeOnLoadMethod`](https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html)
   - Pure ECS
   - Project Tiny

### Links
- [Some ideas](https://gist.github.com/mysterycommand/c78c5dc6446dda940d49b36ee6529c45)
- [keijiro/Voxelman: Unity ECS + C# Job System example](https://github.com/keijiro/Voxelman)
- [EntityComponentSystemSamples/ECSSamples/Documentation at master · Unity-Technologies/EntityComponentSystemSamples](https://github.com/Unity-Technologies/EntityComponentSystemSamples/tree/master/ECSSamples/Documentation)
- [TransformSystem | Package Manager UI website](https://docs.unity3d.com/Packages/com.unity.entities@0.0/manual/transform_system.html)
- [Scheduling a job from a job - why not? | Package Manager UI website](https://docs.unity3d.com/Packages/com.unity.jobs@0.0/manual/scheduling_a_job_from_a_job.html)
- [Burst User Guide | Package Manager UI website](https://docs.unity3d.com/Packages/com.unity.burst@1.0/manual/index.html)
- [My RustConf 2018 Closing Keynote](https://kyren.github.io/2018/09/14/rustconf-talk.html#back-to-the-beginning)
- [The truth behind Inversion of Control – Part V – Entity Component System design to achieve true Inversion of Flow Control - Seba&#39;s Lab](http://www.sebaslab.com/ecs-design-to-achieve-true-inversion-of-flow-control/)
- [What&#39;s an Entity System? - Entity Systems Wiki](http://entity-systems-wiki.t-machine.org/)
- [Component Based Engine Design | Randy Gaul&#39;s Game Programming Blog](https://www.randygaul.net/2013/05/20/component-based-engine-design/)
- [Simple physics using Unity&#39;s ECS - Part 1: Introduction - PlayerONE Studio](https://playerone-studio.com/simple-physics-unity-ecs-introduction)
- [ECS Physics - UnityList](https://unitylist.com/p/g5f/ECS-Physics)
- [KptEmreU/Roll-A-Ball-ECS-style: Recreation of Unity Roll-A-Ball tutorial](https://github.com/KptEmreU/Roll-A-Ball-ECS-style)
- [Unity-Technologies/EntityComponentSystemSamples](https://github.com/Unity-Technologies/EntityComponentSystemSamples)
- [EntityComponentSystemSamples/resources.md at master · Unity-Technologies/EntityComponentSystemSamples](https://github.com/Unity-Technologies/EntityComponentSystemSamples/blob/master/ECSSamples/Documentation/resources.md)
- [EntityComponentSystemSamples/ecs_principles_and_vision.md at master · Unity-Technologies/EntityComponentSystemSamples](https://github.com/Unity-Technologies/EntityComponentSystemSamples/blob/master/ECSSamples/Documentation/ecs_principles_and_vision.md)
- [EntityComponentSystemSamples/is_ecs_for_you.md at master · Unity-Technologies/EntityComponentSystemSamples](https://github.com/Unity-Technologies/EntityComponentSystemSamples/blob/master/ECSSamples/Documentation/is_ecs_for_you.md)
- [Unity-Technologies/Unity.Mathematics: A prototype of a C# math library providing vector types and math functions with a shader like syntax](https://github.com/Unity-Technologies/Unity.Mathematics)
- [Project Tiny Preview Package is here! – Unity Blog](https://blogs.unity3d.com/2018/12/05/project-tiny-preview-package-is-here/)
- [Entities, components and systems - Ingeniously Simple - Medium](https://medium.com/ingeniouslysimple/entities-components-and-systems-89c31464240d)
- [Gamasutra: Tobias Stein&#39;s Blog - The Entity-Component-System - An awesome game-design pattern in C++ (Part 1)](https://www.gamasutra.com/blogs/TobiasStein/20171122/310172/The_EntityComponentSystem__An_awesome_gamedesign_pattern_in_C_Part_1.php)
- [Data Structures for Entity Systems: Contiguous memory – T-machine.org](http://t-machine.org/index.php/2014/03/08/data-structures-for-entity-systems-contiguous-memory/)
- [Using An ES With Physics - Entity Systems Wiki](http://entity-systems-wiki.t-machine.org/using-an-es-with-physics)
- [How we use Box2D with Artemis](https://blog.gemserk.com/2012/02/02/how-we-use-box2d-with-artemis/)
- [Moving the Paddles - Amethyst Documentation](https://book.amethyst.rs/stable/pong-tutorial/pong-tutorial-03.html)
- [amethyst/timing.rs at master · amethyst/amethyst](https://github.com/amethyst/amethyst/blob/master/amethyst_core/src/timing.rs)
- [Game Loop · Sequencing Patterns · Game Programming Patterns](http://gameprogrammingpatterns.com/game-loop.html#play-catch-up)
- [A Detailed Explanation of JavaScript Game Loops and Timing | Isaac Sukin](https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#panic-spiral-death)
- [Unity - Scripting API: RuntimeInitializeOnLoadMethodAttribute](https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html)
- [Introduction - EcsRx](https://ecsrx.gitbook.io/project/)
- [dbartolini/data-oriented-design](https://github.com/dbartolini/data-oriented-design)
- [Entity-Component System in Unity – a tutorial](https://blogs.msdn.microsoft.com/uk_faculty_connection/2018/05/08/entity-component-system-in-unity-a-tutorial/)
- [Understanding Component-Entity-Systems](https://www.gamedev.net/articles/programming/general-and-gameplay-programming/understanding-component-entity-systems-r3013)
