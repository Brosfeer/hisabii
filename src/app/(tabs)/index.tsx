import { GlassButton } from "@/components/ui/glass-button";
import { Link } from "@/components/ui/link";
import { View } from "react-native";
export default function HomeScreen() {
  return (
    <View className="flex-1 p-5 gap-3">
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
