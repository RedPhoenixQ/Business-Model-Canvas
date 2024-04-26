import {
  useSvelteFlow,
  type Node,
  type Edge,
  type Viewport,
  useStore,
} from "@xyflow/svelte";
import { segmentTemplateInfo, type SegmentTemplateKey } from "../info/segments";
import { derived, get, writable } from "svelte/store";
import {
  defaultPageData,
  pageTemplates,
  projectTemplates,
} from "../info/templates";
import { type HistoryEntry, getHistory, setHistory } from "./history";
import { migrateVersion } from "./version";

export type SavedPage = {
  data: PageData;
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
  showItemNames: boolean;
  showRelationWarnings: boolean;
};

export type Grid = {
  columns: number[];
  rows: number[];
};

export type Project = {
  version: string;
  name?: string;
  activePageIndex: number;
  /** Should always be atleast one page, else changes will not be saved
   * when a page is created as there is no page to save the changes to */
  pages: SavedPage[];
};

export const projectStore = writable<Project>(
  structuredClone(projectTemplates.empty),
);
projectStore.subscribe(($project) => console.debug("project", $project));
export const canRemovePages = derived(projectStore, ($project, set) => {
  set($project.pages.length > 1);
});

export const pageStore = writable<PageData>({
  ...defaultPageData,
  template: "Empty",
});
pageStore.subscribe(($page) => console.debug("pageStore", $page));

export const templateInfoStore = derived(
  pageStore,
  ($page) => segmentTemplateInfo[$page.template],
  segmentTemplateInfo["Empty"],
);

export const gridStore = writable<Grid>({ columns: [], rows: [] });
gridStore.subscribe(($grid) => console.debug("gridSize", $grid));

export function useProject() {
  const { toObject, setViewport, fitView } = useSvelteFlow();
  const { reset, edges, nodes } = useStore();

  function storePage($project: Project) {
    if ($project.activePageIndex < 0) return;
    const obj = toObject();
    const page: SavedPage = {
      ...obj,
      data: { ...get(pageStore) },
      grid: { ...get(gridStore) },
      history: getHistory(),
    };
    $project.pages[$project.activePageIndex] = page;
  }

  function loadPage($project: Project) {
    const page =
      $project.pages?.[$project.activePageIndex] ??
      structuredClone(pageTemplates["Empty"][0]);

    // Update name immediatly to prevent flashing
    pageStore.update((p) => {
      p.name = page.data.name;
      return p;
    });
    console.debug("page being loaded:", page);
    reset();
    // Leave some time for the reset to happen. This prevents wierd
    // behaviour where some state is left behind from previous page
    setTimeout(() => {
      // Set template name before nodes to limit risk of looking up the
      // wrong template for the page.Setting this after the reset() above
      // also prevent existing nodes from accessing incorrect templates
      pageStore.set(page.data);
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
    toJSON(): string {
      const $project = get(projectStore);
      storePage($project);
      return JSON.stringify($project);
    },
    fromJSON(json: string) {
      // TODO: Handle parse error and validation
      try {
        const $project = migrateVersion(JSON.parse(json));
        console.debug("loaded project", $project);
        loadPage($project);
        projectStore.set($project);
      } catch (err) {
        console.error(err);
        alert(
          (err as Error)?.message ??
            "Something went wrong when loading the projet",
        );
      }
    },
    newProject(template: keyof typeof projectTemplates = "default") {
      const $project: Project = structuredClone(projectTemplates[template]);
      loadPage($project);
      projectStore.set($project);
    },
    addPage(template: keyof typeof pageTemplates, preset?: string) {
      const [base, presets]: [SavedPage, Record<string, SavedPage>] =
        pageTemplates[template];
      const new_page =
        preset && presets?.[preset]
          ? structuredClone(presets[preset])
          : structuredClone(base);

      const $project = get(projectStore);
      storePage($project);

      // Find the max number of the default page name
      let max = 0;
      for (const page of $project.pages) {
        const match = /^Page (\d+)\s*$/.exec(page.data.name);
        if (match) {
          // Convert capture group 1 with digits to number and save the max
          max = Math.max(max, ~~match[1]);
        }
      }

      $project.activePageIndex = $project.pages.length;
      new_page.data.name = `Page ${max + 1}`;
      $project.pages.push(new_page);
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
      $project.pages[pageIndex + 1].data.name += " copy";
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
