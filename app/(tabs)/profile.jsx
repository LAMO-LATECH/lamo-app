import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import {
  fonts,
  spacing,
  radius,
  typography,
  iconSize,
} from "../../constants/Tokens";
import { getMe, updateMe } from "../../services/userService";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  Trophy,
  PencilSimple,
  Clock,
  GearSix,
  CaretRight,
  Star,
  Fire,
  Car,
} from "phosphor-react-native";
import { useTheme } from "../../contexts/ThemeContext";

const Profile = () => {
  const { logout } = useAuth();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editVisible, setEditVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user || data);
        setNewUsername((data.user || data)?.username || "");
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleSaveProfile = async () => {
    if (!newUsername.trim()) {
      Alert.alert("Error", "Username cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      const updated = await updateMe({ username: newUsername.trim() });
      setUser(updated.user || updated);
      setEditVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(user?.username || user?.email || "U").charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.name}>{user?.username || "LAMO User"}</Text>

          <Text style={styles.username}>{user?.email || "@angeleno"}</Text>

          <View style={styles.badge}>
            <Trophy size={14} weight="fill" color={colors.accent} />
            <Text style={styles.badgeText}>
              {user?.badge
                ? user.badge.charAt(0).toUpperCase() + user.badge.slice(1)
                : "Bronze"}{" "}
              Driver
            </Text>
          </View>

          <View style={styles.impactCard}>
            <Text style={styles.impactHeader}>Your Impact</Text>

            <View style={styles.impactRow}>
              <View style={styles.pointsCard}>
                <View style={styles.statTopRow}>
                  <Star size={iconSize.sm} weight="fill" color="#FFFFFF" />
                  <Text style={styles.impactStatNumberLight}>
                    {(user?.points ?? 0).toLocaleString()}
                  </Text>
                </View>
                <Text style={styles.impactStatLabelLight}>
                  Total points earned
                </Text>
              </View>

              <View style={styles.streakCard}>
                <View style={styles.statTopRow}>
                  <Fire
                    size={iconSize.sm}
                    weight="fill"
                    color={colors.primary}
                  />
                  <Text style={styles.impactStatNumber}>
                    {user?.streak ?? 0}
                  </Text>
                </View>
                <Text style={styles.impactStatLabel}>Best streak</Text>
              </View>
            </View>

            <View style={styles.smartRoutesRow}>
              <Car size={iconSize.md} weight="fill" color={colors.primary} />
              <View>
                <Text style={styles.smartRoutesNumber}>
                  {user?.routesAccepted ?? 0} smart routes
                </Text>
                <Text style={styles.smartRoutesSub}>
                  Helped reduce LA traffic
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => setEditVisible(true)}
          >
            <View style={styles.actionLeft}>
              <PencilSimple size={20} weight="bold" color="#FFFFFF" />
              <Text style={styles.actionText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => router.push("/rideHistory")}
          >
            <View style={styles.actionLeft}>
              <Clock size={20} weight="bold" color="#FFFFFF" />
              <Text style={styles.actionText}>Ride History</Text>
            </View>
            <CaretRight size={18} weight="bold" color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => router.push("/settings")}
          >
            <View style={styles.actionLeft}>
              <GearSix size={20} weight="bold" color="#FFFFFF" />
              <Text style={styles.actionText}>Settings</Text>
            </View>
            <CaretRight size={18} weight="bold" color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Modal visible={editVisible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Edit Profile</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor={colors.inactive}
                  value={newUsername}
                  onChangeText={setNewUsername}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={[styles.saveButton, saving && styles.disabledButton]}
                  onPress={handleSaveProfile}
                  disabled={saving}
                >
                  <Text style={styles.saveButtonText}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditVisible(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </ScrollView>
  );
};
export default Profile;

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      alignItems: "center",
      paddingHorizontal: spacing.xxl,
      paddingTop: 65,
      paddingBottom: spacing.xxxl,
    },
    avatar: {
      width: 92,
      height: 92,
      borderRadius: 46,
      backgroundColor: colors.accent,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.lg,
    },
    avatarText: {
      fontSize: typography.h1.fontSize,
      fontFamily: fonts.bold,
      color: colors.background,
    },
    name: {
      fontSize: typography.h4.fontSize,
      fontFamily: fonts.bold,
      color: colors.text,
    },
    username: {
      fontSize: typography.bodySmall.fontSize,
      fontFamily: fonts.regular,
      color: colors.text,
      opacity: 0.6,
      marginTop: 2,
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 14,
      backgroundColor: colors.surfaceAlt,
      paddingHorizontal: 18,
      paddingVertical: 6,
      borderRadius: radius.md,
    },
    badgeText: {
      fontSize: typography.bodySmall.fontSize,
      fontFamily: fonts.semiBold,
      color: colors.accent,
    },
    impactCard: {
      width: "100%",
      marginTop: 28,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      padding: spacing.lg,
      gap: spacing.md,
    },
    impactHeader: {
      fontSize: typography.caption.fontSize,
      fontFamily: fonts.semiBold,
      color: colors.text,
      opacity: 0.5,
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    impactRow: {
      flexDirection: "row",
      gap: spacing.md,
    },
    statTopRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    pointsCard: {
      backgroundColor: colors.primary,
      borderRadius: radius.sm,
      padding: spacing.lg,
      gap: 4,
    },
    streakCard: {
      flex: 1,
      backgroundColor: colors.surfaceAlt,
      borderRadius: radius.sm,
      padding: spacing.lg,
      gap: 4,
    },
    impactStatNumberLight: {
      fontSize: 22,
      fontFamily: fonts.bold,
      color: "#FFFFFF",
    },
    impactStatLabelLight: {
      fontSize: typography.caption.fontSize,
      fontFamily: fonts.regular,
      color: "#FFFFFF",
      opacity: 0.85,
    },
    impactStatNumber: {
      fontSize: 22,
      fontFamily: fonts.bold,
      color: colors.text,
    },
    impactStatLabel: {
      fontSize: typography.caption.fontSize,
      fontFamily: fonts.regular,
      color: colors.text,
      opacity: 0.6,
    },
    smartRoutesRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      backgroundColor: colors.surfaceAlt,
      borderRadius: radius.sm,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    smartRoutesNumber: {
      fontSize: typography.body.fontSize,
      fontFamily: fonts.bold,
      color: colors.text,
    },
    smartRoutesSub: {
      fontSize: typography.caption.fontSize,
      fontFamily: fonts.regular,
      color: colors.text,
      opacity: 0.6,
    },
    actionRow: {
      width: "100%",
      marginTop: spacing.md,
      backgroundColor: colors.surfaceDark,
      borderRadius: radius.md,
      paddingVertical: 18,
      paddingHorizontal: 18,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    actionLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    actionText: {
      fontSize: typography.body.fontSize,
      fontFamily: fonts.semiBold,
      color: "#FFFFFF",
    },
    statLabel: {
      fontSize: typography.caption.fontSize,
      fontFamily: fonts.regular,
      color: colors.text,
      opacity: 0.6,
    },
    logoutButton: {
      width: "100%",
      paddingVertical: spacing.lg,
      borderRadius: radius.md,
      alignItems: "center",
      marginTop: spacing.md,
      backgroundColor: colors.primary,
    },
    logoutText: {
      fontSize: typography.body.fontSize,
      fontFamily: fonts.semiBold,
      color: "#FFFFFF",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: "center",
      paddingHorizontal: spacing.xxl,
    },
    modalCard: {
      backgroundColor: colors.background,
      borderRadius: radius.lg,
      padding: spacing.xxl,
    },
    modalTitle: {
      fontSize: typography.h4.fontSize,
      fontFamily: fonts.bold,
      color: colors.text,
      marginBottom: 18,
      textAlign: "center",
    },
    input: {
      width: "100%",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      paddingVertical: spacing.lg,
      paddingHorizontal: 18,
      fontSize: typography.bodySmall.fontSize,
      fontFamily: fonts.regular,
      color: colors.text,
      marginBottom: spacing.lg,
    },
    saveButton: {
      width: "100%",
      backgroundColor: colors.primary,
      paddingVertical: spacing.lg,
      borderRadius: radius.md,
      alignItems: "center",
      marginBottom: 14,
    },
    saveButtonText: {
      fontSize: typography.body.fontSize,
      fontFamily: fonts.semiBold,
      color: colors.background,
    },
    cancelText: {
      textAlign: "center",
      fontSize: typography.bodySmall.fontSize,
      fontFamily: fonts.semiBold,
      color: colors.text,
      opacity: 0.7,
    },
    disabledButton: {
      opacity: 0.6,
    },
  });
