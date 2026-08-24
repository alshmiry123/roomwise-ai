# Roomwise AI — Mobile Interface Design Plan

## Product Direction

Roomwise AI is a calm, premium Android companion for turning a room photo into an actionable redesign plan. The experience should feel like a trusted interior stylist: visual first, focused, warm, and clear about what the AI has understood. The app is designed for portrait orientation and one-handed use, with primary actions kept within thumb reach and a persistent bottom navigation model.

The first release focuses on a complete local prototype flow: choose a room, provide a photo, review the AI analysis, explore recommendations, and save the proposed design. AI output is represented as a transparent simulated analysis layer in the client until a production multimodal model is connected; the UI and domain vocabulary are structured so that real inference can replace it without reworking the screens.

## Screen List

| Screen | Primary content and functionality |
|---|---|
| Home | Personalized greeting, current project summary, quick action to start a new room scan, recent designs, and a small “how Roomwise works” explainer. |
| New Design / Room Setup | Room-type picker for bedroom, living room, office, kitchen, children’s room, and commercial space; style preference chips; budget and transformation-level controls; continue action. |
| Capture Room | Camera-shaped capture surface with framing guidance, gallery import action, quality guidance, and a review step before analysis. In the prototype, the user can choose a bundled room image or use a local image picker when available. |
| Image Review | Large preview of the chosen room, retake/change-photo action, consent note explaining that the image is analyzed only after the user confirms, and analyze action. |
| AI Analysis | Progressive analysis state with a visual scan treatment, detected-room summary, color palette, detected objects, confidence labels, and transition into recommendations. |
| Recommendations | Proposed style, color direction, furniture and lighting suggestions, space-optimization notes, estimated budget band, and “Apply to preview” action. |
| Design Editor | Before/after preview, compare toggle, style and accent color controls, furniture suggestion rail, lighting intensity control, and save design action. |
| Saved Designs | Gallery of locally saved concepts with room type, style, date, and saved-preview card. Tapping a card opens the editor/detail view. |
| Profile / Preferences | Language toggle placeholder for English/Arabic, theme toggle for light/dark mode, default room preferences, privacy and data deletion affordances, and app information. |

## Primary User Flows

### Start a New Room Design

1. User opens Home and taps **Start a new design**.
2. User chooses a room type and optionally selects a preferred style, budget band, and transformation level.
3. User taps **Continue to photo** and arrives at Capture Room.
4. User taps **Use a sample room** for the seeded prototype image, or **Choose from gallery** when the device picker is available.
5. User reviews the image and taps **Analyze this room**.
6. AI Analysis presents progress and a detected-room summary.
7. User taps **See recommendations** to open Recommendations.
8. User taps **Preview this direction** to open Design Editor.
9. User adjusts style or accent color and taps **Save design**.
10. The saved design appears in Saved Designs and is also summarized on Home.

### Explore an Existing Saved Design

1. User opens Saved Designs from the bottom tab bar.
2. User taps a design card.
3. The editor opens with the saved style, palette, and recommendation summary.
4. User uses the compare control to view the original and proposed direction.
5. User can return to the gallery or save another revision.

### Adjust Preferences

1. User opens Profile.
2. User toggles theme or language preference.
3. User changes default style or budget preference.
4. The app persists the preference locally for the next design session.

## Navigation Model

The bottom tab bar contains **Home**, **Designs**, and **Profile**. Camera, analysis, recommendations, and editor screens are pushed onto the stack from Home or Designs and hide the tab bar to keep attention on the task. A back affordance is always available in the top-left. Primary CTAs use full-width thumb-friendly buttons near the lower content area, while secondary actions are compact text or icon buttons.

## Visual System

The brand should feel like a boutique design studio rather than a generic AI utility. Use a soft warm canvas with deep ink text, a restrained terracotta accent, and sage as a supporting signal. Cards should be rounded but architectural, with quiet borders, subtle shadow, and generous 20–24 px spacing. The hero room imagery should carry visual weight while the interface remains mostly neutral.

| Token | Light mode | Dark mode | Usage |
|---|---|---|---|
| Canvas | `#F7F5F1` | `#171817` | Screen background |
| Surface | `#FFFCF8` | `#232321` | Cards, sheets, input surfaces |
| Ink | `#1E211F` | `#F4F0E9` | Primary text |
| Muted ink | `#6D716B` | `#AAAFA6` | Supporting text |
| Terracotta | `#B9654A` | `#D47A5F` | Primary CTA and active states |
| Terracotta soft | `#F1DDD4` | `#4A2E27` | Accent chips and selected surfaces |
| Sage | `#7F947B` | `#A8BEA2` | Positive analysis signals |
| Line | `#E5E0D8` | `#3A3B37` | Borders and dividers |

Typography should use the platform system sans for reliability, with strong hierarchy: 32 px display greeting, 22 px section titles, 16 px card headings, and 14–15 px supporting copy. Use sentence case and avoid excessive uppercase labels. Icons use Material Icons mapped through the existing icon abstraction.

## Accessibility and Localization

All interactive controls should have readable labels and a minimum 44 dp touch target. Color is never the only signal for analysis confidence or selection. Copy is written to be translatable, with short labels that can support Arabic RTL later. Directional icons should respect RTL, and the layout should avoid hard-coded left/right assumptions when the localization layer is added. Dark mode uses the same semantic tokens with sufficient contrast.

## Interaction and State Decisions

The prototype uses local React state and AsyncStorage-ready domain types, without user accounts or cloud sync. Each design session is represented by a `DesignProject` containing room type, image URI, preferences, analysis result, recommendations, and saved timestamp. AI analysis is a deterministic client-side simulation so the user can experience the full journey without credentials; a future multimodal endpoint can populate the same `RoomAnalysis` and `DesignRecommendation` types.

Primary buttons use restrained press feedback and haptics on native Android. Analysis uses a short, intentional progress state rather than an indefinite spinner. Empty states explain what the user can do next. Privacy copy is explicit: no photo is analyzed until confirmation, and saved designs are local to the device in this prototype.
