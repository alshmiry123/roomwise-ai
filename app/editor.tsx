import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { ChoiceChip, getBrandColors, PrimaryButton, RoomwiseCard, TopBar } from "@/components/roomwise-ui";
import { useRoomwise } from "@/lib/roomwise-context";
import { useThemeContext } from "@/lib/theme-provider";

const ACCENTS = ["#B9654A", "#7F947B", "#C59A68", "#72899A"];

export default function EditorScreen() {
  const { draft, updateAccentColor, saveDraft } = useRoomwise();
  const { colorScheme } = useThemeContext();
  const colors = getBrandColors(colorScheme === "dark");
  const [compare, setCompare] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await saveDraft();
    setSaved(true);
    Alert.alert("Design saved", "Your direction is now in Saved Designs.");
  };

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background" edges={["top", "bottom", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <TopBar title="Design editor" subtitle={`${draft.roomType} · ${draft.style}`} showBack right={<Pressable accessibilityRole="button" accessibilityLabel="Share design" onPress={() => Alert.alert("Coming next", "Sharing will be available in a future update.")}><MaterialIcons name="ios-share" size={20} color={colors.ink} /></Pressable>} />
        <View style={styles.intro}><Text style={[styles.title, { color: colors.ink }]}>Shape the direction.</Text><Text style={[styles.body, { color: colors.muted }]}>A light-touch preview of how the recommendation could change the room.</Text></View>

        <RoomwiseCard style={[styles.previewCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <Image source={{ uri: draft.imageUri }} style={styles.previewImage} resizeMode="cover" />
          {compare ? <View style={styles.proposedOverlay}><View style={[styles.proposedBlock, { backgroundColor: draft.accentColor }]} /><View style={[styles.proposedRug, { backgroundColor: "rgba(127, 148, 123, 0.78)" }]} /><View style={styles.proposedLamp}><View style={styles.lampShade} /><View style={styles.lampStem} /></View></View> : null}
          <View style={styles.previewTop}><View style={styles.viewPill}><Text style={styles.viewPillText}>{compare ? "PROPOSED DIRECTION" : "CURRENT ROOM"}</Text></View><Pressable accessibilityRole="switch" accessibilityState={{ checked: compare }} accessibilityLabel="Toggle current and proposed comparison" onPress={() => setCompare((value) => !value)} style={({ pressed }) => [styles.compareButton, pressed && styles.pressed]}><MaterialIcons name="compare" size={15} color="#FFF9F3" /><Text style={styles.compareText}>{compare ? "Current" : "Compare"}</Text></Pressable></View>
          <View style={styles.previewBottom}><Text style={styles.previewCaption}>{compare ? draft.recommendation?.title : "Your room, ready for a thoughtful edit"}</Text><Text style={styles.previewSubcaption}>Preview is directional, not to scale</Text></View>
        </RoomwiseCard>

        <View style={styles.section}><Text style={[styles.sectionTitle, { color: colors.ink }]}>Choose an accent</Text><Text style={[styles.sectionBody, { color: colors.muted }]}>One considered color keeps the room feeling intentional.</Text><View style={styles.accentRow}>{ACCENTS.map((accent) => <Pressable key={accent} accessibilityRole="radio" accessibilityState={{ selected: draft.accentColor === accent }} accessibilityLabel={`Choose accent color ${accent}`} onPress={() => updateAccentColor(accent)} style={({ pressed }) => [styles.accentChoice, pressed && styles.pressed]}><View style={[styles.accentSwatch, { backgroundColor: accent }, draft.accentColor === accent && styles.accentSelected]} />{draft.accentColor === accent ? <MaterialIcons name="check" size={15} color="#FFF9F3" style={styles.accentCheck} /> : null}</Pressable>)}</View></View>

        <View style={styles.section}><Text style={[styles.sectionTitle, { color: colors.ink }]}>Quick adjustments</Text><View style={styles.chips}><ChoiceChip label="More light" selected={false} onPress={() => Alert.alert("Lighting note", "Roomwise will prioritize layered warm light in the full plan.")} /><ChoiceChip label="Clearer flow" selected={false} onPress={() => Alert.alert("Flow note", "The plan keeps the main circulation path open.")} /><ChoiceChip label="More texture" selected={false} onPress={() => Alert.alert("Texture note", "Try linen, wool, and unfinished wood for depth.")} /></View></View>

        <RoomwiseCard style={[styles.saveCard, { backgroundColor: colors.terracottaSoft, borderColor: "#D7A998" }]}><MaterialIcons name="favorite-border" size={20} color={colors.terracotta} /><View style={styles.saveCopy}><Text style={[styles.saveTitle, { color: colors.ink }]}>{saved ? "Saved to your collection" : "Like this direction?"}</Text><Text style={[styles.saveBody, { color: colors.muted }]}>{saved ? "You can keep refining it from Saved Designs." : "Save it now and come back when you’re ready to make the room real."}</Text></View></RoomwiseCard>
        <PrimaryButton label={saved ? "View saved designs" : "Save this design"} icon={saved ? "collections" : "bookmark-border"} onPress={saved ? () => router.push("/designs") : handleSave} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 8, paddingBottom: 30, gap: 20 },
  intro: { gap: 6 },
  title: { fontSize: 29, lineHeight: 34, fontWeight: "800", letterSpacing: -0.6 },
  body: { fontSize: 14, lineHeight: 21 },
  previewCard: { height: 360, overflow: "hidden", borderRadius: 24, position: "relative" },
  previewImage: { ...StyleSheet.absoluteFillObject, width: undefined, height: undefined },
  proposedOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(249, 243, 233, 0.18)" },
  proposedBlock: { position: "absolute", top: 75, right: 22, width: 57, height: 124, opacity: 0.76, borderRadius: 5 },
  proposedRug: { position: "absolute", left: 24, right: 24, bottom: 42, height: 56, borderRadius: 28 },
  proposedLamp: { position: "absolute", right: 97, bottom: 96, alignItems: "center" },
  lampShade: { width: 36, height: 24, backgroundColor: "#D6A66B", borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  lampStem: { width: 3, height: 42, backgroundColor: "#5C5044" },
  previewTop: { position: "absolute", top: 15, left: 15, right: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  viewPill: { paddingHorizontal: 10, paddingVertical: 7, backgroundColor: "rgba(30, 33, 31, 0.65)", borderRadius: 100 },
  viewPillText: { color: "#FFF9F3", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  compareButton: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 100, backgroundColor: "rgba(30, 33, 31, 0.65)" },
  compareText: { color: "#FFF9F3", fontSize: 11, fontWeight: "700" },
  previewBottom: { position: "absolute", left: 16, right: 16, bottom: 15 },
  previewCaption: { color: "#FFF9F3", fontSize: 18, fontWeight: "800" },
  previewSubcaption: { color: "rgba(255, 249, 243, 0.76)", fontSize: 11, marginTop: 4 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 17, fontWeight: "800" },
  sectionBody: { fontSize: 13, lineHeight: 19 },
  accentRow: { flexDirection: "row", gap: 16, marginTop: 7 },
  accentChoice: { width: 44, height: 44, alignItems: "center", justifyContent: "center", position: "relative" },
  accentSwatch: { width: 34, height: 34, borderRadius: 17 },
  accentSelected: { borderWidth: 3, borderColor: "#FFF9F3", shadowColor: "#302A24", shadowOpacity: 0.25, shadowRadius: 5, elevation: 3 },
  accentCheck: { position: "absolute" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 3 },
  saveCard: { padding: 14, flexDirection: "row", gap: 11, alignItems: "center", borderRadius: 18 },
  saveCopy: { flex: 1 },
  saveTitle: { fontSize: 14, fontWeight: "800", marginBottom: 3 },
  saveBody: { fontSize: 12, lineHeight: 17 },
  pressed: { opacity: 0.7, transform: [{ scale: 0.985 }] },
});
