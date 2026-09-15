import { GlassButton } from "@/components/ui/glass-button";
import { Link } from "@/components/ui/link";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 p-5 gap-3"
      style={{ paddingTop: insets.top + 16 }}
    >
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
