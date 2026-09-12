# SAYA Session Memory — Hisabi Project

## Last Updated: 2026-09-13 01:47

### 1. Architectural & Configuration Milestones
- **Expo & Native Tabs Setup**: Expo SDK 57 app configured with file-based routing (`expo-router`) using `unstable-native-tabs`.
- **Bundle Identifier**: iOS bundle ID and Android package set to `com.sayasky.hisabi`.
- **TypeScript Optimization**: Gitignored `example/` starter folder explicitly excluded in `tsconfig.json` to eliminate 31 false-positive errors.
- **Dynamic System & Tab Navigation (PR #4 / Issue #3)**:
  - Replaced iOS-only `DynamicColorIOS` with React Native's universal `useColorScheme()`.
  - Tab bar `backgroundColor` (`#121212` / `#ffffff`) and `indicatorColor` (`#27272a` / `#e4e4e7`) dynamically adapt to active color scheme.
  - Android 3-button control icons synchronized dynamically via `<NavigationBar style={isDark ? "light" : "dark"} />` from `expo-navigation-bar`.
  - Mounted `<SafeAreaProvider>` globally in `src/app/_layout.tsx` without outer `SafeAreaView` wrappers to prevent double-padding gaps beneath tabs.
- **Strict Dependency Preservation**: Enforced `NO AUTOMATIC PACKAGE OR DEPENDENCY UNINSTALLATION` rule across global (`~/.gemini/config/rules/AGENTS.md`) and local (`AGENTS.md`) configurations.

### 2. Navigation Structure
- Root layout: [src/app/_layout.tsx](file:///home/brosfeer/Documents/github_repo/hisabi/src/app/_layout.tsx) with `<SafeAreaProvider>`, `<NavigationBar>`, and `headerShown: false` hosting `(tabs)`.
- Tabs layout: [src/app/(tabs)/_layout.tsx](file:///home/brosfeer/Documents/github_repo/hisabi/src/app/(tabs)/_layout.tsx) with native triggers:
  - `index` -> [src/app/(tabs)/index.tsx](file:///home/brosfeer/Documents/github_repo/hisabi/src/app/(tabs)/index.tsx) (Home)
  - `customers` -> [src/app/(tabs)/customers.tsx](file:///home/brosfeer/Documents/github_repo/hisabi/src/app/(tabs)/customers.tsx) (Customer List)
  - `settings` -> [src/app/(tabs)/settings.tsx](file:///home/brosfeer/Documents/github_repo/hisabi/src/app/(tabs)/settings.tsx) (Settings)

### 3. Android Build & Tooling Notes
- Local environment uses OpenJDK 17 (`/home/brosfeer/development/jdk-17`) and Android SDK platform tools (`/home/brosfeer/development/android-sdk`).
- Target device: `SM_A5070` (`R58MA3HMQ4W`).
- Cached Gradle: 9.3.1 binary distribution.
- **Android Edge-to-Edge Navigation**:
  - The OS navigation bar is transparent by default in Android 15+.
  - In `unstable-native-tabs`, the native Material 3 `BottomNavigationView` extends its background down into the navigation bar area.
  - Safe area insets should be provided via `<SafeAreaProvider>`; avoid wrapping root navigators with `<SafeAreaView edges={['bottom']}>` when using bottom tabs to avoid dead-space gaps.

### 4. UI/UX Research & Future Roadmap
- **Telegram Floating Tabs Analysis (`telegram native tabs.jpg`)**:
  - Investigated Telegram's Android navigation tabs implementation.
  - Telegram does not use stock Material `BottomNavigationView`; it uses a 100% custom native Android floating view drawn on Canvas with background blur shaders (`RenderEffect`).
  - Characteristics: Floating capsule/dock geometry with margins (`bottom: insets.bottom + 12`), frosted glass/blur, active tab enclosed in a rounded pill highlight, outline inactive icons.
  - Advantage: Floating capsule design naturally solves edge-to-edge system navigation bar collisions because it never touches the bottom glass edge.
  - Roadmap: Study Telegram's Android repository (`DrKLO/Telegram`) to replicate this floating liquid glass dock in future milestones using `expo-glass-effect` or custom tabs.
- **Branch Hygiene**: All merged feature branches (`fix/issue-1-tabs-and-screens`, `fix/issue-3-dynamic-color-android`) deleted locally and remotely. Working tree clean on `main`.
