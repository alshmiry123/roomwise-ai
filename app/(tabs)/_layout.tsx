import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { BRAND } from "@/components/roomwise-ui";
import { useThemeContext } from "@/lib/theme-provider";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useThemeContext();
  const isDark = colorScheme === "dark";
  const background = isDark ? BRAND.night : BRAND.canvas;
  const muted = isDark ? BRAND.nightMuted : BRAND.muted;
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? "#D47A5F" : BRAND.terracotta,
        tabBarInactiveTintColor: muted,
        tabBarButton: HapticTab,
        tabBarStyle: { height: 58 + bottomPadding, paddingTop: 8, paddingBottom: bottomPadding, backgroundColor: background, borderTopColor: isDark ? BRAND.nightLine : BRAND.line, borderTopWidth: 0.7 },
        tabBarLabelStyle: { fontSize: 10, fontWeight: "700", marginTop: 1 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <MaterialIcons name="home" color={color} size={size} /> }} />
      <Tabs.Screen name="designs" options={{ title: "Designs", tabBarIcon: ({ color, size }) => <MaterialIcons name="collections" color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <MaterialIcons name="person-outline" color={color} size={size} /> }} />
    </Tabs>
  );
}
