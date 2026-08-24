import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { BRAND, ColorDots, getBrandColors, RoomwiseCard, SectionHeader } from "@/components/roomwise-ui";
import { IMAGE_URLS } from "@/constants/roomwise";
import { useRoomwise } from "@/lib/roomwise-context";
import { useThemeContext } from "@/lib/theme-provider";

export default function HomeScreen() {
  const { savedDesigns, openSavedDesign } = useRoomwise();
  const { colorScheme } = useThemeContext();
  const colors = getBrandColors(colorScheme === "dark");

  return (
    <ScreenContainer containerClassName="bg-background" className="px-5">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.kicker, { color: colors.terracotta }]}>GOOD EVENING</Text>
            <Text style={[styles.greeting, { color: colors.ink }]}>Make room for better.</Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Open profile" onPress={() => router.push("/profile")} style={({ pressed }) => [styles.avatar, { backgroundColor: colors.terracottaSoft }, pressed && styles.pressed]}>
            <Text style={[styles.avatarText, { color: colors.terracotta }]}>R</Text>
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <Image source={{ uri: IMAGE_URLS.livingRoom }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroScrim} />
          <View style={styles.heroTopline}>
            <View style={styles.aiBadge}>
              <MaterialIcons name="auto-awesome" size={14} color="#FFF9F3" />
              <Text style={styles.aiBadgeText}>AI INTERIOR STYLIST</Text>
            </View>
            <View style={styles.privacyBadge}>
              <MaterialIcons name="lock-outline" size={13} color="#FFF9F3" />
              <Text style={styles.privacyText}>Private by default</Text>
            </View>
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>See the room{`\n`}in a new light.</Text>
            <Text style={styles.heroBody}>Upload a room photo and get a thoughtful redesign direction in minutes.</Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Start a new design" onPress={() => router.push("/setup")} style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}>
              <Text style={styles.heroButtonText}>Start a new design</Text>
              <MaterialIcons name="arrow-forward" size={18} color={BRAND.terracotta} />
            </Pressable>
          </View>
        </View>

        <View style={styles.statsRow}>
          <RoomwiseCard style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
            <Text style={[styles.statValue, { color: colors.ink }]}>{savedDesigns.length}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>saved direction{savedDesigns.length === 1 ? "" : "s"}</Text>
          </RoomwiseCard>
          <RoomwiseCard style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
            <View style={styles.statIconRow}><MaterialIcons name="bolt" size={17} color={BRAND.sage} /><Text style={[styles.statValue, { color: colors.ink }]}>Fast</Text></View>
            <Text style={[styles.statLabel, { color: colors.muted }]}>guided analysis</Text>
          </RoomwiseCard>
          <RoomwiseCard style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
            <MaterialIcons name="shield" size={18} color={colors.terracotta} />
            <Text style={[styles.statLabel, { color: colors.muted, marginTop: 6 }]}>local first</Text>
          </RoomwiseCard>
        </View>

        <SectionHeader title="Recent designs" action="See all" onAction={() => router.push("/designs")} />
        <FlatList
          horizontal
          data={savedDesigns}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentList}
          renderItem={({ item }) => (
            <Pressable accessibilityRole="button" accessibilityLabel={`Open ${item.roomType} design`} onPress={() => { openSavedDesign(item); router.push("/editor"); }} style={({ pressed }) => [styles.recentCard, { backgroundColor: colors.surface, borderColor: colors.line }, pressed && styles.pressed]}>
              <Image source={{ uri: item.imageUri }} style={styles.recentImage} />
              <View style={styles.recentOverlay} />
              <View style={styles.recentMeta}>
                <View style={styles.recentPill}><Text style={styles.recentPillText}>{item.style}</Text></View>
                <Text style={styles.recentTitle}>{item.roomType}</Text>
                <View style={styles.recentFooter}>
                  <Text style={styles.recentDate}>{item.createdAt}</Text>
                  <ColorDots colors={["#E8DED0", "#7F947B", item.accentColor]} />
                </View>
              </View>
            </Pressable>
          )}
        />

        <RoomwiseCard style={[styles.tipCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <View style={[styles.tipIcon, { backgroundColor: colors.terracottaSoft }]}><MaterialIcons name="lightbulb-outline" size={21} color={colors.terracotta} /></View>
          <View style={styles.tipCopy}>
            <Text style={[styles.tipTitle, { color: colors.ink }]}>A better brief, a better room</Text>
            <Text style={[styles.tipBody, { color: colors.muted }]}>Tell Roomwise how you live, not just how you decorate. Your preferences shape every recommendation.</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color={colors.muted} />
        </RoomwiseCard>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 12, paddingBottom: 30, gap: 22 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  kicker: { fontSize: 10, fontWeight: "800", letterSpacing: 1.8, marginBottom: 5 },
  greeting: { fontSize: 25, lineHeight: 31, fontWeight: "800", letterSpacing: -0.5 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 18, fontWeight: "800" },
  heroCard: { height: 330, borderRadius: 26, overflow: "hidden", backgroundColor: "#3A3934", shadowColor: "#35261F", shadowOpacity: 0.2, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 4 },
  heroImage: { ...StyleSheet.absoluteFillObject, width: undefined, height: undefined },
  heroScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(28, 27, 23, 0.45)" },
  heroTopline: { position: "absolute", top: 18, left: 18, right: 18, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  aiBadge: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(185, 101, 74, 0.9)", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 100 },
  aiBadgeText: { color: "#FFF9F3", fontSize: 9, fontWeight: "800", letterSpacing: 1.1 },
  privacyBadge: { flexDirection: "row", alignItems: "center", gap: 4, opacity: 0.9 },
  privacyText: { color: "#FFF9F3", fontSize: 11, fontWeight: "600" },
  heroCopy: { position: "absolute", left: 20, right: 20, bottom: 20 },
  heroTitle: { color: "#FFF9F3", fontSize: 31, lineHeight: 34, letterSpacing: -0.8, fontWeight: "800" },
  heroBody: { color: "rgba(255, 249, 243, 0.82)", fontSize: 14, lineHeight: 20, marginTop: 9, maxWidth: 290 },
  heroButton: { alignSelf: "flex-start", marginTop: 15, minHeight: 47, paddingHorizontal: 16, borderRadius: 15, backgroundColor: "#FFF9F3", flexDirection: "row", alignItems: "center", gap: 10 },
  heroButtonText: { color: BRAND.terracotta, fontSize: 14, fontWeight: "800" },
  statsRow: { flexDirection: "row", gap: 9 },
  statCard: { flex: 1, minHeight: 83, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 13, justifyContent: "center" },
  statValue: { fontSize: 19, fontWeight: "800", letterSpacing: -0.2 },
  statLabel: { fontSize: 11, lineHeight: 15, marginTop: 2 },
  statIconRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  recentList: { gap: 12, paddingBottom: 2 },
  recentCard: { width: 210, height: 180, borderRadius: 20, overflow: "hidden", borderWidth: 1 },
  recentImage: { ...StyleSheet.absoluteFillObject, width: undefined, height: undefined },
  recentOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(24, 24, 20, 0.34)" },
  recentMeta: { position: "absolute", left: 13, right: 13, bottom: 12 },
  recentPill: { alignSelf: "flex-start", backgroundColor: "rgba(255, 249, 243, 0.88)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100, marginBottom: 8 },
  recentPillText: { color: BRAND.terracotta, fontSize: 10, fontWeight: "800" },
  recentTitle: { color: "#FFF9F3", fontSize: 18, fontWeight: "800" },
  recentFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
  recentDate: { color: "rgba(255, 249, 243, 0.76)", fontSize: 11 },
  tipCard: { padding: 15, flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 19 },
  tipIcon: { width: 40, height: 40, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  tipCopy: { flex: 1 },
  tipTitle: { fontSize: 14, fontWeight: "800", marginBottom: 4 },
  tipBody: { fontSize: 12, lineHeight: 17 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.985 }] },
});
