import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View, type PressableProps, type StyleProp, type ViewStyle } from "react-native";

export const BRAND = {
  canvas: "#F7F5F1",
  surface: "#FFFCF8",
  ink: "#1E211F",
  muted: "#6D716B",
  terracotta: "#B9654A",
  terracottaSoft: "#F1DDD4",
  sage: "#7F947B",
  line: "#E5E0D8",
  night: "#171817",
  nightSurface: "#232321",
  nightLine: "#3A3B37",
  nightMuted: "#AAAFA6",
};

export function getBrandColors(isDark = false) {
  return {
    background: isDark ? BRAND.night : BRAND.canvas,
    surface: isDark ? BRAND.nightSurface : BRAND.surface,
    ink: isDark ? "#F4F0E9" : BRAND.ink,
    muted: isDark ? BRAND.nightMuted : BRAND.muted,
    line: isDark ? BRAND.nightLine : BRAND.line,
    terracotta: isDark ? "#D47A5F" : BRAND.terracotta,
    terracottaSoft: isDark ? "#4A2E27" : BRAND.terracottaSoft,
  };
}

export function RoomwiseCard({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function IconCircle({
  name,
  size = 42,
  iconSize = 20,
  color = BRAND.terracotta,
  background = BRAND.terracottaSoft,
}: {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  iconSize?: number;
  color?: string;
  background?: string;
}) {
  return (
    <View style={[styles.iconCircle, { width: size, height: size, borderRadius: size / 2, backgroundColor: background }]}>
      <MaterialIcons name={name} size={iconSize} color={color} />
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  icon,
  disabled = false,
  style,
  secondary = false,
  ...props
}: PressableProps & {
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  secondary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.primaryButton,
        secondary && styles.secondaryButton,
        disabled && styles.disabledButton,
        pressed && styles.pressedButton,
        style,
      ]}
      {...props}
    >
      <Text style={[styles.primaryButtonText, secondary && styles.secondaryButtonText]}>{label}</Text>
      {icon ? <MaterialIcons name={icon} size={19} color={secondary ? BRAND.terracotta : "#FFF9F3"} /> : null}
    </Pressable>
  );
}

export function TopBar({ title, subtitle, showBack = false, right }: { title: string; subtitle?: string; showBack?: boolean; right?: React.ReactNode }) {
  return (
    <View style={styles.topBar}>
      <View style={styles.topBarLeft}>
        {showBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressedButton]}
          >
            <MaterialIcons name="arrow-back" size={21} color={BRAND.ink} />
          </Pressable>
        ) : null}
        <View>
          <Text style={styles.eyebrow}>ROOMWISE AI</Text>
          <Text style={styles.topBarTitle}>{title}</Text>
          {subtitle ? <Text style={styles.topBarSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {right}
    </View>
  );
}

export function ChoiceChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.choiceChip, selected && styles.choiceChipSelected, pressed && styles.choiceChipPressed]}
    >
      <Text style={[styles.choiceChipText, selected && styles.choiceChipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && onAction ? (
        <Pressable accessibilityRole="button" accessibilityLabel={action} onPress={onAction} style={({ pressed }) => [pressed && { opacity: 0.6 }]}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function ColorDots({ colors, activeColor }: { colors: string[]; activeColor?: string }) {
  return (
    <View style={styles.colorDots}>
      {colors.map((color) => (
        <View key={color} style={[styles.colorDot, { backgroundColor: color }, activeColor === color && styles.colorDotActive]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: BRAND.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BRAND.line,
    shadowColor: "#302A24",
    shadowOpacity: 0.07,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  iconCircle: { alignItems: "center", justifyContent: "center" },
  primaryButton: {
    minHeight: 54,
    borderRadius: 17,
    backgroundColor: BRAND.terracotta,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  secondaryButton: { backgroundColor: BRAND.terracottaSoft, borderWidth: 1, borderColor: "#E6C8BC" },
  disabledButton: { opacity: 0.55 },
  pressedButton: { opacity: 0.88, transform: [{ scale: 0.985 }] },
  primaryButtonText: { color: "#FFF9F3", fontSize: 16, fontWeight: "700", letterSpacing: 0.1 },
  secondaryButtonText: { color: BRAND.terracotta },
  topBar: { minHeight: 74, paddingBottom: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  topBarLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  backButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#EFEAE2", alignItems: "center", justifyContent: "center" },
  eyebrow: { color: BRAND.terracotta, fontSize: 10, fontWeight: "800", letterSpacing: 1.8, marginBottom: 2 },
  topBarTitle: { color: BRAND.ink, fontSize: 22, fontWeight: "800", letterSpacing: -0.3 },
  topBarSubtitle: { color: BRAND.muted, fontSize: 13, marginTop: 2 },
  choiceChip: { borderRadius: 100, borderWidth: 1, borderColor: BRAND.line, paddingHorizontal: 14, paddingVertical: 10, backgroundColor: BRAND.surface },
  choiceChipSelected: { backgroundColor: BRAND.terracottaSoft, borderColor: "#D7A998" },
  choiceChipPressed: { opacity: 0.7 },
  choiceChipText: { color: BRAND.muted, fontSize: 13, fontWeight: "600" },
  choiceChipTextSelected: { color: BRAND.terracotta },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { color: BRAND.ink, fontSize: 18, fontWeight: "800", letterSpacing: -0.2 },
  sectionAction: { color: BRAND.terracotta, fontWeight: "700", fontSize: 13 },
  colorDots: { flexDirection: "row", alignItems: "center", gap: 7 },
  colorDot: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: BRAND.surface },
  colorDotActive: { width: 22, height: 22, borderRadius: 11, borderColor: BRAND.terracotta },
});
