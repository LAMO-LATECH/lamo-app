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
import { spacing, radius, iconSize, typography, fonts } from "../constants/Tokens";
import {
  upsertDestination,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../services/destinationService";
import useMapboxSearch from "../hooks/useMapboxSearch";
import SuggestionList from "../components/search/SuggestionList";
import { useTheme } from "../contexts/ThemeContext";

const TITLES = {
  home: "Set Home Location",
  work: "Set Work Location",
  new: "New Saved Location",
};

export default function SaveDestinationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { type, id, currentLabel, currentAddress } = useLocalSearchParams();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [label, setLabel] = useState(currentLabel ?? "");
  const [address, setAddress] = useState(currentAddress ?? "");
  const [coordinates, setCoordinates] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const search = useMapboxSearch();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isEditing =
    (type === "home" || type === "work") ? !!currentAddress : !!id;

  const canSave =
    address.trim().length > 0 && (type !== "new" || label.trim().length > 0);

  async function handleSave() {
    if (!canSave) return;
    setSaving(true);
    try {
      const payload = { address: address.trim() };
      if (coordinates) {
        payload.latitude = coordinates.latitude;
        payload.longitude = coordinates.longitude;
      }
      if (type === "home" || type === "work") {
        await upsertDestination(type, payload);
      } else if (id) {
        await updateDestination(id, { label: label.trim(), ...payload });
      } else {
        await createDestination({ label: label.trim(), ...payload });
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
            color={colors.text}
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
            placeholderTextColor={colors.inactive}
            value={label}
            onChangeText={setLabel}
            autoFocus
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor={colors.inactive}
          value={address}
          onChangeText={(text) => {
            setAddress(text);
            search.updateQuery(text);
            setShowSuggestions(true);
          }}
          autoFocus={type !== "new"}
        />

        {showSuggestions && (search.suggestions.length > 0 || search.loading) && (
          <SuggestionList
            suggestions={search.suggestions}
            loading={search.loading}
            error={search.error}
            onSelect={async (suggestion) => {
              const place = await search.selectSuggestion(suggestion);
              if (place) {
                setAddress(place.fullAddress);
                setCoordinates(place.coordinates);
              } else {
                setAddress(suggestion.fullAddress);
              }
              setShowSuggestions(false);
            }}
          />
        )}

        <Pressable
          style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={!canSave || saving}
        >
          {saving ? (
            <ActivityIndicator color={colors.background} />
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
              <ActivityIndicator color={colors.primary} />
            ) : (
              <Text style={styles.deleteBtnText}>Delete</Text>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      fontFamily: fonts.semiBold,
      color: colors.text,
    },
    form: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.lg,
      gap: spacing.md,
    },
    input: {
      ...typography.body,
      color: colors.text,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.sm,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    saveBtn: {
      backgroundColor: colors.primary,
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
      fontFamily: fonts.semiBold,
      color: colors.background,
    },
    deleteBtn: {
      borderRadius: radius.sm,
      borderWidth: 1,
      borderColor: colors.primary,
      paddingVertical: spacing.md,
      alignItems: "center",
    },
    deleteBtnText: {
      ...typography.body,
      fontFamily: fonts.semiBold,
      color: colors.primary,
    },
  });
