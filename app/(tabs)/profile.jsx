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
import { fonts } from "../../constants/Tokens";
import { getMe, updateMe } from "../../services/userService";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  Trophy,
  PencilSimple,
  Clock,
  GearSix,
  CaretRight,
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
            <Text style={styles.badgeText}>Silver Driver</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Total Points</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Best Streak</Text>
            </View>

            <View style={styles.statCardWide}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Smart Routes</Text>
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
      paddingHorizontal: 24,
      paddingTop: 65,
      paddingBottom: 32,
    },
    avatar: {
      width: 92,
      height: 92,
      borderRadius: 46,
      backgroundColor: colors.accent,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    avatarText: {
      fontSize: 36,
      fontFamily: fonts.bold,
      color: colors.background,
    },
    name: {
      fontSize: 26,
      fontFamily: fonts.bold,
      color: colors.text,
    },
    username: {
      fontSize: 14,
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
      borderRadius: 22,
    },
    badgeText: {
      fontSize: 13,
      fontFamily: fonts.semiBold,
      color: colors.accent,
    },
    statsContainer: {
      width: "100%",
      marginTop: 28,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      justifyContent: "center",
    },
    statCard: {
      width: "48%",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      paddingVertical: 22,
      alignItems: "center",
    },
    statCardWide: {
      width: "60%",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      paddingVertical: 22,
      alignItems: "center",
    },
    statNumber: {
      fontSize: 20,
      fontFamily: fonts.bold,
      color: colors.text,
      opacity: 0.6,
    },
    actionRow: {
      width: "100%",
      marginTop: 12,
      backgroundColor: colors.surfaceDark,
      borderRadius: 18,
      paddingVertical: 18,
      paddingHorizontal: 18,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    actionLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    actionText: {
      fontSize: 16,
      fontFamily: fonts.semiBold,
      color: "#FFFFFF",
    },
    statLabel: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: colors.text,
      opacity: 0.6,
    },
    logoutButton: {
      width: "100%",
      paddingVertical: 16,
      borderRadius: 20,
      alignItems: "center",
      marginTop: 12,
      backgroundColor: colors.primary,
    },
    logoutText: {
      fontSize: 16,
      fontFamily: fonts.semiBold,
      color: "#FFFFFF",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    modalCard: {
      backgroundColor: colors.background,
      borderRadius: 24,
      padding: 24,
    },
    modalTitle: {
      fontSize: 24,
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
      borderRadius: 18,
      paddingVertical: 16,
      paddingHorizontal: 18,
      fontSize: 15,
      fontFamily: fonts.regular,
      color: colors.text,
      marginBottom: 16,
    },
    saveButton: {
      width: "100%",
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 20,
      alignItems: "center",
      marginBottom: 14,
    },
    saveButtonText: {
      fontSize: 16,
      fontFamily: fonts.semiBold,
      color: colors.background,
    },
    cancelText: {
      textAlign: "center",
      fontSize: 15,
      fontFamily: fonts.semiBold,
      color: colors.text,
      opacity: 0.7,
    },
    disabledButton: {
      opacity: 0.6,
    },
  });
