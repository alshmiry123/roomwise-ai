import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { BRAND, ColorDots, getBrandColors, PrimaryButton, RoomwiseCard, TopBar } from "@/components/roomwise-ui";
import { useRoomwise } from "@/lib/roomwise-context";
import { useThemeContext } from "@/lib/theme-provider";

export default function RecommendationsScreen() {
  const { draft } = useRoomwise();
  const { colorScheme } = useThemeContext();
  const colors = getBrandColors(colorScheme === "dark");
  const recommendation = draft.recommendation;
  const analysis = draft.analysis;

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background" edges={["top", "bottom", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <TopBar title="Your direction" subtitle={`${draft.roomType} · ${draft.budget}`} showBack />
        <View style={styles.intro}>
          <Text style={[styles.eyebrow, { color: colors.terracotta }]}>ROOMWISE RECOMMENDS</Text>
          <Text style={[styles.title, { color: colors.ink }]}>{recommendation?.title ?? "A considered new direction"}</Text>
          <Text style={[styles.body, { color: colors.muted }]}>{recommendation?.overview}</Text>
        </View>

        <RoomwiseCard style={[styles.paletteCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <View style={styles.paletteTop}><View><Text style={[styles.cardEyebrow, { color: colors.muted }]}>PALETTE DIRECTION</Text><Text style={[styles.cardTitle, { color: colors.ink }]}>Warm, grounded, livable</Text></View><ColorDots colors={analysis?.palette.map((item) => item.hex) ?? ["#E8DED0", "#7F947B", "#B9654A"]} /></View>
          <View style={styles.colorNames}>{(recommendation?.colors ?? []).map((color) => <Text key={color} style={[styles.colorName, { color: colors.muted }]}>{color}</Text>)}</View>
        </RoomwiseCard>

        <View style={styles.signalRow}>
          <View style={[styles.signal, { backgroundColor: colors.terracottaSoft }]}><MaterialIcons name="auto-awesome" size={18} color={colors.terracotta} /><Text style={[styles.signalTitle, { color: colors.ink }]}>Personalized</Text><Text style={[styles.signalBody, { color: colors.muted }]}>{draft.style} style lens</Text></View>
          <View style={[styles.signal, { backgroundColor: "#E6EDE4" }]}><MaterialIcons name="straighten" size={18} color={BRAND.sage} /><Text style={[styles.signalTitle, { color: colors.ink }]}>Space-aware</Text><Text style={[styles.signalBody, { color: colors.muted }]}>Clear circulation</Text></View>
        </View>

        <View style={styles.section}><Text style={[styles.sectionTitle, { color: colors.ink }]}>The edit list</Text><InsightCard icon="weekend" title="Furniture" body={recommendation?.furniture.join(" · ") ?? "Pieces selected for the room"} colors={colors} /><InsightCard icon="lightbulb-outline" title="Lighting" body={recommendation?.lighting ?? "Layer warm and focused light"} colors={colors} /><InsightCard icon="open-with" title="Make the room work harder" body={recommendation?.optimization ?? "Keep the main path clear"} colors={colors} /></View>

        <RoomwiseCard style={[styles.budgetCard, { backgroundColor: colors.surface, borderColor: colors.line }]}><View style={[styles.budgetIcon, { backgroundColor: colors.terracottaSoft }]}><MaterialIcons name="local-atm" size={19} color={colors.terracotta} /></View><View style={styles.budgetCopy}><Text style={[styles.budgetTitle, { color: colors.ink }]}>A plan within your range</Text><Text style={[styles.budgetBody, { color: colors.muted }]}>Estimated investment · {recommendation?.estimatedBudget}</Text></View><MaterialIcons name="chevron-right" size={19} color={colors.muted} /></RoomwiseCard>
        <PrimaryButton label="Preview this direction" icon="arrow-forward" onPress={() => router.push("/editor")} />
      </ScrollView>
    </ScreenContainer>
  );
}

function InsightCard({ icon, title, body, colors }: { icon: keyof typeof MaterialIcons.glyphMap; title: string; body: string; colors: ReturnType<typeof getBrandColors> }) {
  return <RoomwiseCard style={[styles.insightCard, { backgroundColor: colors.surface, borderColor: colors.line }]}><View style={[styles.insightIcon, { backgroundColor: colors.terracottaSoft }]}><MaterialIcons name={icon} size={19} color={colors.terracotta} /></View><View style={styles.insightCopy}><Text style={[styles.insightTitle, { color: colors.ink }]}>{title}</Text><Text style={[styles.insightBody, { color: colors.muted }]}>{body}</Text></View><MaterialIcons name="chevron-right" size={19} color={colors.muted} /></RoomwiseCard>;
}

const styles = StyleSheet.create({
  content: { paddingTop: 8, paddingBottom: 30, gap: 21 },
  intro: { gap: 7 },
  eyebrow: { fontSize: 10, fontWeight: "800", letterSpacing: 1.6 },
  title: { fontSize: 30, lineHeight: 35, fontWeight: "800", letterSpacing: -0.7 },
  body: { fontSize: 14, lineHeight: 21 },
  paletteCard: { padding: 17, borderRadius: 21 },
  paletteTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardEyebrow: { fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginBottom: 5 },
  cardTitle: { fontSize: 16, fontWeight: "800" },
  colorNames: { flexDirection: "row", gap: 15, marginTop: 20 },
  colorName: { fontSize: 11, fontWeight: "600" },
  signalRow: { flexDirection: "row", gap: 10 },
  signal: { flex: 1, borderRadius: 17, padding: 14, minHeight: 100 },
  signalTitle: { fontSize: 13, fontWeight: "800", marginTop: 10 },
  signalBody: { fontSize: 11, marginTop: 3 },
  section: { gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "800", marginBottom: 2 },
  insightCard: { padding: 13, flexDirection: "row", gap: 11, alignItems: "center", borderRadius: 17 },
  insightIcon: { width: 39, height: 39, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  insightCopy: { flex: 1 },
  insightTitle: { fontSize: 14, fontWeight: "800", marginBottom: 4 },
  insightBody: { fontSize: 12, lineHeight: 17 },
  budgetCard: { padding: 14, flexDirection: "row", alignItems: "center", gap: 11, borderRadius: 17 },
  budgetIcon: { width: 39, height: 39, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  budgetCopy: { flex: 1 },
  budgetTitle: { fontSize: 14, fontWeight: "800", marginBottom: 4 },
  budgetBody: { fontSize: 12 },
});
