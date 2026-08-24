import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  createDraft,
  createRecommendation,
  getRoomAnalysis,
  SEED_SAVED_DESIGNS,
  type BudgetBand,
  type DesignProject,
  type DesignStyle,
  type DraftProject,
  type RoomType,
  type TransformationLevel,
} from "@/constants/roomwise";

const SAVED_DESIGNS_KEY = "roomwise.saved-designs.v1";

type RoomwiseContextValue = {
  draft: DraftProject;
  savedDesigns: DesignProject[];
  isHydrated: boolean;
  isAnalyzing: boolean;
  updateRoomType: (roomType: RoomType) => void;
  updateStyle: (style: DesignStyle) => void;
  updateBudget: (budget: BudgetBand) => void;
  updateTransformation: (transformation: TransformationLevel) => void;
  updateImage: (imageUri: string) => void;
  updateAccentColor: (accentColor: string) => void;
  analyzeDraft: () => Promise<void>;
  saveDraft: () => Promise<DesignProject>;
  openSavedDesign: (project: DesignProject) => void;
};

const RoomwiseContext = createContext<RoomwiseContextValue | null>(null);

export function RoomwiseProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<DraftProject>(createDraft);
  const [savedDesigns, setSavedDesigns] = useState<DesignProject[]>(SEED_SAVED_DESIGNS);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(SAVED_DESIGNS_KEY)
      .then((value) => {
        if (value) {
          try {
            setSavedDesigns(JSON.parse(value));
          } catch {
            setSavedDesigns(SEED_SAVED_DESIGNS);
          }
        }
      })
      .finally(() => setIsHydrated(true));
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(SAVED_DESIGNS_KEY, JSON.stringify(savedDesigns)).catch(() => undefined);
  }, [isHydrated, savedDesigns]);

  const updateRoomType = (roomType: RoomType) => {
    setDraft((current) => ({
      ...current,
      roomType,
      imageUri: roomType === "Bedroom" ? "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=1200&q=85" : current.imageUri,
      analysis: null,
      recommendation: createRecommendation(roomType, current.style, current.budget),
    }));
  };

  const updateStyle = (style: DesignStyle) => {
    setDraft((current) => ({
      ...current,
      style,
      recommendation: createRecommendation(current.roomType, style, current.budget),
    }));
  };

  const updateBudget = (budget: BudgetBand) => {
    setDraft((current) => ({
      ...current,
      budget,
      recommendation: createRecommendation(current.roomType, current.style, budget),
    }));
  };

  const updateTransformation = (transformation: TransformationLevel) => {
    setDraft((current) => ({ ...current, transformation }));
  };

  const updateImage = (imageUri: string) => {
    setDraft((current) => ({ ...current, imageUri, analysis: null }));
  };

  const updateAccentColor = (accentColor: string) => {
    setDraft((current) => ({ ...current, accentColor }));
  };

  const analyzeDraft = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 1250));
    setDraft((current) => ({
      ...current,
      analysis: getRoomAnalysis(current.roomType),
      recommendation: createRecommendation(current.roomType, current.style, current.budget),
    }));
    setIsAnalyzing(false);
  };

  const saveDraft = async () => {
    const project: DesignProject = {
      ...draft,
      id: `design-${Date.now()}`,
      createdAt: "Just now",
      analysis: draft.analysis ?? getRoomAnalysis(draft.roomType),
      recommendation:
        draft.recommendation ?? createRecommendation(draft.roomType, draft.style, draft.budget),
    };
    setSavedDesigns((current) => [project, ...current.filter((item) => item.id !== "seed-1")]);
    return project;
  };

  const openSavedDesign = (project: DesignProject) => {
    setDraft({
      roomType: project.roomType,
      style: project.style,
      budget: project.budget,
      transformation: project.transformation,
      imageUri: project.imageUri,
      accentColor: project.accentColor,
      analysis: project.analysis,
      recommendation: project.recommendation,
    });
  };

  const value = useMemo(
    () => ({
      draft,
      savedDesigns,
      isHydrated,
      isAnalyzing,
      updateRoomType,
      updateStyle,
      updateBudget,
      updateTransformation,
      updateImage,
      updateAccentColor,
      analyzeDraft,
      saveDraft,
      openSavedDesign,
    }),
    [draft, savedDesigns, isHydrated, isAnalyzing],
  );

  return <RoomwiseContext.Provider value={value}>{children}</RoomwiseContext.Provider>;
}

export function useRoomwise() {
  const context = useContext(RoomwiseContext);
  if (!context) throw new Error("useRoomwise must be used inside RoomwiseProvider");
  return context;
}
