import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { MagnifyingGlass, Microphone } from "phosphor-react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Color";
import { spacing, radius, iconSize, typography } from "../../constants/Tokens";
import VoiceListeningOverlay from "../VoiceListeningOverlay";

export default function SearchBar({ editable, defaultValue, autoFocus, onChangeText, value }) {
  const router = useRouter();
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
              color={Colors.light.primary}
              weight="bold"
            />
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Where to?"
              placeholderTextColor={Colors.light.inactive}
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
              color={Colors.light.primary}
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
            color={Colors.light.surface}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surfaceAlt,
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
    color: Colors.light.inactive,
    flex: 1,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: Colors.light.text,
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
