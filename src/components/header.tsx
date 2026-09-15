// import { TextInputRef } from "@expo/ui";
// import { useRef, useState } from "react";
// import { Button, StyleSheet, TextInput, View } from "react-native";

// interface HeaderProps {
//   title?: string;
//   subtitle?: string;
// }

// export default function Header({ title = "Hisabi", subtitle }: HeaderProps) {
//   const [text, onTextChange] = useState("");
//   const inputRef = useRef<TextInputRef>(null);
//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={[
//           // {
//           //   position: "absolute",
//           //   top: 0,
//           //   alignItems: "center",
//           //   zIndex: 99,
//           //   paddingHorizontal: 16,
//           //   marginTop: 30,
//           // },
//           styles.input,
//         ]}
//         defaultValue="Hi"
//         placeholder="Saya"
//         onChangeText={(value) => console.log(`Hello form ${value}`)}
//       />
//       <Button title="Search" onPress={() => inputRef.current?.clear()} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 12,
//     gap: 8,
//   },
//   input: {
//     width: "100%",
//     textAlign: "left",
//     backgroundColor: "grey",
//   },
//   subtitle: {
//     fontSize: 13,
//     color: "#666666",
//     marginTop: 2,
//   },
// });
import { Host, TextInput, useNativeState } from "@expo/ui";
import { useCallback } from "react";

function formatPhone(input: string) {
  "worklet";
  const digits = input.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function PhoneMaskExample() {
  const phone = useNativeState("(555) 123-4567");
  const selection = useNativeState({ start: 0, end: 0 });

  const handleChangeText = useCallback(
    (value: string) => {
      "worklet";
      const formatted = formatPhone(value);
      if (formatted !== value) {
        phone.value = formatted;
        // Snaps to end for demo. Real masks need smarter cursor handling.
        selection.value = { start: formatted.length, end: formatted.length };
      }
    },
    [phone, selection],
  );

  return (
    <Host matchContents={{ vertical: true }} style={{ width: "100%" }}>
      <TextInput
        value={phone}
        selection={selection}
        keyboardType="phone-pad"
        placeholder="(555) 123-4567"
        onChangeText={handleChangeText}
        style={{ backgroundColor: "grey" }}
      />
    </Host>
  );
}
