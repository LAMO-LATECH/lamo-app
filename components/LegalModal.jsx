import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { fonts } from "../constants/Tokens";
import { useTheme } from "../contexts/ThemeContext";

export default function LegalModal({ visible, type, onClose }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const isTerms = type === "terms";

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            {isTerms ? "Terms of Service" : "Privacy Policy"}
          </Text>
          <ScrollView style={styles.content}>
            <Text style={styles.body}>
              {isTerms
                ? "These Terms of Service explain how users may access and use LAMO. Final legal copy can be added later."
                : "This Privacy Policy explains how LAMO may collect, use, and protect user information. Final legal copy can be added later."}
            </Text>
          </ScrollView>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    modal: {
      backgroundColor: colors.background,
      borderRadius: 24,
      padding: 24,
      maxHeight: "70%",
    },
    title: {
      fontSize: 24,
      fontFamily: fonts.bold,
      color: colors.text,
      marginBottom: 16,
    },
    content: {
      marginBottom: 20,
    },
    body: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: colors.text,
      lineHeight: 22,
      opacity: 0.75,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 18,
      alignItems: "center",
    },
    buttonText: {
      color: colors.background,
      fontFamily: fonts.semiBold,
      fontSize: 16,
    },
  });
