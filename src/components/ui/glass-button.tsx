import { BlurView as ExpoBlurView } from "expo-blur";
import React, { forwardRef } from "react";
import {
  Platform,
  Pressable,
  PressableProps,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { withUniwind } from "uniwind";

const StyledBlurView = withUniwind(ExpoBlurView);

export type GlassButtonVariant = "default" | "primary" | "destructive" | "ghost";
export type GlassButtonSize = "sm" | "md" | "lg";
export interface GlassButtonProps extends Omit<PressableProps, "children"> {
  title?: string;
  icon?: React.ReactNode;
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  intensity?: number;
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
}

export const GlassButton = forwardRef<View, GlassButtonProps>(
  (
    {
      title,
      icon,
      variant = "default",
      size = "md",
      intensity,
      className = "",
      textClassName = "",
      children,
      disabled,
      ...pressableProps
    },
    ref,
  ) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    // Native blur intensity: iOS handles higher intensity smoothly,
    //   Android 12+ prefers 35-45
    const resolvedIntensity = intensity ?? (Platform.OS === "ios" ? 55 : 35);

    const resolvedTint = isDark ? "dark" : "light";

    const sizeClasses = {
      sm: "px-3 py-1.5 rounded-xl gap-1.5",
      md: "px-4 py-2.5 rounded-2xl gap-2",
      lg: "px-6 py-3.5 rounded-3xl gap-2.5",
    }[size];

    const textSizeClasses = {
      sm: "text-xs font-digital-medium",
      md: "text-sm font-digital-bold",
      lg: "text-base font-digital-bold",
    }[size];

    //2. Visual Variant Presets  (Translucent tokens + Subtle borders)
    const variantContainerClasses = {
      default:
        "bg-white/30 dark:bg-zinc-800/40 border border-white/40 dark:border-white/10 shadow-sm",
      primary:
        "bg-blue-600/20 dark:bg-blue-500/25 border border-blue-500/40 dark:border-blue-400/30 shadow-sm",
      destructive:
        "bg-red-600/20 dark:bg-red-500/25 border border-red-500/40 dark:border-red-400/30 shadow-sm",
      ghost: "bg-transparent border border-transparent shadow-none",
    }[variant];
    const variantTextClasses = {
      default: "text-zinc-900 dark:text-zinc-100",
      primary: "text-blue-700 dark:text-blue-300",
      destructive: "text-red-700 dark:text-red-300",
      ghost: "text-zinc-700 dark:text-zinc-300",
    }[variant];

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        className={`active:scale-[0.97] active:opacity-85 transition-transform ${
          disabled ? "opacity-40" : ""
        } ${className}`}
        {...pressableProps}
      >
        <StyledBlurView
          intensity={resolvedIntensity}
          tint={resolvedTint}
          className={`flex-row items-center justify-center overflow-hidden ${sizeClasses} ${variantContainerClasses}`}
        >
          {icon}
          {title ? (
            <Text
              className={`${textSizeClasses} ${variantTextClasses} ${textClassName}`}
            >
              {title}
            </Text>
          ) : null}
          {children}
        </StyledBlurView>
      </Pressable>
    );
  },
);

GlassButton.displayName = "GlassButton";
