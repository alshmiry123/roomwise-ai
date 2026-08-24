# Roomwise AI — Implementation Notes

## Delivered Scope

Roomwise AI is implemented as a portrait-first Expo mobile application for Android-oriented testing. The current build covers the complete client journey from a new design brief through room-photo review, deterministic analysis, personalized recommendations, visual editing, and local saved designs. The experience is intentionally usable without API credentials so the product flow can be reviewed immediately.

The current analysis engine is deterministic client-side behavior, not a production computer-vision model. It supplies stable `RoomAnalysis` and `DesignRecommendation` objects that mirror the future inference contract. This keeps the interface and user journey testable while making the eventual model integration a contained repository/service change.

## Architecture

The project follows a lightweight Clean Architecture-inspired separation suitable for the first mobile release. Shared domain vocabulary lives in `constants/roomwise.ts`. The `RoomwiseProvider` in `lib/roomwise-context.tsx` owns draft state, analysis state, saved projects, and local persistence. Expo Router screens in `app/` are responsible for presentation and navigation. Reusable visual primitives live in `components/roomwise-ui.tsx`.

| Concern | Current implementation |
|---|---|
| Presentation | Expo Router + React Native + NativeWind-compatible template |
| State | React Context with explicit draft and saved-project actions |
| Persistence | AsyncStorage for non-sensitive local saved designs |
| Camera/gallery | Expo ImagePicker with permission-aware camera flow and gallery import |
| AI seam | `getRoomAnalysis()` and `createRecommendation()` domain functions |
| Theming | Shared ThemeProvider with Roomwise light/dark semantic palette |
| Navigation | Home, Designs, Profile tabs plus stack-pushed setup, capture, review, analysis, recommendations, and editor routes |
| Branding | Roomwise launcher/splash/favicon assets and app configuration metadata |

## Production AI Integration Strategy

A production implementation should replace the deterministic functions with a repository that first assesses photo quality locally, then requests user consent before any upload. On-device modules such as ML Kit, TensorFlow Lite, or ONNX Runtime Mobile can provide fast object, segmentation, and color signals. A multimodal server model can then enrich spatial understanding and recommendation language when the device or model confidence requires it. The existing `RoomAnalysis` and `DesignRecommendation` types provide a stable boundary for that replacement.

The visual generation path should be asynchronous and explicit. After analysis, the client would submit a consented photo plus structured room preferences to a server-side generation endpoint, receive a generated preview URI, and show the output as a directional visualization. The editor should continue to communicate that generated previews are conceptual and not architectural or to-scale plans.

## Privacy and Data

The prototype stores saved design metadata locally and does not upload room photos automatically. The review screen states that analysis begins only after confirmation. A production release should add encrypted media storage, clear deletion of source photos and generated previews, a privacy policy route, and telemetry that excludes raw images by default. User accounts and cloud sync are intentionally not enabled because they were not required to demonstrate the core product flow.

## Testing

The project includes deterministic Vitest coverage for initial draft creation, room/style/budget recommendation alignment, and analysis output shape. The quality suite currently passes with three Roomwise tests passing, the starter auth test skipped, TypeScript passing, and Expo lint passing without lint warnings. The primary flow was manually verified in the portrait preview: Home → Setup → Capture → Review → Analysis → Recommendations → Editor → Save → Designs, including editor compare mode and Profile dark mode.

## Android Handoff

Use the project’s normal Expo workflow to open the generated QR code in Expo Go or use the platform Publish action in the management UI to trigger the Android build process. Before a store release, replace the deterministic AI functions with the approved inference service, validate camera behavior on physical Android devices, add production privacy/legal copy, configure crash and performance monitoring, and run device-level tests across the minimum Android SDK range.
