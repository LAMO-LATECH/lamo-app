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
import { Colors } from "../../constants/Color";
import { getMe, updateMe, deleteAccount } from "../../services/userService";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  Trophy,
  PencilSimple,
  Clock,
  GearSix,
  CaretRight,
} from "phosphor-react-native";

const Profile = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editVisible, setEditVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Fetch user data on mount
        const data = await getMe();
        setUser(data.user || data);
        setNewUsername((data.user || data)?.username || "");
      } catch (error) {
        // Handle error
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

  const handleDeleteAccount = async () => {
    if (confirmText.toLowerCase() !== "confirm") return;
    setDeleting(true);
    try {
      await deleteAccount();
      logout();
    } catch (error) {
      Alert.alert("Error", "Failed to delete account.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {loading ? (
        <ActivityIndicator color={Colors.light.primary} />
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
            <Trophy size={14} weight="fill" color={Colors.light.accent} />
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
            <CaretRight size={18} weight="bold" color="rgba(255,255,255,0.5)" />
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

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setDeleteVisible(true)}
          >
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>

          <Modal visible={deleteVisible} transparent>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Delete Account</Text>
                <Text style={styles.deleteWarning}>
                  This action is permanent and cannot be undone. Type "confirm"
                  below to delete your account.
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder='Type "confirm"'
                  placeholderTextColor={Colors.light.inactive}
                  value={confirmText}
                  onChangeText={setConfirmText}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={[
                    styles.deleteConfirmButton,
                    confirmText.toLowerCase() !== "confirm" &&
                      styles.disabledButton,
                  ]}
                  onPress={handleDeleteAccount}
                  disabled={confirmText.toLowerCase() !== "confirm" || deleting}
                >
                  <Text style={styles.deleteConfirmText}>
                    {deleting ? "Deleting..." : "Delete My Account"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDeleteVisible(false);
                    setConfirmText("");
                  }}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal visible={editVisible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Edit Profile</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor={Colors.light.inactive}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
    backgroundColor: Colors.light.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontFamily: "PoppinsBold",
    color: Colors.light.background,
  },
  name: {
    fontSize: 26,
    fontFamily: "PoppinsBold",
    color: Colors.light.text,
  },
  username: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
    opacity: 0.6,
    marginTop: 2,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
    backgroundColor: "#e2a94829",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 22,
  },
  badgeText: {
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.accent,
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
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E1DA",
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: "center",
  },
  statCardWide: {
    width: "60%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E1DA",
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontFamily: "PoppinsBold",
    color: Colors.light.text,
    opacity: 0.6,
  },
  actionRow: {
    width: "100%",
    marginTop: 12,
    backgroundColor: Colors.light.text,
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
    fontFamily: "PoppinsSemiBold",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
    opacity: 0.6,
  },
  title: {
    fontSize: 24,
    fontFamily: "PoppinsBold",
    color: Colors.light.text,
    marginBottom: 32,
  },
  logoutButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 12,
    backgroundColor: Colors.light.primary,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#FFFFFF",
  },
  deleteButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1C3B5",
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#FDE8E8",
  },
  deleteText: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#D9534F",
  },
  deleteWarning: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 18,
  },
  deleteConfirmButton: {
    width: "100%",
    backgroundColor: "#D9534F",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 14,
  },
  deleteConfirmText: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "PoppinsBold",
    color: Colors.light.text,
    marginBottom: 18,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E1DA",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 15,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
    marginBottom: 16,
  },
  saveButton: {
    width: "100%",
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 14,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.background,
  },
  cancelText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.text,
    opacity: 0.7,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
