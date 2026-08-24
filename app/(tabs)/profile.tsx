import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { ChoiceChip, getBrandColors, RoomwiseCard, TopBar } from "@/components/roomwise-ui";
import { STYLE_OPTIONS } from "@/constants/roomwise";
import { useRoomwise } from "@/lib/roomwise-context";
import { useThemeContext } from "@/lib/theme-provider";

export default function ProfileScreen() {
  const { draft, updateStyle } = useRoomwise();
  const { colorScheme, setColorScheme } = useThemeContext();
  const colors = getBrandColors(colorScheme === "dark");
  const [language, setLanguage] = useState<"English" | "العربية">("English");
  const isDark = colorScheme === "dark";

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <TopBar title="Profile" subtitle="Make Roomwise feel like yours" />
        <View style={styles.profileHead}><View style={[styles.avatar, { backgroundColor: colors.terracottaSoft }]}><Text style={[styles.avatarText, { color: colors.terracotta }]}>R</Text></View><View style={styles.profileCopy}><Text style={[styles.name, { color: colors.ink }]}>Your design profile</Text><Text style={[styles.sub, { color: colors.muted }]}>Local preferences · private by default</Text></View><MaterialIcons name="edit" size={19} color={colors.muted} /></View>

        <View style={styles.section}><Text style={[styles.sectionTitle, { color: colors.ink }]}>Default style</Text><View style={styles.chips}>{STYLE_OPTIONS.map((style) => <ChoiceChip key={style} label={style} selected={draft.style === style} onPress={() => updateStyle(style)} />)}</View></View>

        <View style={styles.section}><Text style={[styles.sectionTitle, { color: colors.ink }]}>App preferences</Text><RoomwiseCard style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.line }]}><SettingRow icon="dark-mode" title="Dark mode" body="Use a deeper canvas at night" colors={colors} right={<Switch accessibilityLabel="Toggle dark mode" value={isDark} onValueChange={(value) => setColorScheme(value ? "dark" : "light")} trackColor={{ false: "#D7D2C9", true: colors.terracotta }} thumbColor="#FFF9F3" />} /><View style={[styles.divider, { backgroundColor: colors.line }]} /><SettingRow icon="language" title="Language" body={language === "English" ? "English · العربية ready" : "العربية · RTL ready"} colors={colors} right={<Pressable accessibilityRole="button" accessibilityLabel="Change language" onPress={() => setLanguage(language === "English" ? "العربية" : "English")} style={({ pressed }) => [styles.languagePill, { backgroundColor: colors.terracottaSoft }, pressed && styles.pressed]}><Text style={[styles.languageText, { color: colors.terracotta }]}>{language}</Text><MaterialIcons name="swap-horiz" size={15} color={colors.terracotta} /></Pressable>} /></RoomwiseCard></View>

        <View style={styles.section}><Text style={[styles.sectionTitle, { color: colors.ink }]}>Privacy & data</Text><RoomwiseCard style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.line }]}><ActionRow icon="security" title="How your photos are used" body="Nothing is analyzed without your confirmation" colors={colors} onPress={() => Alert.alert("Privacy first", "Roomwise only starts analysis after you confirm a photo. Saved designs stay local in this prototype.")} /><View style={[styles.divider, { backgroundColor: colors.line }]} /><ActionRow icon="delete-outline" title="Delete local data" body="Remove saved directions from this device" colors={colors} onPress={() => Alert.alert("Delete local data", "Data deletion controls will be connected to the local store in the next build.")} /></RoomwiseCard></View>

        <Pressable accessibilityRole="button" accessibilityLabel="Start a new design" onPress={() => router.push("/setup")} style={({ pressed }) => [styles.newDesign, { backgroundColor: colors.terracottaSoft }, pressed && styles.pressed]}><MaterialIcons name="add" size={19} color={colors.terracotta} /><Text style={[styles.newDesignText, { color: colors.terracotta }]}>Start a new design</Text></Pressable>
        <Text style={[styles.version, { color: colors.muted }]}>Roomwise AI · A quiet tool for better rooms</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

function SettingRow({ icon, title, body, colors, right }: { icon: keyof typeof MaterialIcons.glyphMap; title: string; body: string; colors: ReturnType<typeof getBrandColors>; right: React.ReactNode }) {
  return <View style={styles.settingRow}><View style={[styles.settingIcon, { backgroundColor: colors.terracottaSoft }]}><MaterialIcons name={icon} size={18} color={colors.terracotta} /></View><View style={styles.settingCopy}><Text style={[styles.settingTitle, { color: colors.ink }]}>{title}</Text><Text style={[styles.settingBody, { color: colors.muted }]}>{body}</Text></View>{right}</View>;
}

function ActionRow({ icon, title, body, colors, onPress }: { icon: keyof typeof MaterialIcons.glyphMap; title: string; body: string; colors: ReturnType<typeof getBrandColors>; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} style={({ pressed }) => [styles.settingRow, pressed && styles.pressed]}><View style={[styles.settingIcon, { backgroundColor: colors.terracottaSoft }]}><MaterialIcons name={icon} size={18} color={colors.terracotta} /></View><View style={styles.settingCopy}><Text style={[styles.settingTitle, { color: colors.ink }]}>{title}</Text><Text style={[styles.settingBody, { color: colors.muted }]}>{body}</Text></View><MaterialIcons name="chevron-right" size={19} color={colors.muted} /></Pressable>;
}

const styles = StyleSheet.create({
  content: { paddingTop: 8, paddingBottom: 30, gap: 24 },
  profileHead: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 56, height: 56, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 23, fontWeight: "800" },
  profileCopy: { flex: 1 },
  name: { fontSize: 17, fontWeight: "800", marginBottom: 4 },
  sub: { fontSize: 12 },
  section: { gap: 12 },
  sectionTitle: { fontSize: 17, fontWeight: "800" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  settingsCard: { paddingHorizontal: 14, borderRadius: 19 },
  settingRow: { flexDirection: "row", alignItems: "center", gap: 11, minHeight: 70 },
  settingIcon: { width: 38, height: 38, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  settingCopy: { flex: 1 },
  settingTitle: { fontSize: 14, fontWeight: "800", marginBottom: 4 },
  settingBody: { fontSize: 11, lineHeight: 16 },
  divider: { height: 1 },
  languagePill: { borderRadius: 100, flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 9, paddingVertical: 7 },
  languageText: { fontSize: 11, fontWeight: "800" },
  newDesign: { minHeight: 52, borderRadius: 17, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  newDesignText: { fontSize: 14, fontWeight: "800" },
  version: { textAlign: "center", fontSize: 11, marginTop: -8 },
  pressed: { opacity: 0.68, transform: [{ scale: 0.985 }] },
});
