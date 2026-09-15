import { GlassButton } from "@/components/ui/glass-button";
import { Link } from "@/components/ui/link";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 p-5 gap-4"
      style={{ paddingTop: insets.top + 16 }}
    >
      <View className="mb-2">
        <Text className="font-display-bold text-3xl text-zinc-900 dark:text-zinc-100">
          حسابي
        </Text>
        <Text className="font-text text-sm text-zinc-500 mt-1">
          دفتر الحسابات والعملاء الذكي
        </Text>
      </View>

      <Link href={"/customers"} asChild>
        <GlassButton
          title="قائمة العملاء / Customer List →"
          variant="primary"
          size="lg"
        />
      </Link>
      <Link href={"/settings"} asChild>
        <GlassButton
          title="الإعدادات / Settings ⚙️"
          variant="default"
          size="md"
        />
      </Link>
    </View>
  );
}
