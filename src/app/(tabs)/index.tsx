import { Link } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text> Welcome to Hisabi</Text>
      <Text> Running on {Platform.OS} platform</Text>
      <Link href="/customers" style={{ fontSize: 16, color: "blue" }}>
        Go to customers
      </Link>
      <Link href="/settings" style={{ fontSize: 16, color: "green" }}>
        Go to Setting
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "brown",
  },
});
