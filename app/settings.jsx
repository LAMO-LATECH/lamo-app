import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { Colors } from "../constants/Color";
import { fonts } from "../constants/Tokens";
import {
  getPreferences,
  updatePreferences,
  deleteAccount,
} from "../services/userService";
import { useAuth } from "../contexts/AuthContext";
import { CaretRight, ArrowLeft } from "phosphor-react-native";
import { router } from "expo-router";
import LegalModal from "../components/LegalModal";

const Settings = () => {
  const { logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [avoidTolls, setAvoidTolls] = useState(false);
  const [avoidHighways, setAvoidHighways] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const [legalType, setLegalType] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPreferences();
        const prefs = data.preferences || data;
        setAvoidTolls(!!prefs.avoidTolls);
        setAvoidHighways(!!prefs.avoidHighways);
        setNotifications(!!prefs.notifications);
      } catch (error) {
        console.error("Failed to load preferences:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleToggle = async (field, currentValue, setter) => {
    const newValue = !currentValue;
    setter(newValue);
    try {
      await updatePreferences({ [field]: newValue });
    } catch (error) {
      setter(currentValue);
      Alert.alert("Error", "Failed to update preference.");
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft size={24} color={Colors.light.text} weight="bold" />
      </Pressable>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Settings</Text>

        <Text style={styles.sectionHeader}>Preferences</Text>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Avoid toll roads</Text>
          <Switch
            value={avoidTolls}
            onValueChange={() =>
              handleToggle("avoidTolls", avoidTolls, setAvoidTolls)
            }
            trackColor={{ false: "#E8E1DA", true: Colors.light.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Avoid freeways</Text>
          <Switch
            value={avoidHighways}
            onValueChange={() =>
              handleToggle("avoidHighways", avoidHighways, setAvoidHighways)
            }
            trackColor={{ false: "#E8E1DA", true: Colors.light.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <Text style={styles.sectionHeader}>Notifications</Text>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={() =>
              handleToggle("notifications", notifications, setNotifications)
            }
            trackColor={{ false: "#E8E1DA", true: Colors.light.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <Text style={styles.sectionHeader}>Account</Text>

        <TouchableOpacity
          style={styles.deleteRow}
          onPress={() => setDeleteVisible(true)}
        >
          <View>
            <Text style={styles.deleteRowTitle}>Delete Account</Text>
            <Text style={styles.deleteRowSubtitle}>
              Permanently remove your account
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.accountRow}
          onPress={() => setLegalType("privacy")}
        >
          <View>
            <Text style={styles.accountRowTitle}>Data and Privacy Policy</Text>
            <Text style={styles.accountRowSubtitle}>Read our full policy</Text>
          </View>
          <CaretRight size={18} weight="bold" color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.accountRow}
          onPress={() => setLegalType("terms")}
        >
          <View>
            <Text style={styles.accountRowTitle}>Terms of Service</Text>
            <Text style={styles.accountRowSubtitle}>
              Read our terms of service
            </Text>
          </View>
          <CaretRight size={18} weight="bold" color="rgba(255,255,255,0.5)" />
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

        <LegalModal
          visible={legalType !== null}
          type={legalType}
          onClose={() => setLegalType(null)}
        />
      </ScrollView>
    </View>
  );
};
export default Settings;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 32,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: Colors.light.text,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: Colors.light.text,
    opacity: 0.5,
    textTransform: "uppercase",
    marginTop: 20,
    marginBottom: 10,
  },
  toggleRow: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E1DA",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: Colors.light.text,
  },
  accountRow: {
    backgroundColor: Colors.light.text,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  accountRowTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: "#FFFFFF",
  },
  deleteRow: {
    backgroundColor: "#D9534F",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  deleteRowTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: "#fff",
  },
  deleteRowSubtitle: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: "#fff",
    opacity: 0.6,
    marginTop: 2,
  },
  accountRowSubtitle: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: "#FFFFFF",
    opacity: 0.6,
    marginTop: 2,
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
    fontFamily: fonts.bold,
    color: Colors.light.text,
    marginBottom: 18,
    textAlign: "center",
  },
  deleteWarning: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: Colors.light.text,
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 18,
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
    fontFamily: fonts.regular,
    color: Colors.light.text,
    marginBottom: 16,
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
    fontFamily: fonts.semiBold,
    color: "#FFFFFF",
  },
  cancelText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: fonts.semiBold,
    color: Colors.light.text,
    opacity: 0.7,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
