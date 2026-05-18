import { View, Text, StyleSheet, Pressable, Share, ActivityIndicator, Linking } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { ShareNetwork, BookmarkSimple, NavigationArrow, X, Phone, Globe, Clock } from "phosphor-react-native";
import { useState } from "react";
import { spacing, radius, typography, iconSize } from "../../constants/Tokens";
import { useTheme } from "../../contexts/ThemeContext";
import { createDestination } from "../../services/destinationService";

export default function PlaceDetailsSheet({ destination, onDirections, onDismiss, routeLoading }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${destination.name} - ${destination.fullAddress}`,
        title: destination.name,
      });
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  const handleSave = async () => {
    try {
      await createDestination({
        label: destination.name,
        address: destination.fullAddress,
        latitude: destination.latitude,
        longitude: destination.longitude,
      });
      setSaved(true);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleCall = () => {
    if (destination.phone) Linking.openURL(`tel:${destination.phone}`);
  };

  const handleWebsite = () => {
    if (destination.website) Linking.openURL(destination.website);
  };

  const formatCategory = (cat) => {
    if (!cat) return null;
    return cat.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const category = formatCategory(destination.category);

  return (
    <BottomSheetView style={styles.container}>
      <Pressable style={styles.closeButton} onPress={onDismiss} hitSlop={12}>
        <X size={20} color={colors.inactive} />
      </Pressable>

      {/* Place header */}
      <View style={styles.placeHeader}>
        <Text style={styles.name} numberOfLines={2}>{destination.name}</Text>
        {category && (
          <Text style={styles.category}>{category}</Text>
        )}
        <Text style={styles.address} numberOfLines={2}>{destination.fullAddress}</Text>
      </View>

      {/* Action buttons row */}
      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={onDirections}>
          <View style={[styles.iconSquare, { backgroundColor: colors.primary }]}>
            {routeLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <NavigationArrow size={iconSize.sm} color="#ffffff" weight="fill" />
            )}
          </View>
          <Text style={styles.actionLabel}>Directions</Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={handleSave} disabled={saved}>
          <View style={[styles.iconSquare, { backgroundColor: saved ? colors.primary + "20" : colors.surfaceDark }]}>
            <BookmarkSimple size={iconSize.sm} color={saved ? colors.primary : colors.accent} weight={saved ? "fill" : "fill"} />
          </View>
          <Text style={[styles.actionLabel, saved && { color: colors.primary }]}>
            {saved ? "Saved" : "Save"}
          </Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={handleShare}>
          <View style={[styles.iconSquare, { backgroundColor: colors.surfaceDark }]}>
            <ShareNetwork size={iconSize.sm} color={colors.accent} weight="fill" />
          </View>
          <Text style={styles.actionLabel}>Share</Text>
        </Pressable>

        {destination.phone && (
          <Pressable style={styles.actionButton} onPress={handleCall}>
            <View style={[styles.iconSquare, { backgroundColor: colors.surfaceDark }]}>
              <Phone size={iconSize.sm} color={colors.accent} weight="fill" />
            </View>
            <Text style={styles.actionLabel}>Call</Text>
          </Pressable>
        )}
      </View>

      {/* Info rows */}
      {(destination.phone || destination.website || destination.openHours) && (
        <View style={styles.infoSection}>
          {destination.openHours && (
            <View style={styles.infoRow}>
              <Clock size={18} color={colors.inactive} />
              <Text style={styles.infoText} numberOfLines={1}>
                {typeof destination.openHours === "string"
                  ? destination.openHours
                  : "Hours available"}
              </Text>
            </View>
          )}
          {destination.phone && (
            <View style={styles.infoRow}>
              <Phone size={18} color={colors.inactive} />
              <Text style={styles.infoText}>{destination.phone}</Text>
            </View>
          )}
          {destination.website && (
            <Pressable style={styles.infoRow} onPress={handleWebsite}>
              <Globe size={18} color={colors.inactive} />
              <Text style={[styles.infoText, { color: colors.primary }]} numberOfLines={1}>
                {destination.website.replace(/^https?:\/\/(www\.)?/, "")}
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </BottomSheetView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.xxxl,
      gap: spacing.lg,
    },
    closeButton: {
      position: "absolute",
      top: 0,
      right: spacing.xl,
      zIndex: 1,
    },
    placeHeader: {
      gap: spacing.xs,
      paddingRight: spacing.xxxl,
    },
    name: {
      ...typography.h4,
      color: colors.text,
    },
    category: {
      ...typography.caption,
      color: colors.primary,
      textTransform: "capitalize",
    },
    address: {
      ...typography.bodySmall,
      color: colors.inactive,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: spacing.xl,
    },
    actionButton: {
      alignItems: "center",
      gap: spacing.xs,
    },
    iconSquare: {
      width: 48,
      height: 48,
      borderRadius: radius.sm,
      alignItems: "center",
      justifyContent: "center",
    },
    actionLabel: {
      ...typography.caption,
      color: colors.text,
    },
    infoSection: {
      gap: spacing.md,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    infoText: {
      ...typography.bodySmall,
      color: colors.text,
      flex: 1,
    },
  });
