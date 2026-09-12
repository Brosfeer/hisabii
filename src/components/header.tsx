import { StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ title = "Hisabi", subtitle }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 13,
    color: "#666666",
    marginTop: 2,
  },
});
