import {
  useSvelteFlow,
  type Node,
  type Edge,
  type Viewport,
  useStore,
} from "@xyflow/svelte";
import { type SegmentTemplateKey } from "../info/segments";
import { get, writable, type Writable } from "svelte/store";
import { pageTemplates, projectTemplates } from "../info/templates";
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
  keepWithinParent: boolean;
};

export type Grid = {
  columns: number[];
  rows: number[];
};

export type Project = {
  name?: string;
  activePageIndex: number;
  pages: SavedPage[];
};

const projectStore: Writable<Project> = writable(
  structuredClone(projectTemplates.empty),
);
projectStore.subscribe(($project) => console.debug("project", $project));

const pageStore: Writable<PageData> = writable({
  name: "page",
  template: "empty",
  keepWithinParent: true,
});
pageStore.subscribe(($page) => console.debug("pageStore", $page));

export const gridStore: Writable<Grid> = writable({ columns: [], rows: [] });
gridStore.subscribe(($grid) => console.debug("gridSize", $grid));

export function useProject() {
  const { toObject, setViewport, fitView } = useSvelteFlow();
  const { reset, edges, nodes } = useStore();

  function storePage($project: Project) {
    if ($project.activePageIndex < 0) return;
    const obj = toObject();
    const page: SavedPage = {
      ...obj,
      ...get(pageStore),
      grid: { ...get(gridStore) },
      history: getHistory(),
    };
    $project.pages[$project.activePageIndex] = page;
  }

  function loadPage($project: Project) {
    const page =
      $project.pages?.[$project.activePageIndex] ??
      structuredClone(pageTemplates.empty);

    // Update name immediatly to prevent flashing
    pageStore.update((p) => {
      p.name = page.name;
      return p;
    });
    console.log("page being loaded:", page);
    reset();
    // Leave some time for the reset to happen. This prevents wierd
    // behaviour where some state is left behind from previous page
    setTimeout(() => {
      // Set template name before nodes to limit risk of looking up the
      // wrong template for the page.Setting this after the reset() above
      // also prevent existing nodes from accessing incorrect templates
      pageStore.set(page);
      // TODO: set snapGrid
      gridStore.set(page.grid);
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
    project: projectStore,
    page: pageStore,
    grid: gridStore,
    toJSON(): string {
      const $project = get(projectStore);
      storePage($project);
      return JSON.stringify($project);
    },
    fromJSON(json: string) {
      // TODO: Handle parse error and validation
      const $project: Project = JSON.parse(json);
      console.log("loaded project", $project);
      loadPage($project);
      projectStore.set($project);
    },
    newProject(template: keyof typeof projectTemplates = "default") {
      const $project: Project = structuredClone(projectTemplates[template]);
      loadPage($project);
      projectStore.set($project);
    },
    addPage(template: keyof typeof pageTemplates = "default") {
      const $project = get(projectStore);
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
      projectStore.set($project);
    },
    duplicatePage(pageIndex: number) {
      const $project = get(projectStore);
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
      projectStore.set($project);
    },
    removePage(pageIndex: number) {
      const $project = get(projectStore);

      if (pageIndex >= $project.pages.length || pageIndex < 0) return;
      const removed = $project.pages.splice(pageIndex, 1);
      if (removed.length < 1) return;
      if (
        $project.pages.length === 0 ||
        pageIndex <= $project.activePageIndex
      ) {
        $project.activePageIndex -= 1;
      }
      loadPage($project);
      projectStore.set($project);
    },
    swapActivePage(pageIndex: number) {
      const $project = get(projectStore);
      if (
        $project.activePageIndex === pageIndex ||
        !$project.pages?.[pageIndex]
      ) {
        return;
      }

      storePage($project);
      $project.activePageIndex = pageIndex;
      loadPage($project);

      projectStore.set($project);
    },
  };
}
