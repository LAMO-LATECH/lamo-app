import { useEffect } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { Microphone, X } from "phosphor-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { Colors } from "../constants/Color";
import { spacing, typography } from "../constants/Tokens";

const RING_SIZE = 120;
const RING_DURATION = 1800;

function PulsingRing({ delay }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withTiming(1.8, { duration: RING_DURATION, easing: Easing.out(Easing.ease) }),
        -1,
        false,
      ),
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(0, { duration: RING_DURATION, easing: Easing.out(Easing.ease) }),
        -1,
        false,
      ),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.ring, animatedStyle]} />;
}

export default function VoiceListeningOverlay({ visible, onResult, onClose }) {
  const transcript = useSharedValue("");

  useSpeechRecognitionEvent("result", (event) => {
    if (!visible) return;
    const text = event.results[0]?.transcript ?? "";
    transcript.value = text;
    if (event.isFinal && text.trim()) {
      ExpoSpeechRecognitionModule.stop();
      onResult(text.trim());
    }
  });

  useSpeechRecognitionEvent("end", () => {
    if (!visible) return;
    onClose();
  });

  useSpeechRecognitionEvent("error", () => {
    if (!visible) return;
    onClose();
  });

  useEffect(() => {
    if (visible) {
      (async () => {
        const { granted } =
          await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!granted) {
          onClose();
          return;
        }
        ExpoSpeechRecognitionModule.start({
          lang: "en-US",
          interimResults: true,
          continuous: false,
        });
      })();
    } else {
      ExpoSpeechRecognitionModule.stop();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <X size={28} color={Colors.light.surface} weight="bold" />
        </Pressable>

        <View style={styles.center}>
          <Pressable style={styles.ringContainer} onPress={onClose}>
            <PulsingRing delay={0} />
            <PulsingRing delay={400} />
            <PulsingRing delay={800} />
            <View style={styles.micCircle}>
              <Microphone
                size={40}
                color={Colors.light.surface}
                weight="fill"
              />
            </View>
          </Pressable>
          <Text style={styles.statusText}>Tap to cancel</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: spacing.xl,
    padding: spacing.sm,
  },
  center: {
    alignItems: "center",
    gap: spacing.xxl,
  },
  ringContainer: {
    width: RING_SIZE * 1.8,
    height: RING_SIZE * 1.8,
    justifyContent: "center",
    alignItems: "center",
  },
  ring: {
    position: "absolute",
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  micCircle: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    ...typography.body,
    color: Colors.light.surface,
    fontSize: 18,
  },
});
