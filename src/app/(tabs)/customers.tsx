import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function CustomerList() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Customer Name / اسم العميل</Text>
        <Text style={styles.subtitle}>Customer Number / رقم العميل</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
});
