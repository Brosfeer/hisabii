import React from "react";
import { Text, View } from "react-native";

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function Header({
  title = "Hisabi",
  subtitle,
  className = "",
}: HeaderProps) {
  return (
    <View className={`py-3 px-4 ${className}`}>
      <Text className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
        {title}
      </Text>
      {subtitle ? (
        <Text className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
