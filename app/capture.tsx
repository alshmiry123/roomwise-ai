import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Alert, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { BRAND, getBrandColors, PrimaryButton, RoomwiseCard, TopBar } from "@/components/roomwise-ui";
import { IMAGE_URLS } from "@/constants/roomwise";
import { useRoomwise } from "@/lib/roomwise-context";
import { useThemeContext } from "@/lib/theme-provider";

export default function CaptureScreen() {
  const { draft, updateImage } = useRoomwise();
  const { colorScheme } = useThemeContext();
  const colors = getBrandColors(colorScheme === "dark");

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.9,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      updateImage(result.assets[0].uri);
      router.push("/review");
    }
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Camera permission needed", "Allow Roomwise to use your camera, then try again.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.9 });
    if (!result.canceled && result.assets[0]?.uri) {
      updateImage(result.assets[0].uri);
      router.push("/review");
    }
  };

  const useSample = () => {
    updateImage(IMAGE_URLS.livingRoom);
    router.push("/review");
  };

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background" edges={["top", "bottom", "left", "right"]}>
      <View style={styles.content}>
        <TopBar title="Room photo" subtitle="Show us the space as it is" showBack />
        <View style={styles.copy}>
          <Text style={[styles.title, { color: colors.ink }]}>A good photo gives us more to work with.</Text>
          <Text style={[styles.body, { color: colors.muted }]}>Use daylight when you can. Include the corners and keep the camera level.</Text>
        </View>

        <RoomwiseCard style={[styles.photoCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
          <Image source={{ uri: draft.imageUri || IMAGE_URLS.livingRoom }} style={styles.photo} resizeMode="cover" />
          <View style={styles.photoShade} />
          <View style={styles.frameTop}><View style={styles.frameLabel}><MaterialIcons name="center-focus-strong" size={15} color="#FFF9F3" /><Text style={styles.frameLabelText}>FRAME THE WHOLE ROOM</Text></View></View>
          <View style={[styles.corner, styles.cornerTL]} /><View style={[styles.corner, styles.cornerTR]} /><View style={[styles.corner, styles.cornerBL]} /><View style={[styles.corner, styles.cornerBR]} />
          <View style={styles.photoHint}><MaterialIcons name="wb-sunny" size={15} color="#FFF9F3" /><Text style={styles.photoHintText}>Natural light works best</Text></View>
        </RoomwiseCard>

        <View style={styles.actions}>
          <PrimaryButton label="Take a photo" icon="photo-camera" onPress={openCamera} />
          <View style={styles.secondaryRow}>
            <Pressable accessibilityRole="button" accessibilityLabel="Choose from gallery" onPress={openGallery} style={({ pressed }) => [styles.secondaryAction, { backgroundColor: colors.surface, borderColor: colors.line }, pressed && styles.pressed]}>
              <MaterialIcons name="photo-library" size={20} color={colors.terracotta} />
              <Text style={[styles.secondaryLabel, { color: colors.ink }]}>Choose from gallery</Text>
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Use sample room" onPress={useSample} style={({ pressed }) => [styles.secondaryAction, { backgroundColor: colors.surface, borderColor: colors.line }, pressed && styles.pressed]}>
              <MaterialIcons name="auto-awesome" size={20} color={BRAND.sage} />
              <Text style={[styles.secondaryLabel, { color: colors.ink }]}>Use sample room</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.privacy}><MaterialIcons name="lock-outline" size={15} color={colors.muted} /><Text style={[styles.privacyText, { color: colors.muted }]}>Your photo stays on this device until you choose to analyze it.</Text></View>
        {Platform.OS === "web" ? <Text style={[styles.webNote, { color: colors.muted }]}>Camera access depends on your browser. The sample room is always available for preview.</Text> : null}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingTop: 8, gap: 22 },
  copy: { gap: 7 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: "800", letterSpacing: -0.6 },
  body: { fontSize: 15, lineHeight: 22, maxWidth: 330 },
  photoCard: { flex: 1, minHeight: 300, maxHeight: 390, overflow: "hidden", borderRadius: 24, position: "relative" },
  photo: { ...StyleSheet.absoluteFillObject, width: undefined, height: undefined },
  photoShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(21, 25, 22, 0.20)" },
  frameTop: { position: "absolute", top: 17, left: 16, right: 16, flexDirection: "row", justifyContent: "space-between" },
  frameLabel: { backgroundColor: "rgba(30, 33, 31, 0.65)", borderRadius: 100, paddingHorizontal: 10, paddingVertical: 7, flexDirection: "row", alignItems: "center", gap: 6 },
  frameLabelText: { color: "#FFF9F3", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  corner: { position: "absolute", width: 28, height: 28, borderColor: "rgba(255, 249, 243, 0.9)" },
  cornerTL: { top: 55, left: 24, borderTopWidth: 2, borderLeftWidth: 2 },
  cornerTR: { top: 55, right: 24, borderTopWidth: 2, borderRightWidth: 2 },
  cornerBL: { bottom: 55, left: 24, borderBottomWidth: 2, borderLeftWidth: 2 },
  cornerBR: { bottom: 55, right: 24, borderBottomWidth: 2, borderRightWidth: 2 },
  photoHint: { position: "absolute", bottom: 16, left: 16, flexDirection: "row", alignItems: "center", gap: 6 },
  photoHintText: { color: "#FFF9F3", fontSize: 12, fontWeight: "600" },
  actions: { gap: 10 },
  secondaryRow: { flexDirection: "row", gap: 10 },
  secondaryAction: { flex: 1, minHeight: 56, borderRadius: 16, borderWidth: 1, alignItems: "center", justifyContent: "center", gap: 6 },
  secondaryLabel: { fontSize: 12, fontWeight: "700" },
  privacy: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingHorizontal: 8 },
  privacyText: { fontSize: 11, textAlign: "center" },
  webNote: { fontSize: 11, textAlign: "center", marginBottom: 3 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.985 }] },
});
