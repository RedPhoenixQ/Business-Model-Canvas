import type { ComponentType } from "svelte";
import GuideAddRemoveItem from "./content/guide-add-remove-item.svelte";
import GuideMovingItems from "./content/guide-moving-items.svelte";
import GuideEditingItems from "./content/guide-editing-items.svelte";
import GuideChangingItem from "./content/guide-changing-item.svelte";
import GuideAddRemoveRelations from "./content/guide-add-remove-relations.svelte";
import GuideRecommendedRelations from "./content/guide-recommended-relations.svelte";
import GuideTextRelations from "./content/guide-text-relations.svelte";

export interface SectionInfo {
  heading: string;
  id: string;
  content?: ComponentType;
  children?: SectionInfo[];
}

export const sections: SectionInfo[] = [
  {
    id: "guide-items",
    heading: "Items",
    children: [
      {
        id: "guide-add-remove-item",
        heading: "Adding And Removing Items",
        content: GuideAddRemoveItem,
      },
      {
        id: "guide-moving-items",
        heading: "Moving And Moving Between Segments",
        content: GuideMovingItems,
      },
      {
        id: "guide-editing-items",
        heading: "Editing Items",
        content: GuideEditingItems,
      },
      {
        id: "guide-changing-item",
        heading: "Changing Icons",
        content: GuideChangingItem,
      },
    ],
  },
  {
    id: "guide-relations",
    heading: "Relations",
    children: [
      {
        id: "guide-add-remove-relations",
        heading: "Adding And Removing Relations",
        content: GuideAddRemoveRelations,
      },
      {
        id: "guide-recommended-relations",
        heading: "Recommended Relations",
        content: GuideRecommendedRelations,
      },
      {
        id: "guide-text-relations",
        heading: "Adding Text To Relations",
        content: GuideTextRelations,
      },
    ],
  },
];
