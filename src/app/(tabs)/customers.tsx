import { Link } from "@/components/ui/link";
import { Customer, CUSTOMER_SEEDS } from "@/data/customers";
import { memo, useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Fixed card height for getItemLayout optimization (Card 76px + Margin 16px)
const ITEM_HEIGHT = 92;

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard = memo(
  ({ customer }: CustomerCardProps) => {
    const isOverdue = customer.status === "overdue";
    const isSettled = customer.balance === 0;
    const owesMoney = customer.balance > 0;

    return (
      <Link href={`/customers/${customer.id}`} asChild>
        <Pressable
          className="bg-white dark:bg-zinc-900 mx-4 my-2 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm active:opacity-75"
          style={{ height: 76 }}
        >
          <View className="flex-1 flex-row justify-between items-center">
            {/* Customer Information */}
            <View className="flex-1 pr-3">
              <View className="flex-row items-center gap-2">
                <Text
                  className="text-base font-bold text-zinc-900 dark:text-zinc-100"
                  numberOfLines={1}
                >
                  {customer.nameAr}
                </Text>
                <View
                  className={`w-2 h-2 rounded-full ${
                    isOverdue
                      ? "bg-red-500"
                      : owesMoney
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                />
              </View>
              <Text className="text-xs text-zinc-500 mt-0.5" numberOfLines={1}>
                {customer.nameEn} • {customer.accountNumber}
              </Text>
              <Text
                className="text-[11px] text-zinc-400 mt-0.5"
                numberOfLines={1}
              >
                {customer.phone}
              </Text>
            </View>

            {/* Financial Balance */}
            <View className="items-end min-w-[90px]">
              <Text
                className={`text-base font-black ${
                  isOverdue
                    ? "text-red-600 dark:text-red-400"
                    : owesMoney
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-emerald-600 dark:text-emerald-400"
                }`}
                numberOfLines={1}
              >
                {Math.abs(customer.balance).toLocaleString()}{" "}
                {customer.currency}
              </Text>
              <Text className="text-[10px] font-medium text-zinc-500 mt-0.5">
                {isSettled
                  ? "خالص (Settled)"
                  : owesMoney
                    ? "عليه (Debt)"
                    : "له (Credit)"}
              </Text>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  },
  (prevProps, nextProps) =>
    prevProps.customer.id === nextProps.customer.id &&
    prevProps.customer.balance === nextProps.customer.balance &&
    prevProps.customer.status === nextProps.customer.status,
);

CustomerCard.displayName = "CustomerCard";

export default function CustomerListScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Memoized Aggregated Metrics (Calculated once)
  const metrics = useMemo(() => {
    return CUSTOMER_SEEDS.reduce(
      (acc, c) => {
        if (c.balance > 0) acc.totalDebt += c.balance;
        if (c.status === "overdue") acc.overdueCount += 1;
        return acc;
      },
      { totalDebt: 0, overdueCount: 0 },
    );
  }, []);

  // 2. Memoized Instant Search Filtering
  const filteredCustomers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return CUSTOMER_SEEDS;

    return CUSTOMER_SEEDS.filter(
      (c) =>
        c.nameAr.toLowerCase().includes(query) ||
        c.nameEn.toLowerCase().includes(query) ||
        c.accountNumber.toLowerCase().includes(query) ||
        c.phone.includes(query),
    );
  }, [searchQuery]);

  // 3. Stable Callback for renderItem
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Customer>) => (
      <CustomerCard customer={item} />
    ),
    [],
  );

  // 4. Stable Callback for keyExtractor
  const keyExtractor = useCallback((item: Customer) => item.id, []);

  // 5. Fixed Height Calculation for 120 FPS Scroll Acceleration
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <View
      className="flex-1 bg-zinc-50 dark:bg-black"
      style={{ paddingTop: insets.top }}
    >
      {/* Header & Financial KPI Summary */}
      <View className="px-5 pt-3 pb-2">
        <Text className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
          العملاء / Customers
        </Text>

        <View className="flex-row gap-3 mt-3">
          <View className="flex-1 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <Text className="text-[11px] text-zinc-500 font-medium">
              إجمالي الديون (Total Debt)
            </Text>
            <Text className="text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5">
              {metrics.totalDebt.toLocaleString()} SAR
            </Text>
          </View>
          <View className="flex-1 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <Text className="text-[11px] text-zinc-500 font-medium">
              المتأخرين (Overdue)
            </Text>
            <Text className="text-lg font-black text-red-600 dark:text-red-400 mt-0.5">
              {metrics.overdueCount} عملاء
            </Text>
          </View>
        </View>

        {/* Instant Search Bar */}
        <View className="mt-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3.5 py-2.5">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="بحث بالاسم أو الرقم أو الحساب..."
            placeholderTextColor="#a1a1aa"
            className="text-sm text-zinc-900 dark:text-zinc-100 p-0"
            clearButtonMode="while-editing"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Optimized Virtualized FlatList */}
      <FlatList
        data={filteredCustomers}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS === "android"}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center pt-16 px-4">
            <Text className="text-base font-bold text-zinc-400">
              لا توجد نتائج مطابقة لـ "{searchQuery}"
            </Text>
            <Text className="text-xs text-zinc-500 mt-1">
              تحقق من صحة رقم العميل أو الاسم
            </Text>
          </View>
        }
      />
    </View>
  );
}
