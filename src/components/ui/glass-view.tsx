import { BlurViewProps, BlurView as ExpoBlurView } from "expo-blur";
import React from "react";
import { withUniwind } from "uniwind";
const StyledBlurView = withUniwind(ExpoBlurView);

export interface GlassViweProp extends BlurViewProps {
  className?: string;
  children?: React.ReactNode;
}

export function GlassView({
  children,
  className = "",
  intensity = 50,
  tint = "default",
  ...props
}: GlassViweProp) {
  return (
    <StyledBlurView
      intensity={intensity}
      tint={tint}
      className={`overflow-hidden rounded-2xl border border-white/25 bg-white/15 dark:bg-black/25 dark:border-white/10 ${className}`}
      {...props}
    >
      {children}
    </StyledBlurView>
  );
}
