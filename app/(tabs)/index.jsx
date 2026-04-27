import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/settings">Settings Page</Link>
      <Link href="/login">Login Page</Link>
      <Link href="/signup">Signup Page</Link>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({});
