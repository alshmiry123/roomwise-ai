export type RoomType =
  | "Living room"
  | "Bedroom"
  | "Office"
  | "Kitchen"
  | "Children's room"
  | "Commercial space";

export type DesignStyle =
  | "Modern"
  | "Minimalist"
  | "Classic"
  | "Scandinavian"
  | "Industrial"
  | "Luxury";

export type BudgetBand = "Under $1k" | "$1k–$3k" | "$3k–$8k" | "$8k+";
export type TransformationLevel = "Refresh" | "Rework" | "Full redesign";

export type RoomAnalysis = {
  roomType: RoomType;
  detectedObjects: string[];
  palette: { name: string; hex: string }[];
  lighting: string;
  dimensions: string;
  confidence: number;
  summary: string;
};

export type DesignRecommendation = {
  title: string;
  style: DesignStyle;
  overview: string;
  colors: string[];
  furniture: string[];
  lighting: string;
  optimization: string;
  estimatedBudget: BudgetBand;
};

export type DesignProject = {
  id: string;
  roomType: RoomType;
  style: DesignStyle;
  budget: BudgetBand;
  transformation: TransformationLevel;
  imageUri: string;
  createdAt: string;
  analysis: RoomAnalysis;
  recommendation: DesignRecommendation;
  accentColor: string;
};

export type DraftProject = Omit<DesignProject, "id" | "createdAt" | "analysis" | "recommendation"> & {
  analysis: RoomAnalysis | null;
  recommendation: DesignRecommendation | null;
};

export const IMAGE_URLS = {
  livingRoom:
    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=85",
  bedroom:
    "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=1200&q=85",
  office:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
  kitchen:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
};

export const ROOM_OPTIONS: { label: RoomType; icon: string; note: string }[] = [
  { label: "Living room", icon: "weekend", note: "Gather, relax, host" },
  { label: "Bedroom", icon: "bed", note: "Rest, reset, recharge" },
  { label: "Office", icon: "desk", note: "Focus, create, deliver" },
  { label: "Kitchen", icon: "countertops", note: "Cook, connect, share" },
  { label: "Children's room", icon: "toys", note: "Play, learn, grow" },
  { label: "Commercial space", icon: "storefront", note: "Welcome, serve, sell" },
];

export const STYLE_OPTIONS: DesignStyle[] = [
  "Modern",
  "Minimalist",
  "Classic",
  "Scandinavian",
  "Industrial",
  "Luxury",
];

export const BUDGET_OPTIONS: BudgetBand[] = ["Under $1k", "$1k–$3k", "$3k–$8k", "$8k+"];
export const TRANSFORMATION_OPTIONS: TransformationLevel[] = ["Refresh", "Rework", "Full redesign"];

const analysisByRoom: Record<RoomType, RoomAnalysis> = {
  "Living room": {
    roomType: "Living room",
    detectedObjects: ["Sofa", "Coffee table", "Window", "Floor lamp", "Area rug"],
    palette: [
      { name: "Warm white", hex: "#F6F1E9" },
      { name: "Clay", hex: "#B9654A" },
      { name: "Sage", hex: "#7F947B" },
      { name: "Ink", hex: "#313633" },
    ],
    lighting: "Soft natural light from the left",
    dimensions: "Approx. 4.8m × 3.6m",
    confidence: 92,
    summary: "A bright social room with a strong natural-light axis and a calm neutral base.",
  },
  Bedroom: {
    roomType: "Bedroom",
    detectedObjects: ["Bed", "Nightstand", "Window", "Dresser", "Curtains"],
    palette: [
      { name: "Oat", hex: "#E8DED0" },
      { name: "Mushroom", hex: "#A79687" },
      { name: "Sage", hex: "#82927D" },
      { name: "Walnut", hex: "#5C4637" },
    ],
    lighting: "Diffuse daylight with a warm bedside source",
    dimensions: "Approx. 3.9m × 3.2m",
    confidence: 89,
    summary: "A restful room with balanced symmetry and an opportunity to add layered, warmer light.",
  },
  Office: {
    roomType: "Office",
    detectedObjects: ["Desk", "Task chair", "Bookshelf", "Window", "Monitor"],
    palette: [
      { name: "Soft white", hex: "#F3F0E8" },
      { name: "Olive", hex: "#7D8A73" },
      { name: "Graphite", hex: "#39403D" },
      { name: "Oak", hex: "#B88F62" },
    ],
    lighting: "High daylight with a focused task zone",
    dimensions: "Approx. 3.2m × 2.9m",
    confidence: 91,
    summary: "A focused work zone that can feel lighter with clearer cable management and vertical storage.",
  },
  Kitchen: {
    roomType: "Kitchen",
    detectedObjects: ["Island", "Cabinetry", "Sink", "Pendant light", "Appliances"],
    palette: [
      { name: "Limestone", hex: "#E8E0D4" },
      { name: "Terracotta", hex: "#B9654A" },
      { name: "Moss", hex: "#78866F" },
      { name: "Charcoal", hex: "#343936" },
    ],
    lighting: "Bright ambient light with a central pendant",
    dimensions: "Approx. 4.1m × 3.1m",
    confidence: 88,
    summary: "A functional kitchen with a clear work triangle and room for a more expressive focal detail.",
  },
  "Children's room": {
    roomType: "Children's room",
    detectedObjects: ["Bed", "Toy storage", "Desk", "Window", "Play mat"],
    palette: [
      { name: "Cloud", hex: "#F4EEE6" },
      { name: "Dusty blue", hex: "#91A7AA" },
      { name: "Apricot", hex: "#D89B76" },
      { name: "Pine", hex: "#617564" },
    ],
    lighting: "Even daylight with a soft central source",
    dimensions: "Approx. 3.6m × 3.0m",
    confidence: 86,
    summary: "A flexible room where zoning play, rest, and study will make the space work harder.",
  },
  "Commercial space": {
    roomType: "Commercial space",
    detectedObjects: ["Seating", "Display wall", "Entry", "Pendant light", "Service counter"],
    palette: [
      { name: "Plaster", hex: "#E5DDD2" },
      { name: "Rust", hex: "#A85C47" },
      { name: "Sage", hex: "#788A78" },
      { name: "Deep ink", hex: "#29312F" },
    ],
    lighting: "Mixed ambient and display lighting",
    dimensions: "Approx. 8.4m × 5.8m",
    confidence: 84,
    summary: "A welcoming customer-facing space with a strong opportunity to improve circulation and focal moments.",
  },
};

export function createRecommendation(
  roomType: RoomType,
  style: DesignStyle,
  budget: BudgetBand,
): DesignRecommendation {
  const styleCopy: Record<DesignStyle, { title: string; overview: string; colors: string[] }> = {
    Modern: {
      title: "Soft modern retreat",
      overview: "Clean-lined pieces, tactile neutrals, and one grounded accent create a room that feels composed without feeling cold.",
      colors: ["Warm white", "Clay", "Sage"],
    },
    Minimalist: {
      title: "Quiet essentials",
      overview: "Edit the visual noise, keep the best silhouettes, and let negative space make the room feel more generous.",
      colors: ["Limestone", "Oat", "Ink"],
    },
    Classic: {
      title: "Modern classic layer",
      overview: "Use balanced proportions, softened contrast, and timeless materials to make the room feel considered for years.",
      colors: ["Ivory", "Walnut", "Moss"],
    },
    Scandinavian: {
      title: "Light-filled Nordic calm",
      overview: "Pale woods, soft textiles, and a restrained palette amplify light while keeping the room warm and livable.",
      colors: ["Cloud", "Oak", "Dusty blue"],
    },
    Industrial: {
      title: "Refined industrial",
      overview: "Pair honest materials with softer upholstery and warmer lighting so the room feels characterful, not stark.",
      colors: ["Plaster", "Graphite", "Rust"],
    },
    Luxury: {
      title: "Tactile layered luxury",
      overview: "Create depth through richer texture, sculptural lighting, and a few high-impact pieces instead of visual excess.",
      colors: ["Mushroom", "Walnut", "Brass"],
    },
  };
  const copy = styleCopy[style];
  const furnitureByRoom: Record<RoomType, string[]> = {
    "Living room": ["Low-profile modular sofa", "Round oak coffee table", "Textured lounge chair"],
    Bedroom: ["Upholstered bedhead", "Slim bedside tables", "Full-height linen curtains"],
    Office: ["Oak sit-stand desk", "Upholstered task chair", "Tall closed storage"],
    Kitchen: ["Counter stools with back support", "Open shelf for daily objects", "Large-format runner"],
    "Children's room": ["Storage bench", "Rounded-edge desk", "Washable layered rug"],
    "Commercial space": ["Modular lounge seating", "Flexible display plinths", "Slim host console"],
  };
  return {
    title: copy.title,
    style,
    overview: copy.overview,
    colors: copy.colors,
    furniture: furnitureByRoom[roomType],
    lighting: "Add one warm ambient layer, one focused task layer, and keep the existing daylight path open.",
    optimization: "Keep a clear 90 cm circulation path and move tall pieces to the least visually busy wall.",
    estimatedBudget: budget,
  };
}

export function getRoomAnalysis(roomType: RoomType): RoomAnalysis {
  return analysisByRoom[roomType];
}

export function createDraft(): DraftProject {
  const roomType: RoomType = "Living room";
  const style: DesignStyle = "Scandinavian";
  const budget: BudgetBand = "$1k–$3k";
  return {
    roomType,
    style,
    budget,
    transformation: "Rework",
    imageUri: IMAGE_URLS.livingRoom,
    accentColor: "#B9654A",
    analysis: null,
    recommendation: createRecommendation(roomType, style, budget),
  };
}

export const SEED_SAVED_DESIGNS: DesignProject[] = [
  {
    id: "seed-1",
    roomType: "Living room",
    style: "Scandinavian",
    budget: "$1k–$3k",
    transformation: "Rework",
    imageUri: IMAGE_URLS.livingRoom,
    createdAt: "Today",
    analysis: getRoomAnalysis("Living room"),
    recommendation: createRecommendation("Living room", "Scandinavian", "$1k–$3k"),
    accentColor: "#B9654A",
  },
];
