/**
 * Static Asset Ambient Module Declarations for TypeScript
 *
 * Why this file is required in Expo SDK 57:
 * 1. TypeScript by default only resolves JavaScript/TypeScript extensions (.ts, .tsx, .js, .jsx).
 *    When importing local static assets using ES module syntax:
 *      import logo from "@/assets/images/logo.png";
 *    TypeScript will fail with: `TS2307: Cannot find module '...' or its corresponding type declarations`.
 *
 * 2. Does Expo SDK 57 provide this out of the box?
 *    NO. Expo SDK 57 (`expo/types`) includes types for CSS modules (*.module.css, *.module.scss)
 *    and Metro environment APIs (`metro-require.d.ts`), but intentionally omits ambient image module
 *    declarations. This allows developers to decide how static assets are typed (e.g. `any`,
 *    `ImageSourcePropType`, raw asset numbers, or React components via `react-native-svg-transformer`).
 *
 * 3. When is this needed?
 *    - Required if you use ES imports for images (`import img from './img.png'`).
 *    - Not required if you strictly use CommonJS `require('./img.png')`, because Metro's `require`
 *      is typed to accept any string and return `any`. However, ES imports provide better bundler
 *      static analysis, tree shaking, and modern ergonomics.
 */

// Raster Image Formats
declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.jpeg" {
  const value: any;
  export default value;
}

declare module "*.gif" {
  const value: any;
  export default value;
}

// Vector Graphics (Note: If react-native-svg-transformer is added later, update this to React.FC<SvgProps>)
declare module "*.svg" {
  const value: any;
  export default value;
}

