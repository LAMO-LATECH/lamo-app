import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {router} from "expo-router";
import {Colors} from "../constants/Color";
import {ShareNetwork, Star, Fire} from "phosphor-react-native";
import LottieView from "lottie-react-native";

export default function RouteComplete(){
    return(
        <View style={styles.container}>
            <View style={styles.animationBox}>
                <LottieView
                    source={require("../assets/stars.json")}
                    autoPlay
                    loop
                    style={styles.animation}
                />
            </View>
            <Text style={styles.title}>You&apos;re amazing!</Text>
            <Text style={styles.subtitle}>
                You just made LA a little better.
            </Text>

            <View style={styles.impactCard}>
                <Text style={styles.sectionLabel}>Trip Impact</Text>

                <View style={styles.pointsCard}>
                    <View style={styles.iconCircle}>
                        <Star size={22} color={Colors.light.primary} weight="fill" />
                    </View>
                    
                    <View>
                        <Text style={styles.pointsText}>+30</Text>
                        <Text style={styles.cardLabel}>Points Earned</Text>
                    </View>
                </View>

                <View style={styles.streakCard}>
                    <View style={styles.fireCircle}>
                        <Fire size={22} color={Colors.light.primary} weight="fill" />
                    </View>

                    <View style={styles.streakTextGroup}>
                        <Text style={styles.cardTitle}>5 day streak!</Text>
                        <Text style={styles.cardDescription}>
                            Just 5 more days to unlock Gold Driver.
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.shareButton} onPress={() => {}}>
                <ShareNetwork size={18} color={Colors.light.background} weight="bold" />
                <Text style={styles.shareButtonText}>Share my impact</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
                <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        alignItems: "center",
        paddingTop: 80,
        paddingBottom: 40,
        paddingHorizontal: 24,
    },
    animationBox: {
        width: 150,
        height: 130,
        borderRadius: 115,
        backgroundColor: "#FFF2E8",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 26,
    },
    animationEmoji: {
        fontSize: 54,
    },

    title: {
        fontSize: 32,
        fontFamily: "PoppinsBold",
        color: Colors.light.text,
        textAlign: "center",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: "PoppinsRegular",
        color: Colors.light.text,
        opacity: 0.65,
        textAlign: "center",
        marginBottom: 28,
    },
    impactCard: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E8E1DA",
        borderRadius: 28,
        padding: 20,
        marginBottom: 18,
    },
    sectionLabel: {
        fontSize: 12,
        fontFamily: "PoppinsSemiBold",
        color: Colors.light.text,
        opacity: 0.45,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 14,
    },
    pointsCard: {
        backgroundColor: "#FFE8C7",
        borderRadius: 20,
        padding: 18,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        minHeight: 100,
    },
    iconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: Colors.light.background,
        alignItems: "center",
        justifyContent: "center",
    },
    pointsText: {
        fontSize: 27,
        fontFamily: "PoppinsBold",
        color: Colors.light.text,
    },
    cardLabel: {
        fontSize: 13,
        fontFamily: "PoppinsRegular",
        color: Colors.light.text,
        opacity: 0.65,
    },
    streakCard: {
        backgroundColor: "#FFE0D2",
        borderRadius: 20,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        minHeight: 100,
    },
    fireCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: Colors.light.background,
        alignItems: "center",
        justifyContent: "center",
    },
    streakTextGroup: {
        flex: 1,
        justifyContent: "center",
    },
    cardTitle: {
        fontSize: 22,
        fontFamily: "PoppinsBold",
        color: Colors.light.text,
    },
    cardDescription: {
        fontSize: 12,
        fontFamily: "PoppinsRegular",
        color: Colors.light.text,
        opacity: 0.65,
        marginTop: 2,
    },
    shareButton: {
        width: "100%",
        backgroundColor: Colors.light.primary,
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
        marginTop: 8,
        marginBottom: 18,
    },
    shareButtonText: {
        fontSize: 16,
        fontFamily: "PoppinsSemiBold",
        color: Colors.light.background,
    },
    doneText: {
        fontSize: 15,
        fontFamily: "PoppinsSemiBold",
        color: Colors.light.text,
    },
    animation:{
        width: 200,
        height: 200,
    }
});