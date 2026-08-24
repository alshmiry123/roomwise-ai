import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { BRAND, getBrandColors, RoomwiseCard, TopBar } from "@/components/roomwise-ui";
import { useRoomwise } from "@/lib/roomwise-context";
import { useThemeContext } from "@/lib/theme-provider";

export default function DesignsScreen() {
  const { savedDesigns, openSavedDesign } = useRoomwise();
  const { colorScheme } = useThemeContext();
  const colors = getBrandColors(colorScheme === "dark");

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <FlatList
        data={savedDesigns}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={<><TopBar title="Saved designs" subtitle="Your room ideas, kept close" /><View style={styles.headerCopy}><Text style={[styles.title, { color: colors.ink }]}>A collection of possibilities.</Text><Text style={[styles.body, { color: colors.muted }]}>Keep the directions that feel like you. Open one to refine the details or compare it with the original room.</Text></View></>}
        renderItem={({ item }) => <Pressable accessibilityRole="button" accessibilityLabel={`Open saved ${item.roomType} design`} onPress={() => { openSavedDesign(item); router.push("/editor"); }} style={({ pressed }) => [styles.itemWrap, pressed && styles.pressed]}><RoomwiseCard style={[styles.designCard, { backgroundColor: colors.surface, borderColor: colors.line }]}><Image source={{ uri: item.imageUri }} style={styles.image} /><View style={styles.cardContent}><View style={styles.cardTop}><View style={[styles.stylePill, { backgroundColor: colors.terracottaSoft }]}><Text style={[styles.stylePillText, { color: colors.terracotta }]}>{item.style}</Text></View><Text style={[styles.date, { color: colors.muted }]}>{item.createdAt}</Text></View><Text style={[styles.roomName, { color: colors.ink }]}>{item.roomType}</Text><View style={styles.cardFooter}><View style={styles.meta}><MaterialIcons name="auto-awesome" size={14} color={colors.terracotta} /><Text style={[styles.metaText, { color: colors.muted }]}>Personalized direction</Text></View><MaterialIcons name="chevron-right" size={20} color={colors.muted} /></View></View></RoomwiseCard></Pressable>}
        ListEmptyComponent={<RoomwiseCard style={[styles.emptyCard, { backgroundColor: colors.surface, borderColor: colors.line }]}><View style={[styles.emptyIcon, { backgroundColor: colors.terracottaSoft }]}><MaterialIcons name="collections" size={22} color={colors.terracotta} /></View><Text style={[styles.emptyTitle, { color: colors.ink }]}>Your gallery is waiting</Text><Text style={[styles.emptyBody, { color: colors.muted }]}>Start a room design and save the direction you want to come back to.</Text></RoomwiseCard>}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 8, paddingBottom: 28, gap: 18 },
  headerCopy: { gap: 7, marginBottom: 5 },
  title: { fontSize: 29, lineHeight: 34, fontWeight: "800", letterSpacing: -0.6 },
  body: { fontSize: 14, lineHeight: 21 },
  itemWrap: { marginBottom: 13 },
  designCard: { overflow: "hidden", borderRadius: 22 },
  image: { width: "100%", height: 215, backgroundColor: "#E4DED4" },
  cardContent: { padding: 14 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  stylePill: { borderRadius: 100, paddingHorizontal: 9, paddingVertical: 5 },
  stylePillText: { fontSize: 10, fontWeight: "800" },
  date: { fontSize: 11 },
  roomName: { fontSize: 20, fontWeight: "800", marginTop: 11 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 13, paddingTop: 12, borderTopWidth: 1, borderTopColor: BRAND.line },
  meta: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 12 },
  emptyCard: { alignItems: "center", padding: 24, borderRadius: 21 },
  emptyIcon: { width: 49, height: 49, borderRadius: 17, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  emptyTitle: { fontSize: 17, fontWeight: "800" },
  emptyBody: { textAlign: "center", fontSize: 13, lineHeight: 19, marginTop: 7 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
});
