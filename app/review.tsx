import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { BRAND, getBrandColors, PrimaryButton, RoomwiseCard, TopBar } from "@/components/roomwise-ui";
import { useRoomwise } from "@/lib/roomwise-context";
import { useThemeContext } from "@/lib/theme-provider";

export default function ReviewScreen() {
  const { draft } = useRoomwise();
  const { colorScheme } = useThemeContext();
  const colors = getBrandColors(colorScheme === "dark");

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background" edges={["top", "bottom", "left", "right"]}>
      <View style={styles.content}>
        <TopBar title="Review photo" subtitle="One last look before we begin" showBack />
        <View style={styles.copy}>
          <Text style={[styles.title, { color: colors.ink }]}>This is the room we’ll work with.</Text>
          <Text style={[styles.body, { color: colors.muted }]}>Roomwise will look at structure, light, objects, and color. You’ll see what it noticed before any recommendations appear.</Text>
        </View>
        <RoomwiseCard style={[styles.imageCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <Image source={{ uri: draft.imageUri }} style={styles.image} resizeMode="cover" />
          <View style={styles.imageFooter}>
            <View style={styles.imageTag}><MaterialIcons name="home" size={15} color={BRAND.terracotta} /><Text style={styles.imageTagText}>{draft.roomType}</Text></View>
            <Text style={styles.imageDetail}>{draft.style} direction</Text>
          </View>
        </RoomwiseCard>
        <RoomwiseCard style={[styles.consentCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <View style={[styles.lock, { backgroundColor: colors.terracottaSoft }]}><MaterialIcons name="lock-outline" size={18} color={colors.terracotta} /></View>
          <View style={styles.consentCopy}><Text style={[styles.consentTitle, { color: colors.ink }]}>Your photo stays private</Text><Text style={[styles.consentBody, { color: colors.muted }]}>Analysis starts only when you tap the button. You can delete this project any time.</Text></View>
        </RoomwiseCard>
        <View style={styles.bottomActions}>
          <PrimaryButton label="Analyze this room" icon="auto-awesome" onPress={() => router.push("/analysis")} />
          <Pressable accessibilityRole="button" accessibilityLabel="Choose a different photo" onPress={() => router.back()} style={({ pressed }) => [styles.retake, pressed && styles.pressed]}><MaterialIcons name="refresh" size={17} color={colors.terracotta} /><Text style={[styles.retakeText, { color: colors.terracotta }]}>Choose a different photo</Text></Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingTop: 8, gap: 21 },
  copy: { gap: 7 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: "800", letterSpacing: -0.6 },
  body: { fontSize: 14, lineHeight: 21 },
  imageCard: { overflow: "hidden", borderRadius: 24 },
  image: { width: "100%", height: 265, backgroundColor: "#E4DED4" },
  imageFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 14, paddingVertical: 13 },
  imageTag: { flexDirection: "row", alignItems: "center", gap: 6 },
  imageTagText: { color: BRAND.terracotta, fontSize: 13, fontWeight: "800" },
  imageDetail: { color: BRAND.muted, fontSize: 12, fontWeight: "600" },
  consentCard: { padding: 14, flexDirection: "row", gap: 11, alignItems: "center", borderRadius: 17 },
  lock: { width: 38, height: 38, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  consentCopy: { flex: 1 },
  consentTitle: { fontSize: 14, fontWeight: "800", marginBottom: 3 },
  consentBody: { color: BRAND.muted, fontSize: 12, lineHeight: 17 },
  bottomActions: { marginTop: "auto", gap: 14, paddingBottom: 3 },
  retake: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, minHeight: 35 },
  retakeText: { fontSize: 13, fontWeight: "700" },
  pressed: { opacity: 0.65 },
});
