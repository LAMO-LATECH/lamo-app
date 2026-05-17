import { StyleSheet, Text, View, ScrollView } from "react-native";
import { fonts } from "../../constants/Tokens";
import { Trophy, Coffee, Car, Leaf } from "phosphor-react-native";
import { useTheme } from "../../contexts/ThemeContext";

const REWARDS = [
  {
    id: 1,
    title: "Free coffee at Verve",
    partner: "Verve Coffee Roasters",
    points: 999,
    Icon: Coffee,
    iconColor: "#8B5E3C",
    iconBg: "#F4E0D0",
  },
  {
    id: 2,
    title: "$10 off Lyft ride",
    partner: "Lyft",
    points: 1200,
    Icon: Car,
    iconColor: "#A67C2E",
    iconBg: "#F5E6C8",
  },
  {
    id: 3,
    title: "Free taco bowl",
    partner: "Sweetgreen",
    points: 1500,
    Icon: Leaf,
    iconColor: "#4A7C59",
    iconBg: "#DDE9D6",
  },
];
const USER_POINTS = 1240;
const CURRENT_TIER = "Silver";
const NEXT_TIER = "Gold";
const TIER_PROGRESS = 0.62;
const POINTS_TO_NEXT = 760;

const Rewards = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Rewards</Text>
      <Text style={styles.pointsNumber}>{USER_POINTS.toLocaleString()}</Text>
      <Text style={styles.pointsLabel}>points available</Text>

      <View style={styles.tierCard}>
        <View style={styles.tierTopRow}>
          <View style={styles.tierBadge}>
            <Trophy size={14} weight="fill" color="#FFFFFF" />
            <Text style={styles.tierBadgeText}>{CURRENT_TIER} Driver</Text>
          </View>
          <Text style={styles.tierProgressText}>
            {POINTS_TO_NEXT} pts to {NEXT_TIER}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${TIER_PROGRESS * 100}%` }]}
          />
        </View>
        <View style={styles.tierLabelsRow}>
          <Text style={styles.tierLabel}>{CURRENT_TIER}</Text>
          <Text style={styles.tierLabel}>{NEXT_TIER}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>REDEEM</Text>
      {REWARDS.map((reward) => (
        <View key={reward.id} style={styles.rewardCard}>
          <View style={[styles.rewardIcon, { backgroundColor: reward.iconBg }]}>
            <reward.Icon size={26} weight="fill" color={reward.iconColor} />
          </View>
          <View style={styles.rewardInfo}>
            <Text style={styles.rewardTitle}>{reward.title}</Text>
            <Text style={styles.rewardPartner}>{reward.partner}</Text>
          </View>
          <View style={styles.pointsPill}>
            <Text style={styles.pointsPillText}>
              {reward.points.toLocaleString()}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
export default Rewards;

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingHorizontal: 24,
      paddingTop: 65,
      paddingBottom: 32,
    },
    title: {
      fontSize: 24,
      fontFamily: fonts.bold,
      color: colors.text,
      marginBottom: 16,
    },
    pointsNumber: {
      fontSize: 48,
      fontFamily: fonts.bold,
      color: colors.text,
    },
    pointsLabel: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: colors.text,
      opacity: 0.6,
      marginBottom: 28,
    },
    tierCard: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      padding: 20,
      marginBottom: 28,
    },
    tierTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
    },
    tierBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.surfaceDark,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 6,
    },
    tierBadgeText: {
      fontSize: 13,
      fontFamily: fonts.semiBold,
      color: "#FFFFFF",
    },
    tierProgressText: {
      fontSize: 13,
      fontFamily: fonts.regular,
      color: colors.text,
      opacity: 0.6,
    },
    progressTrack: {
      height: 10,
      backgroundColor: colors.border,
      borderRadius: 5,
      overflow: "hidden",
      marginBottom: 8,
    },
    progressFill: {
      height: "100%",
      backgroundColor: colors.primary,
      borderRadius: 5,
    },
    tierLabelsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    tierLabel: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: colors.text,
      opacity: 0.6,
    },
    sectionHeader: {
      fontSize: 12,
      fontFamily: fonts.semiBold,
      color: colors.text,
      opacity: 0.5,
      letterSpacing: 1.5,
      marginBottom: 14,
    },
    rewardCard: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    rewardIcon: {
      width: 52,
      height: 52,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 14,
    },
    rewardInfo: {
      flex: 1,
    },
    rewardTitle: {
      fontSize: 16,
      fontFamily: fonts.semiBold,
      color: colors.text,
    },
    rewardPartner: {
      fontSize: 13,
      fontFamily: fonts.regular,
      color: colors.text,
      opacity: 0.6,
    },
    pointsPill: {
      backgroundColor: colors.primary,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 6,
      minWidth: 64,
      alignItems: "center",
    },
    pointsPillText: {
      fontSize: 13,
      fontFamily: fonts.semiBold,
      color: "#FFFFFF",
    },
  });
