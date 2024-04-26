import type { ComponentType } from "svelte";
import GuideAddRemoveItem from "./content/guide-add-remove-item.svelte";
import GuideMovingItems from "./content/guide-moving-items.svelte";
import GuideEditingItems from "./content/guide-editing-items.svelte";
import GuideChangingItem from "./content/guide-changing-item.svelte";
import GuideAddRemoveRelations from "./content/guide-add-remove-relations.svelte";
import GuideRecommendedRelations from "./content/guide-recommended-relations.svelte";
import GuideTextRelations from "./content/guide-text-relations.svelte";
import GuideManagingProject from "./content/guide-managing-project.svelte";
import GuidePages from "./content/guide-pages.svelte";
import GuideCopyPaste from "./content/guide-copy-paste.svelte";
import GuideGroups from "./content/guide-groups.svelte";
import GuideSelections from "./content/guide-selections.svelte";

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
  {
    id: "guide-project",
    heading: "Project",
    children: [
      {
        id: "guide-managing-projects",
        heading: "Managing projects",
        content: GuideManagingProject,
      },
      {
        id: "guide-pages",
        heading: "Pages",
        content: GuidePages,
      },
    ],
  },
  {
    id: "guide-other",
    heading: "Other features",
    children: [
      {
        id: "guide-copy-paste",
        heading: "Copy and Paste",
        content: GuideCopyPaste,
      },
      {
        id: "guide-groups",
        heading: "Groups",
        content: GuideGroups,
      },
      {
        id: "guide-selections",
        heading: "Selections",
        content: GuideSelections,
      },
    ],
  },
];
