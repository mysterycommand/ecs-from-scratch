# Project Tiny overview and roadmap

## Project Tiny update, overview, & roadmap:

- A new highly-modular runtime to produce smal, light, and fast games/experiences
  - Complete control over size
    - Beat long load times with a small runtime size that loads content fast
  - Scalable performance
    - Deliver fast game-play performance on a broad range of devices
  - Robust editor experience
    - Unity's familiar, easy-to-use developer tools speed up production

## Project Tiny Timeline:

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

## Project Tiny's focus for next previews:

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

## TinyRacing (coming soon)

- uses URP, Prefabs, ets
- Conversion pipeline
- Uses DOTS runtime hybrid renderer to play in editor
- Uses DOTS runtime tiny renderer (alpha)
- Build configurations enable multi-targeting
- Pipeline control, split on everything, build slices, down-target for performance/features

## Project Tiny is built _on top of_ of the DOTS Runtime and other components:

- DOTS Runtime
- DOTS Core
- DOTS 2D
- Tiny 3D Renderer
- DOTS Authoring/Conversion pipeline
- DOTS/RT Animation
- Platform Support
- AR, Audio, etc. coming soon!

All of these are shipped as separate packages. Available in a month or two. Tiny Racing is the "vertical slice" they're working on

## 2020 (and beyond)

- 3D 1st preview in Q4 2019
- 2D, 3D, AR (all together) previews
- Start learning DOTS now to get a head start on Tiny

## Questions:

- What about UI in DOTS?
  - It won't be ECS because something else works better? Coming soon, early 2020
- Direct export to Messenger games?
  - Yes, early 2020, not exactly a "publish to store" button, but something
  - Don't rely on any of these dates, it's all moving targets
- Playable ads, ad network requirements (single `index.html`)?
  - Yes, it will require design, but the plan will be to bundle to single file (where required)
  - Working with Unity Ads team … trying to build all their ads "in house" (dog fooding)

## 17 Talks to watch (related to DOTS):

- DOTS core sessions
  1. Converting your game to DOTS
  2. Get moving: an overview of physics in DOTS
  3. Wreaking Havok: an overview of Havok Physics in Unity
  4. Getting Started with Burst
  5. Introduction in `Unity.Mathematics`
  6. Intrinsics: low-level engine development with Burst
  7. Using `EntityCommandBuffer`s
  8. Options for Entity Interaction
  9. Convertin Scene Data to DOTS
  10. Unboxing DOTS: designing workflows for humans
- DOTS related sessions
  1. Speed up your asset imports for big projects
  2. Refresh what you know about `AssetDatabase.Refresh()`
  3. Creating games with a tiny binary footprint: Project Tiny overview & roadmap (**this talk!**)
  4. Unity roadmap
- DOTS proof points
  1. Creating a third-person zombie shooter with DOTS (Far North Entertainment)
  2. Building a turn-based game prototype using ECS (Three Eyed Games)
  3. Unity Entity Component System for mobile: Metropolis Traffic Simulation (Innogames)

## One more question:

- Is the Tiny 3D renderer using SRP?
  - No, it's custom/DOTS from the ground up.
- Will it support Shader Graph
  - Not right away, first it'll have no custom shaders (probably), but later versions will add support for custom shaders (it's tricky)
- What about AR? When and will it use AR Foundation?
  - The goal is to port AR Foundation to "pure DOTS" … might be through conversion pipeline?
  - Still TBD … v1 early next year?
- Portrait or Landscape (e.g. "responsive design")?
  -

footnote: [Project Tiny's been removed from the package manager until some of this stuff comes true](https://forum.unity.com/threads/wheres-the-project-tiny-package-cant-find-it-in-package-manager.761381/)
