import {
  BlurView,
  BlurViewProps,
  BlurView as ExpoBlurView,
} from "expo-blur";
import React, { forwardRef } from "react";
import { useColorScheme } from "react-native";
import { withUniwind } from "uniwind";

const StyledBlurView = withUniwind(ExpoBlurView);

export interface GlassViewProps extends BlurViewProps {
  className?: string;
  children?: React.ReactNode;
}

export const GlassView = forwardRef<BlurView, GlassViewProps>(
  ({ children, className = "", intensity = 50, tint, ...props }, ref) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const resolvedTint = tint ?? (isDark ? "dark" : "light");

    return (
      <StyledBlurView
        ref={ref}
        intensity={intensity}
        tint={resolvedTint}
        className={`overflow-hidden rounded-2xl border border-white/25 bg-white/15 dark:bg-black/25 dark:border-white/10 ${className}`}
        {...props}
      >
        {children}
      </StyledBlurView>
    );
  },
);

GlassView.displayName = "GlassView";
