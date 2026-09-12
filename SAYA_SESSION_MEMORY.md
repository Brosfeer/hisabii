# SAYA Session Memory — Hisabi Project

## Last Updated: 2026-09-12 23:42

### 1. Architectural & Configuration Milestones
- **Expo & Native Tabs Setup**: Expo SDK 57 app configured with file-based routing (`expo-router`) using `unstable-native-tabs`.
- **Bundle Identifier**: iOS bundle ID and Android package set to `com.sayasky.hisabi`.
- **TypeScript Optimization**: Gitignored `example/` starter folder explicitly excluded in `tsconfig.json` to eliminate 31 false-positive errors.

### 2. Navigation Structure
- Root layout: [src/app/_layout.tsx](file:///home/brosfeer/Documents/github_repo/hisabi/src/app/_layout.tsx) with `headerShown: false` hosting `(tabs)`.
- Tabs layout: [src/app/(tabs)/_layout.tsx](file:///home/brosfeer/Documents/github_repo/hisabi/src/app/(tabs)/_layout.tsx) with native triggers:
  - `index` -> [src/app/(tabs)/index.tsx](file:///home/brosfeer/Documents/github_repo/hisabi/src/app/(tabs)/index.tsx) (Home)
  - `customers` -> [src/app/(tabs)/customers.tsx](file:///home/brosfeer/Documents/github_repo/hisabi/src/app/(tabs)/customers.tsx) (Customer List)
  - `settings` -> [src/app/(tabs)/settings.tsx](file:///home/brosfeer/Documents/github_repo/hisabi/src/app/(tabs)/settings.tsx) (Settings)

### 3. Android Build & Tooling Notes
- Local environment uses OpenJDK 17 (`/home/brosfeer/development/jdk-17`) and Android SDK platform tools.
- Target device: `SM_A5070` (`R58MA3HMQ4W`).
- Cached Gradle: 9.3.1 binary distribution.
- **Cross-Platform Tab Styling**: Avoid `DynamicColorIOS` as it throws runtime platform exceptions on Android. Use `useColorScheme()` from `react-native` for dynamic dark/light color resolution.
