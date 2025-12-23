# LSS-Designs

This repo contains our UI kit packages.

## Packages

- `packages/ui-web`: React + Tailwind CSS (Catalyst-based) UI kit for web. This is also the base for hybrid mobile (Capacitor/Cordova) and desktop (Electron/Tauri).
- `packages/ui-core`: Platform-agnostic primitives (tokens/types/behavior) to share between platforms.
- `packages/ui-mobile`: Thin adapter for hybrid mobile apps (Capacitor/Cordova) + future mobile wrappers.
- `packages/ui-desktop`: Thin adapter for desktop apps (Electron/Tauri) + future desktop wrappers.
- `packages/ui-native`: Placeholder for a future React Native implementation if we ever go fully native.

## Source of components

The purchased Catalyst bundle is kept in `catalyst-ui-kit 2/`. We copy the TypeScript components into `packages/ui-web` and then evolve them under our own conventions.