import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { MagnifyingGlass, Microphone } from "phosphor-react-native";
import { useRouter } from "expo-router";
import { spacing, radius, iconSize, typography } from "../../constants/Tokens";
import VoiceListeningOverlay from "../VoiceListeningOverlay";
import { useTheme } from "../../contexts/ThemeContext";

export default function SearchBar({ editable, defaultValue, autoFocus, onChangeText, value }) {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [voiceVisible, setVoiceVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editable && autoFocus) {
      inputRef.current?.focus();
    }
  }, []);

  const handleVoiceResult = (text) => {
    setVoiceVisible(false);
    if (editable) {
      inputRef.current?.setNativeProps({ text });
      inputRef.current?.focus();
      onChangeText?.(text);
    } else {
      router.push({ pathname: "/search", params: { q: text } });
    }
  };

  return (
    <>
      <View style={styles.container}>
        {editable ? (
          <>
            <MagnifyingGlass
              size={iconSize.sm}
              color={colors.primary}
              weight="bold"
            />
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Where to?"
              placeholderTextColor={colors.inactive}
              defaultValue={defaultValue}
              value={value}
              onChangeText={onChangeText}
              returnKeyType="search"
            />
          </>
        ) : (
          <Pressable style={styles.searchArea} onPress={() => router.push("/search")}>
            <MagnifyingGlass
              size={iconSize.sm}
              color={colors.primary}
              weight="bold"
            />
            <Text style={styles.placeholder}>Where to?</Text>
          </Pressable>
        )}
        <Pressable
          style={styles.micButton}
          onPress={() => setVoiceVisible(true)}
        >
          <Microphone
            size={iconSize.sm}
            color={colors.surface}
            weight="fill"
          />
        </Pressable>
      </View>
      <VoiceListeningOverlay
        visible={voiceVisible}
        onResult={handleVoiceResult}
        onClose={() => setVoiceVisible(false)}
      />
    </>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surfaceAlt,
      borderRadius: radius.sm,
      paddingLeft: spacing.lg,
      paddingRight: spacing.sm,
      paddingVertical: spacing.sm,
      gap: spacing.md,
    },
    searchArea: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    placeholder: {
      ...typography.body,
      color: colors.inactive,
      flex: 1,
    },
    input: {
      flex: 1,
      ...typography.body,
      color: colors.text,
    },
    micButton: {
      width: 40,
      height: 40,
      borderRadius: radius.sm,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
  });
