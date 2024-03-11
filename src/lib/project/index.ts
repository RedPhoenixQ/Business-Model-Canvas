import {
  useSvelteFlow,
  type Node,
  type Edge,
  type Viewport,
  useStore,
} from "@xyflow/svelte";
import { gridSize, type Grid, type SegmentTemplateKey } from "../nodes/segment";
import { get, writable, type Writable } from "svelte/store";
import { pageTemplates, projectTemplates } from "./templates";
import { type HistoryEntry, getHistory, setHistory } from "./history";

export type SavedPage = PageData & {
  nodes: Node[];
  edges: Edge[];
  viewport?: Viewport;
  grid: Grid;
  history?: {
    undo: HistoryEntry[];
    redo: HistoryEntry[];
  };
};

export type PageData = {
  name: string;
  template: SegmentTemplateKey;
};

export type Project = {
  name?: string;
  activePageIndex: number;
  pages: SavedPage[];
};

const project: Writable<Project> = writable(
  structuredClone(projectTemplates.empty),
);
project.subscribe(($project) => console.debug("project", $project));

const pageStore: Writable<PageData> = writable({
  name: "page",
  template: "empty",
});

export function useProject() {
  const { toObject, setViewport, fitView } = useSvelteFlow();
  const { reset, edges, nodes } = useStore();

  function storePage($project: Project) {
    if ($project.activePageIndex < 0) return;
    const obj = toObject();
    const page: SavedPage = {
      ...obj,
      ...get(pageStore),
      grid: { ...get(gridSize) },
      history: getHistory(),
    };
    $project.pages[$project.activePageIndex] = page;
  }

  function loadPage($project: Project) {
    const page =
      $project.pages?.[$project.activePageIndex] ??
      structuredClone(pageTemplates.empty);

    pageStore.set({ name: page.name ?? "page", template: page.template });

    console.log("page being loaded:", page);
    reset();
    // Leave some time for the reset to happen. This prevents wierd
    // behaviour where some state is left behind from previous page
    setTimeout(() => {
      // TODO: set snapGrid
      gridSize.set(page.grid);
      nodes.set(page.nodes);
      edges.set(page.edges);
      setHistory(page.history);

      setTimeout(() => {
        // Fit the view if no view is saved
        // TODO: Fix janky behaviour
        // TODO: Fix random fitView resets of the viewport
        if (page.viewport) {
          setViewport(page.viewport);
        } else {
          fitView();
        }
      });
    });
  }

  return {
    project,
    page: pageStore,
    toJSON(): string {
      const $project = get(project);
      storePage($project);
      return JSON.stringify($project);
    },
    fromJSON(json: string) {
      // TODO: Handle parse error and validation
      const $project: Project = JSON.parse(json);
      console.log("loaded project", $project);
      loadPage($project);
      project.set($project);
    },
    newProject(template: keyof typeof projectTemplates = "default") {
      const $project: Project = structuredClone(projectTemplates[template]);
      loadPage($project);
      project.set($project);
    },
    addPage(template: keyof typeof pageTemplates = "default") {
      const $project = get(project);
      storePage($project);

      // Find the max number of the default page name
      let max = 0;
      for (const page of $project.pages) {
        const match = /^Page (\d+)\s*$/.exec(page.name);
        if (match) {
          // Convert capture group 1 with digits to number and save the max
          max = Math.max(max, ~~match[1]);
        }
      }

      $project.activePageIndex = $project.pages.length;
      $project.pages.push({
        ...structuredClone(pageTemplates[template]),
        name: `Page ${max + 1}`,
      });
      loadPage($project);
      project.set($project);
    },
    duplicatePage(pageIndex: number) {
      const $project = get(project);
      if (pageIndex >= $project.pages.length) return;
      storePage($project);
      $project.activePageIndex = pageIndex + 1;
      $project.pages = [
        ...$project.pages.slice(0, pageIndex + 1),
        structuredClone($project.pages[pageIndex]),
        ...$project.pages.slice(pageIndex + 1),
      ];
      $project.pages[pageIndex + 1].name += " copy";
      loadPage($project);
      project.set($project);
    },
    removePage(pageIndex: number) {
      const $project = get(project);

      if (pageIndex >= $project.pages.length) return;
      let removed = $project.pages.splice(pageIndex, 1);
      if (removed.length < 1) return;
      if (
        $project.pages.length === 0 ||
        (pageIndex > 0 && pageIndex <= $project.activePageIndex)
      ) {
        $project.activePageIndex -= 1;
      }
      loadPage($project);
      project.set($project);
    },
    swapActivePage(pageIndex: number) {
      const $project = get(project);
      if (
        $project.activePageIndex === pageIndex ||
        !$project.pages?.[pageIndex]
      ) {
        return;
      }

      storePage($project);
      $project.activePageIndex = pageIndex;
      loadPage($project);

      project.set($project);
    },
  };
}
