import { getCustomerById } from "@/data/customers";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { I18nManager, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomerDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/customers" as any);
    }
  }, [router]);

  // Memoize customer lookup by ID
  const customer = useMemo(() => {
    return id ? getCustomerById(id) : undefined;
  }, [id]);

  const backArrow = I18nManager.isRTL ? "→" : "←";

  if (!customer) {
    return (
      <View
        className="flex-1 justify-center items-center bg-zinc-50 dark:bg-black p-6"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <Text className="font-digital-bold text-lg text-red-500">
          العميل غير موجود / Customer not found
        </Text>
        <Pressable
          onPress={() => router.replace("/(tabs)" as any)}
          className="mt-4 px-5 py-2.5 bg-zinc-800 dark:bg-zinc-100 rounded-xl active:opacity-80"
        >
          <Text className="font-digital-medium text-white dark:text-zinc-900">
            العودة للرئيسية
          </Text>
        </Pressable>
      </View>
    );
  }

  const isOverdue = customer.status === "overdue";
  const owesMoney = customer.balance > 0;

  return (
    <View
      className="flex-1 bg-zinc-50 dark:bg-black p-5"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* Back Button with Native Stack Popping and Directional RTL Adaptation */}
      <Pressable
        onPress={handleBack}
        className="self-start px-3.5 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-4 active:opacity-75"
      >
        <Text className="font-digital-medium text-xs text-zinc-800 dark:text-zinc-200">
          {backArrow} العودة للقائمة (Back)
        </Text>
      </Pressable>

      {/* Customer Overview Card */}
      <View className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="font-display-bold text-2xl text-zinc-900 dark:text-zinc-100">
              {customer.nameAr}
            </Text>
            <Text className="font-digital text-sm text-zinc-500 mt-0.5">
              {customer.nameEn} • {customer.accountNumber}
            </Text>
            <Text className="font-digital text-sm text-zinc-400 mt-1">
              {customer.phone}
            </Text>
          </View>
          <View
            className={`px-3 py-1 rounded-full ${
              isOverdue
                ? "bg-red-100 dark:bg-red-950/40"
                : owesMoney
                  ? "bg-amber-100 dark:bg-amber-950/40"
                  : "bg-emerald-100 dark:bg-emerald-950/40"
            }`}
          >
            <Text
              className={`font-digital-bold text-xs ${
                isOverdue
                  ? "text-red-700 dark:text-red-400"
                  : owesMoney
                    ? "text-amber-700 dark:text-amber-400"
                    : "text-emerald-700 dark:text-emerald-400"
              }`}
            >
              {customer.status.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Balance KPI Banner */}
        <View className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 flex-row justify-between items-center">
          <Text className="font-text-bold text-sm text-zinc-600 dark:text-zinc-400">
            الرصيد القائم (Current Balance):
          </Text>
          <Text className="font-display-black text-2xl text-amber-600 dark:text-amber-400">
            {customer.balance.toLocaleString()} {customer.currency}
          </Text>
        </View>
      </View>
    </View>
  );
}
