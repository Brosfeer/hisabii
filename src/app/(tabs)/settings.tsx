import { StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings / الإعدادات</Text>
      <Text style={styles.subtitle}>Hisabi Accounting App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 8,
  },
});
