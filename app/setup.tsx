import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { ChoiceChip, getBrandColors, PrimaryButton, RoomwiseCard, TopBar } from "@/components/roomwise-ui";
import { BUDGET_OPTIONS, ROOM_OPTIONS, STYLE_OPTIONS, TRANSFORMATION_OPTIONS } from "@/constants/roomwise";
import { useRoomwise } from "@/lib/roomwise-context";
import { useThemeContext } from "@/lib/theme-provider";

export default function SetupScreen() {
  const { draft, updateBudget, updateRoomType, updateStyle, updateTransformation } = useRoomwise();
  const { colorScheme } = useThemeContext();
  const colors = getBrandColors(colorScheme === "dark");

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <TopBar title="New design" subtitle="Let’s get to know the room" showBack />

        <View style={styles.intro}>
          <Text style={[styles.title, { color: colors.ink }]}>Start with the feeling.</Text>
          <Text style={[styles.body, { color: colors.muted }]}>A few choices help Roomwise make the recommendations feel like yours.</Text>
        </View>

        <View>
          <Text style={[styles.label, { color: colors.ink }]}>What are we designing?</Text>
          <View style={styles.roomGrid}>
            {ROOM_OPTIONS.map((room) => {
              const selected = draft.roomType === room.label;
              return (
                <Pressable key={room.label} accessibilityRole="button" accessibilityLabel={`Choose ${room.label}`} onPress={() => updateRoomType(room.label)} style={({ pressed }) => [styles.roomPressable, pressed && styles.pressed]}>
                  <RoomwiseCard style={[styles.roomCard, { backgroundColor: selected ? colors.terracottaSoft : colors.surface, borderColor: selected ? "#D7A998" : colors.line }]}>
                    <MaterialIcons name={room.icon as keyof typeof MaterialIcons.glyphMap} size={23} color={selected ? colors.terracotta : colors.muted} />
                    <Text style={[styles.roomName, { color: colors.ink }]}>{room.label}</Text>
                    <Text style={[styles.roomNote, { color: colors.muted }]}>{room.note}</Text>
                  </RoomwiseCard>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View>
          <Text style={[styles.label, { color: colors.ink }]}>Choose a starting style</Text>
          <View style={styles.chipWrap}>
            {STYLE_OPTIONS.map((style) => <ChoiceChip key={style} label={style} selected={draft.style === style} onPress={() => updateStyle(style)} />)}
          </View>
        </View>

        <View>
          <Text style={[styles.label, { color: colors.ink }]}>How much should change?</Text>
          <View style={styles.chipWrap}>
            {TRANSFORMATION_OPTIONS.map((level) => <ChoiceChip key={level} label={level} selected={draft.transformation === level} onPress={() => updateTransformation(level)} />)}
          </View>
        </View>

        <View>
          <Text style={[styles.label, { color: colors.ink }]}>What’s your comfortable budget?</Text>
          <View style={styles.chipWrap}>
            {BUDGET_OPTIONS.map((budget) => <ChoiceChip key={budget} label={budget} selected={draft.budget === budget} onPress={() => updateBudget(budget)} />)}
          </View>
        </View>

        <RoomwiseCard style={[styles.noteCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <MaterialIcons name="tune" size={20} color={colors.terracotta} />
          <Text style={[styles.noteText, { color: colors.muted }]}>You can change any of these details after seeing the first recommendation.</Text>
        </RoomwiseCard>

        <PrimaryButton label="Continue to room photo" icon="arrow-forward" onPress={() => router.push("/capture")} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 8, paddingBottom: 28, gap: 24 },
  intro: { gap: 7, marginTop: 2 },
  title: { fontSize: 29, lineHeight: 34, fontWeight: "800", letterSpacing: -0.6 },
  body: { fontSize: 15, lineHeight: 22, maxWidth: 330 },
  label: { fontSize: 15, fontWeight: "800", marginBottom: 12 },
  roomGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  roomPressable: { width: "31.8%" },
  roomCard: { minHeight: 117, padding: 12, borderRadius: 17 },
  roomName: { fontSize: 12, lineHeight: 15, fontWeight: "800", marginTop: 10 },
  roomNote: { fontSize: 10, lineHeight: 13, marginTop: 4 },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.985 }] },
  noteCard: { padding: 14, flexDirection: "row", alignItems: "center", gap: 10, borderRadius: 16 },
  noteText: { fontSize: 12, lineHeight: 17, flex: 1 },
});
