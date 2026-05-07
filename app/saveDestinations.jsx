import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "phosphor-react-native";
import { Colors } from "../constants/Color";
import { spacing, radius, iconSize, typography } from "../constants/Tokens";
import {
  upsertDestination,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../services/destinationService";

const TITLES = {
  home: "Set Home Location",
  work: "Set Work Location",
  new: "New Saved Location",
};

export default function SaveDestinationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { type, id, currentLabel, currentAddress } = useLocalSearchParams();

  const [label, setLabel] = useState(currentLabel ?? "");
  const [address, setAddress] = useState(currentAddress ?? "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isEditing =
    (type === "home" || type === "work") ? !!currentAddress : !!id;

  const canSave =
    address.trim().length > 0 && (type !== "new" || label.trim().length > 0);

  async function handleSave() {
    if (!canSave) return;
    setSaving(true);
    try {
      if (type === "home" || type === "work") {
        await upsertDestination(type, { address: address.trim() });
      } else if (id) {
        await updateDestination(id, {
          label: label.trim(),
          address: address.trim(),
        });
      } else {
        await createDestination({
          label: label.trim(),
          address: address.trim(),
        });
      }
      router.back();
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to save destination");
    } finally {
      setSaving(false);
    }
  }

  function handleDelete() {
    Alert.alert("Delete Destination", "Are you sure you want to remove this saved location?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setDeleting(true);
          try {
            if (type === "home" || type === "work") {
              await deleteDestination(type);
            } else {
              await deleteDestination(id);
            }
            router.back();
          } catch (err) {
            Alert.alert("Error", err.message || "Failed to delete destination");
          } finally {
            setDeleting(false);
          }
        },
      },
    ]);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <ArrowLeft
            size={iconSize.md}
            color={Colors.light.text}
            weight="bold"
          />
        </Pressable>
        <Text style={styles.title}>{TITLES[type] ?? TITLES.new}</Text>
      </View>

      <View style={styles.form}>
        {type === "new" && (
          <TextInput
            style={styles.input}
            placeholder="Location name"
            placeholderTextColor={Colors.light.inactive}
            value={label}
            onChangeText={setLabel}
            autoFocus
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor={Colors.light.inactive}
          value={address}
          onChangeText={setAddress}
          autoFocus={type !== "new"}
        />

        <Pressable
          style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={!canSave || saving}
        >
          {saving ? (
            <ActivityIndicator color={Colors.light.background} />
          ) : (
            <Text style={styles.saveBtnText}>Save</Text>
          )}
        </Pressable>

        {isEditing && (
          <Pressable
            style={styles.deleteBtn}
            onPress={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <ActivityIndicator color={Colors.light.primary} />
            ) : (
              <Text style={styles.deleteBtnText}>Delete</Text>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  title: {
    ...typography.body,
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.text,
  },
  form: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  input: {
    ...typography.body,
    color: Colors.light.text,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  saveBtn: {
    backgroundColor: Colors.light.primary,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveBtnText: {
    ...typography.body,
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.background,
  },
  deleteBtn: {
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  deleteBtnText: {
    ...typography.body,
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.primary,
  },
});
