import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Modal, TextInput, Alert, } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { Colors } from "../../constants/Color";
import { getMe} from "../../services/userService";
import { useState, useEffect } from "react";
import {updateMe} from "../../services/userService";
import { router } from "expo-router";

const Profile = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editVisible, setEditVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [saving, setSaving] = useState(false);

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
    try{
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
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {loading ? (
        <ActivityIndicator color={Colors.light.primary} />
      ) : (
      <>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {(user?.username || user?.email || "U").charAt(0).toUpperCase()}
          </Text>
        </View>
        
        <Text style={styles.name}>
          {user?.username || "LAMO User"}
        </Text>

        <Text style={styles.username}>
          {user?.email || "@angeleno"}
        </Text>

        <View style={styles.badge}>
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
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionRow}
          onPress={() => router.push("/rideHistory")}
        >
          <Text style={styles.actionText}>Ride History</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionRow}
          onPress={() => router.push("/settings")}
        >
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Modal
          visible={editVisible}
          animationType="slide"
          transparent>
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
  </View>
);
};
export default Profile;

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 65,
    paddingBottom: 32,
    backgroundColor: Colors.light.background,
  },
  avatar:{
    width:92,
    height:92,
    borderRadius:46,
    backgroundColor: Colors.light.accent,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:16,
  },
  avatarText:{
    fontSize:36,
    fontFamily:"PoppinsBold",
    color:Colors.light.background,
  },
  name: {
    fontSize: 26,
    fontFamily: "PoppinsBold",
    color: Colors.light.text,
  },
  username:{
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
    opacity:0.6,
    marginTop:2,
  },
  badge:{
    marginTop:14,
    backgroundColor: "#e2a94829",
    paddingHorizontal:18,
    paddingVertical:0.6,
    borderRadius:22,
  },
  badgeText:{
    fontSize:13,
    fontFamily:"PoppinsSemiBold",
    color: Colors.light.accent,
  },
  statsContainer:{
    width:"100%",
    marginTop:28,
    flexDirection:"row",
    flexWrap:"wrap",
    gap: 12,
    justifyContent:"center",
  },
  statCard:{
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E1DA",
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: "center",
  },
  statCardWide:{
    width: "60%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E1DA",
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: "center",
  },
  statNumber:{
    fontSize: 20,
    fontFamily: "PoppinsBold",
    color: Colors.light.text,
    opacity:0.6,
  },
  actionRow:{
    width:"100%",
    marginTop:12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E1DA",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  actionText:{
    fontSize:16,
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.text,
  },
  statLabel:{
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
    opacity:0.6,
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
    borderWidth: 1,
    borderColor: "#F1C3B5",
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#F1C3B529",
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#D9534F",
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