# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## Strict Dependency & Package Preservation
* **NO AUTOMATIC PACKAGE OR DEPENDENCY UNINSTALLATION**: Never execute package removal commands (`yarn remove`, `npm uninstall`, `pnpm remove`, `bun remove`) or delete dependencies based on agent assumptions. Retain installed libraries while testing and exploring alternatives. Only remove dependencies when explicitly commanded by the user.
* **Zero-Surprise Execution**: Never unilaterally uninstall or remove packages (`yarn remove`, `npm uninstall`) during testing, experimentation, or optimization discussions without explicit user confirmation.

