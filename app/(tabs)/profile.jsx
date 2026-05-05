import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { Colors } from "../../constants/Color";

const Profile = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: Colors.light.background,
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
    borderColor: "#E8E1DA",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#D9534F",
  },
});
