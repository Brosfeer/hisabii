import { GlassButton } from "@/components/ui/glass-button";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Setting states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("SAR");

  return (
    <ScrollView
      className="flex-1 bg-zinc-50 dark:bg-black"
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 32,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Screen Title & Subtitle */}
      <View className="mb-6">
        <Text className="font-display-bold text-3xl text-zinc-900 dark:text-zinc-100">
          الإعدادات / Settings
        </Text>
        <Text className="font-text text-sm text-zinc-500 mt-1">
          تخصيص الهوية المحاسبية والعملة والنسخ الاحتياطي
        </Text>
      </View>

      {/* Section 1: Currency & Accounting Preferences */}
      <View className="mb-6">
        <Text className="font-digital-bold text-xs uppercase tracking-wider text-zinc-400 mb-2.5 px-1">
          العملة والدفتر / Currency & Ledger
        </Text>
        <View className="bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm gap-3">
          <View className="flex-row justify-between items-center py-1">
            <View>
              <Text className="font-digital-bold text-base text-zinc-900 dark:text-zinc-100">
                العملة الافتراضية
              </Text>
              <Text className="font-text text-xs text-zinc-500 mt-0.5">
                تُطبق على جميع قيود وسجلات العملاء
              </Text>
            </View>
            <View className="flex-row gap-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl">
              {["SAR", "USD", "AED"].map((curr) => (
                <Pressable
                  key={curr}
                  onPress={() => setSelectedCurrency(curr)}
                  className={`px-3 py-1.5 rounded-xl ${
                    selectedCurrency === curr
                      ? "bg-white dark:bg-zinc-700 shadow-sm"
                      : ""
                  }`}
                >
                  <Text
                    className={`text-xs font-digital-bold ${
                      selectedCurrency === curr
                        ? "text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-500"
                    }`}
                  >
                    {curr}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Section 2: Typography & Brand Identity Showcase */}
      <View className="mb-6">
        <Text className="font-digital-bold text-xs uppercase tracking-wider text-zinc-400 mb-2.5 px-1">
          الهوية البصرية والخطوط / Typography
        </Text>
        <View className="bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm gap-3">
          <View className="flex-row justify-between items-center">
            <View className="flex-1 pe-3">
              <Text className="font-display-bold text-base text-zinc-900 dark:text-zinc-100">
                خط ثمانية (Thmanyah Typeface)
              </Text>
              <Text className="font-text text-xs text-zinc-500 mt-1">
                المنظومة الرقمية الثلاثية: الرقمي للواجهات، النصي للسجلات، والعناوين للبانرات
              </Text>
            </View>
            <View className="bg-emerald-100 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
              <Text className="font-digital-bold text-[11px] text-emerald-700 dark:text-emerald-400">
                مفعّل (Active)
              </Text>
            </View>
          </View>

          <View className="border-t border-zinc-100 dark:border-zinc-800 pt-3 gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="font-digital-medium text-xs text-zinc-600 dark:text-zinc-400">
                عناصر الواجهة (UI Components)
              </Text>
              <Text className="font-digital-bold text-xs text-zinc-900 dark:text-zinc-100">
                thmanyah Sans
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="font-text-medium text-xs text-zinc-600 dark:text-zinc-400">
                نصوص السجلات والقيود (Ledger Notes)
              </Text>
              <Text className="font-text-bold text-xs text-zinc-900 dark:text-zinc-100">
                thmanyah Serif Text
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="font-display text-xs text-zinc-600 dark:text-zinc-400">
                العناوين والـ KPIs الكبرى (Display Titles)
              </Text>
              <Text className="font-display-bold text-xs text-zinc-900 dark:text-zinc-100">
                thmanyah Serif Display
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Section 3: Data Management & Toggles */}
      <View className="mb-6">
        <Text className="font-digital-bold text-xs uppercase tracking-wider text-zinc-400 mb-2.5 px-1">
          البيانات والأمان / Data & Security
        </Text>
        <View className="bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm gap-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-1 pe-3">
              <Text className="font-digital-bold text-base text-zinc-900 dark:text-zinc-100">
                تنبيهات استحقاق الديون
              </Text>
              <Text className="font-text text-xs text-zinc-500 mt-0.5">
                إشعار تلقائي عند تجاوز العميل لموعد السداد
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#71717a", true: "#3b82f6" }}
              thumbColor={notificationsEnabled ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          <View className="border-t border-zinc-100 dark:border-zinc-800 pt-4 flex-row justify-between items-center">
            <View className="flex-1 pe-3">
              <Text className="font-digital-bold text-base text-zinc-900 dark:text-zinc-100">
                النسخ الاحتياطي السحابي
              </Text>
              <Text className="font-text text-xs text-zinc-500 mt-0.5">
                مزامنة القيود تلقائياً عند وجود اتصال بالإنترنت
              </Text>
            </View>
            <Switch
              value={autoBackupEnabled}
              onValueChange={setAutoBackupEnabled}
              trackColor={{ false: "#71717a", true: "#3b82f6" }}
              thumbColor={autoBackupEnabled ? "#ffffff" : "#f4f3f4"}
            />
          </View>
        </View>
      </View>

      {/* Section 4: Glassmorphic Action Buttons */}
      <View className="gap-3 mb-8">
        <GlassButton
          title="تصدير كشف حسابات الدفتر (Excel / PDF)"
          variant="primary"
          size="lg"
          onPress={() => {}}
        />
        <GlassButton
          title="إنشاء نسخة احتياطية فورية (Instant Backup)"
          variant="default"
          size="md"
          onPress={() => {}}
        />
      </View>

      {/* App Version Info Footer */}
      <View className="items-center justify-center pb-4">
        <Text className="font-digital text-xs text-zinc-400">
          Hisabi v1.0.0 • صُنع بهندسة معمارية متقدمة 💕
        </Text>
      </View>
    </ScrollView>
  );
}
