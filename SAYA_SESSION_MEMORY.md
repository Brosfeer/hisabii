# SAYA Session Memory — Hisabi Project

## Last Updated: 2026-09-16 01:45

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
- Root Stack routes:
  - `customers/[id]` -> [src/app/customers/[id].tsx](file:///home/brosfeer/Documents/github_repo/hisabi/src/app/customers/[id].tsx) (Customer Details, pushed onto root Stack over tabs).

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

### 5. Expo Router: Detail Routes & Native Tabs Architecture
- **Tab Navigator Scope**: `NativeTabs` (`expo-router/unstable-native-tabs`) wraps native `UITabBarController` / `BottomNavigationView`. It is strictly a tab switcher, not a stack.
- **Unregistered Route Drop**: Routes placed inside `(tabs)/` that lack a matching `<NativeTabs.Trigger>` are excluded from `visibleTabs` in `NativeBottomTabsNavigator.js` and throw `The focused tab in NativeTabsView cannot be displayed` or fail silently.
- **Sibling File vs Directory Collision**: Coexistence of `(tabs)/customers.tsx` and `(tabs)/customers/` under the same parent produces routing ambiguity.
- **Detail Screens Outside Tabs**: Dynamic routes (`customers/[id].tsx`) must live at the root stack level (`src/app/customers/[id].tsx`) to push over bottom tabs with proper slide transitions, header control, and back gestures. Absolute links (`/customers/123`) must be used over relative paths (`./customers/123`).

### 6. TypeScript Asset Ambient Typing (`images.d.ts`)
- **Expo SDK 57 Typing Boundary**: `expo/types` only declares types for CSS modules (`*.module.css`) and Metro `require()` (`metro-require.d.ts`), purposefully omitting ambient `*.png`, `*.jpg`, `*.svg` declarations to avoid imposing an asset-typing opinion.
- **ES Module Resolution**: Modern `import logo from '@/assets/images/logo.png'` fails with `TS2307: Cannot find module` without an ambient declaration file.
- **`images.d.ts` Role**: Declares `module "*.png"` returning `any` (or `ImageSourcePropType`). Required for static analysis and bundler optimization when using ES imports.

### 7. Uniwind (Tailwind CSS v4) Engineering & Component Patterns
- **Engine**: Build-time compilation engine powered by Tailwind CSS v4 and Unistyles architecture. Requires no native code; runs as a Metro plugin (`withUniwindConfig` in `metro.config.js`).
- **Setup Pipeline**:
  1. `yarn add uniwind tailwindcss`
  2. `metro.config.js` wrapped with `withUniwindConfig(config, { cssEntryFile: "./global.css" })`.
  3. `global.css` with `@import "tailwindcss"; @import "uniwind";`.
  4. Root import `import "../../global.css";` in `src/app/_layout.tsx`.
  5. `uniwind-types.d.ts` auto-generated to provide `className` autocomplete across React Native components.
- **Three Core Component Paradigms**:
  1. **Direct Native (`from "react-native"`)**: Metro's `nativeResolver` automatically redirects `react-native` imports to Uniwind wrappers. Core components (`View`, `Text`, `Pressable`, `ScrollView`, `TextInput`) support `className` natively with zero boilerplate.
  2. **Third-Party Components (`react-native-safe-area-context`, `expo-router`, `lucide-react-native`)**: Not redirected by Metro; they ignore `className` at runtime.
     - Must be wrapped with `withUniwind` (e.g. `const SafeAreaView = withUniwind(RNSafeAreaView)`), OR
     - Use core components with hooks: `<View className="...">` + `useSafeAreaInsets()`, and `<Link asChild><Text className="..." /></Link>`.
  3. **`useResolveClassNames(...)`**: Runtime utility converting class strings into raw JavaScript style objects. Reserved strictly for non-JSX style props (`tabBarStyle` in `Tabs`, `headerStyle` in `Stack.Screen`, dynamic theme colors).

### 8. Native Glass & Blur Architecture (Android vs iOS)
- **`expo-glass-effect` (iOS Only)**: Built exclusively for Apple Liquid Glass (`UIVisualEffectView`). On Android it has zero native implementation and falls back to a transparent React Native `<View>`.
- **`expo-blur` (`BlurView`) (Cross-Platform)**:
  - iOS: Native Apple `UIVisualEffectView` (`UIBlurEffect`).
  - Android: Hardware GPU `RenderEffect` / `RenderNode` on Android 12+ (API 31+).
  - Web: CSS `backdrop-filter: blur()`.
- **`@expo/ui`**: Maps to SwiftUI on iOS (`GlassEffectContainer`) and Jetpack Compose on Android (Material 3 surfaces/elevation, no liquid glass).
- **Cross-Platform Glassmorphism Recipe with Uniwind**:
  - Wrap `expo-blur`'s `BlurView` with `withUniwind`:
    ```tsx
    const StyledBlurView = withUniwind(BlurView);
    ```
  - Layer frosted blur with semi-transparent background and subtle borders:
    `className="overflow-hidden rounded-2xl border border-white/20 bg-white/15 dark:bg-black/25"`

### 9. Feature Execution: Customer Ledger, Uniwind V4 & Glass UI (PR #6 / Issue #5)
- **GitHub Issue**: [#5](https://github.com/Brosfeer/hisabii/issues/5) — `Feat(customers): Integrate Uniwind V4 Styling, Reusable Glass Components And Customer Ledger Flow`.
- **Pull Request**: [#6](https://github.com/Brosfeer/hisabii/pull/6) — Status: Ready for Review (`draft: false`, `state: open`), assigned to `@me`.
- **Granular 9-Commit Paper Trail (All Referenced to Issue #5 with Chronological Comments)**:
  1. `64a15a0`: `Chore(types): Add Ambient TypeScript Module Declarations For Static Assets (Refs #5)` — `images.d.ts` for static image asset imports in Expo SDK 57.
  2. `6128ac4`: `Chore(config): Configure Uniwind Tailwind V4 Build Engine In Metro (Refs #5)` — Metro config with `withUniwindConfig`, `global.css`, `package.json`, root `_layout.tsx`.
  3. `42eadfa`: `Chore(types): Add Uniwind React Native ClassName Type Definitions (Refs #5)` — `uniwind-types.d.ts` for JSX `className` typing across RN components.
  4. `a47dcbc`: `Feat(ui): Add Reusable SafeAreaView And Router Link Uniwind Wrappers (Refs #5)` — `src/components/ui/safe-area-view.tsx` and `src/components/ui/link.tsx`.
  5. `9f2f5b4`: `Feat(ui): Add Cross-Platform GlassView And Cached Image Primitives (Refs #5)` — `src/components/ui/glass-view.tsx` and `src/components/ui/image.tsx`.
  6. `ab500f5`: `Feat(ui): Implement Interactive Blurred GlassButton With Dynamic Themes (Refs #5)` — `src/components/ui/glass-button.tsx` with dynamic theme tint, spring touch physics, and `asChild` forwardRef.
  7. `34f2d95`: `Feat(customers): Create Bilingual Customer Seeds Dataset And Lookup Helper (Refs #5)` — `src/data/customers.ts` with `Customer` interface, 8 bilingual records, and `getCustomerById`.
  8. `d5acdae`: `Feat(customers): Elevate Customer Details Route To Root Navigation Stack (Refs #5)` — Root stack `src/app/customers/[id].tsx` preventing tab route trapping.
  9. `f387b68`: `Feat(screens): Implement Memoized 120 FPS Customer List And Document Architecture (Closes #5)` — Memoized list screen in `src/app/(tabs)/customers.tsx`, home screen links in `src/app/(tabs)/index.tsx`, and session memory update.

### 10. High-Performance 120 FPS FlatList Architecture
- **Item Memoization (`React.memo`)**: `CustomerCard` wraps list items and only re-renders when `id`, `balance`, or `status` changes:
  ```tsx
  (prevProps, nextProps) =>
    prevProps.customer.id === nextProps.customer.id &&
    prevProps.customer.balance === nextProps.customer.balance &&
    prevProps.customer.status === nextProps.customer.status
  ```
- **Fixed-Height Layout Indexing (`getItemLayout`)**: Card height fixed at `76px` with `16px` margins (`ITEM_HEIGHT = 92`), bypassing dynamic onLayout measurement overhead so the native thread can jump directly to scroll offsets.
- **Aggregation Isolation (`useMemo`)**: Financial KPIs (Total Debt, Overdue Count) computed once and decoupled from search query state.
- **Query Filtering (`useMemo`)**: Real-time multi-field search (Arabic name, English name, account number, phone) memoized on query string change.
- **Stable References (`useCallback`)**: `renderItem` and `keyExtractor` reference-stabilized to prevent unneeded VirtualizedList recalculations.

### 11. IDE & Buffer Synchronization Post-Mortem (Save Conflict Resolution)
- **Symptom**: VS Code tabs (`src/app/customers/[id].tsx`, `src/components/ui/glass-button.tsx`) refuse to save (`Ctrl+S`) or prompt on close with conflicting changes.
- **Root Cause**: The files were modified, formatted, and committed via terminal/git while open in VS Code. VS Code detected that the file timestamp/etag on disk was newer than its in-memory buffer, raising a Save Conflict dialog.
- **Resolution**:
  - Run Command Palette: `File: Revert File` (`Ctrl+Shift+P`).
  - Or click **Don't Save** / **Revert** to discard stale in-memory buffers and reload the authoritative disk contents.
