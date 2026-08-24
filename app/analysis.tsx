import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { BRAND, ColorDots, getBrandColors, PrimaryButton, RoomwiseCard, TopBar } from "@/components/roomwise-ui";
import { useRoomwise } from "@/lib/roomwise-context";
import { useThemeContext } from "@/lib/theme-provider";

const STEPS = ["Reading the room’s structure", "Understanding objects and light", "Preparing your design direction"];

export default function AnalysisScreen() {
  const { draft, analyzeDraft, isAnalyzing } = useRoomwise();
  const { colorScheme } = useThemeContext();
  const colors = getBrandColors(colorScheme === "dark");
  const [step, setStep] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!draft.analysis && !started.current) {
      started.current = true;
      void analyzeDraft();
    }
  }, [draft.analysis, analyzeDraft]);

  useEffect(() => {
    if (!isAnalyzing) return;
    const timer = setInterval(() => setStep((current) => Math.min(current + 1, STEPS.length - 1)), 410);
    return () => clearInterval(timer);
  }, [isAnalyzing]);

  const analysis = draft.analysis;
  const done = Boolean(analysis) && !isAnalyzing;

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background" edges={["top", "bottom", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <TopBar title="Room analysis" subtitle="A closer look at your space" showBack />
        <View style={styles.intro}>
          <View style={[styles.spark, { backgroundColor: colors.terracottaSoft }]}><MaterialIcons name="auto-awesome" size={19} color={colors.terracotta} /></View>
          <Text style={[styles.title, { color: colors.ink }]}>{done ? "We found a strong starting point." : "Reading between the lines."}</Text>
          <Text style={[styles.body, { color: colors.muted }]}>{done ? analysis?.summary : "Roomwise is looking at the visual rhythm of the room so the next steps feel intentional."}</Text>
        </View>

        {!done ? (
          <RoomwiseCard style={[styles.loadingCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
            <View style={[styles.scanOrb, { borderColor: colors.terracottaSoft }]}><View style={[styles.scanOrbInner, { backgroundColor: colors.terracotta }]}><MaterialIcons name="visibility" size={25} color="#FFF9F3" /></View></View>
            <Text style={[styles.loadingTitle, { color: colors.ink }]}>{STEPS[step]}</Text>
            <Text style={[styles.loadingBody, { color: colors.muted }]}>This usually takes a moment.</Text>
            <View style={styles.progressTrack}><View style={[styles.progressFill, { backgroundColor: colors.terracotta, width: `${Math.round(((step + 1) / STEPS.length) * 100)}%` }]} /></View>
            <View style={styles.stepRow}>{STEPS.map((label, index) => <View key={label} style={styles.stepItem}><View style={[styles.stepDot, { backgroundColor: index <= step ? colors.terracotta : colors.line }]} /><Text style={[styles.stepLabel, { color: index <= step ? colors.ink : colors.muted }]}>{label}</Text></View>)}</View>
          </RoomwiseCard>
        ) : (
          <View style={styles.results}>
            <RoomwiseCard style={[styles.detectedCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
              <View style={styles.resultHeader}><View><Text style={[styles.resultEyebrow, { color: colors.terracotta }]}>ROOM TYPE</Text><Text style={[styles.resultTitle, { color: colors.ink }]}>{analysis?.roomType}</Text></View><View style={[styles.confidence, { backgroundColor: colors.terracottaSoft }]}><Text style={[styles.confidenceValue, { color: colors.terracotta }]}>{analysis?.confidence}%</Text><Text style={[styles.confidenceLabel, { color: colors.terracotta }]}>match</Text></View></View>
              <View style={styles.detailRow}><View style={styles.detailItem}><MaterialIcons name="straighten" size={17} color={colors.muted} /><Text style={[styles.detailText, { color: colors.muted }]}>{analysis?.dimensions}</Text></View><View style={styles.detailItem}><MaterialIcons name="wb-sunny" size={17} color={colors.muted} /><Text style={[styles.detailText, { color: colors.muted }]}>{analysis?.lighting}</Text></View></View>
            </RoomwiseCard>
            <View style={styles.resultSection}><Text style={[styles.sectionTitle, { color: colors.ink }]}>Detected in the frame</Text><View style={styles.objectWrap}>{analysis?.detectedObjects.map((object) => <View key={object} style={[styles.objectChip, { backgroundColor: colors.surface, borderColor: colors.line }]}><MaterialIcons name="check" size={14} color={BRAND.sage} /><Text style={[styles.objectText, { color: colors.ink }]}>{object}</Text></View>)}</View></View>
            <View style={styles.resultSection}><View style={styles.paletteHeader}><Text style={[styles.sectionTitle, { color: colors.ink }]}>Current color story</Text><ColorDots colors={analysis?.palette.map((item) => item.hex) ?? []} /></View><RoomwiseCard style={[styles.paletteCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>{analysis?.palette.map((item) => <View key={item.name} style={styles.paletteItem}><View style={[styles.paletteSwatch, { backgroundColor: item.hex }]} /><Text style={[styles.paletteName, { color: colors.muted }]}>{item.name}</Text></View>)}</RoomwiseCard></View>
          </View>
        )}
        {done ? <PrimaryButton label="See recommendations" icon="arrow-forward" onPress={() => router.push("/recommendations")} /> : null}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 8, paddingBottom: 28, gap: 22 },
  intro: { gap: 10 },
  spark: { width: 42, height: 42, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 29, lineHeight: 34, fontWeight: "800", letterSpacing: -0.6 },
  body: { fontSize: 14, lineHeight: 21 },
  loadingCard: { padding: 22, alignItems: "center", borderRadius: 24 },
  scanOrb: { width: 105, height: 105, borderRadius: 53, borderWidth: 1, alignItems: "center", justifyContent: "center", marginBottom: 17 },
  scanOrbInner: { width: 66, height: 66, borderRadius: 33, alignItems: "center", justifyContent: "center" },
  loadingTitle: { fontSize: 16, fontWeight: "800", textAlign: "center" },
  loadingBody: { fontSize: 13, marginTop: 5 },
  progressTrack: { width: "100%", height: 7, borderRadius: 4, backgroundColor: BRAND.line, marginTop: 22, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 4 },
  stepRow: { width: "100%", marginTop: 18, gap: 10 },
  stepItem: { flexDirection: "row", alignItems: "center", gap: 9 },
  stepDot: { width: 8, height: 8, borderRadius: 4 },
  stepLabel: { fontSize: 12 },
  results: { gap: 20 },
  detectedCard: { padding: 17, borderRadius: 21 },
  resultHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  resultEyebrow: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5, marginBottom: 5 },
  resultTitle: { fontSize: 22, fontWeight: "800" },
  confidence: { borderRadius: 15, paddingHorizontal: 11, paddingVertical: 8, alignItems: "center" },
  confidenceValue: { fontSize: 17, fontWeight: "800" },
  confidenceLabel: { fontSize: 10, fontWeight: "700" },
  detailRow: { borderTopWidth: 1, borderTopColor: BRAND.line, marginTop: 17, paddingTop: 14, gap: 10 },
  detailItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  detailText: { fontSize: 12, flex: 1 },
  resultSection: { gap: 11 },
  sectionTitle: { fontSize: 17, fontWeight: "800" },
  objectWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  objectChip: { paddingHorizontal: 10, paddingVertical: 9, borderRadius: 100, borderWidth: 1, flexDirection: "row", alignItems: "center", gap: 5 },
  objectText: { fontSize: 12, fontWeight: "600" },
  paletteHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  paletteCard: { padding: 14, flexDirection: "row", justifyContent: "space-between", borderRadius: 18 },
  paletteItem: { alignItems: "center", gap: 7 },
  paletteSwatch: { width: 42, height: 42, borderRadius: 14 },
  paletteName: { fontSize: 10, textAlign: "center" },
});
