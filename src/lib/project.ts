import {
  useSvelteFlow,
  type Node,
  type Edge,
  type Viewport,
  useStore,
} from "@xyflow/svelte";
import { gridSize, type Grid } from "./nodes/segments";
import { get, writable, type Writable } from "svelte/store";
import { pageTemplates, projectTemplates } from "./templates";

export type Page = {
  name?: string;
  nodes: Node[];
  edges: Edge[];
  viewport?: Viewport;
  grid: Grid;
};

export type Project = {
  name?: string;
  activePageIndex: number;
  pages: Page[];
};

const project: Writable<Project> = writable(
  structuredClone(projectTemplates.empty),
);
project.subscribe(($project) => console.debug("project", $project));

const pageName: Writable<string> = writable("page");

export function useProject() {
  const { toObject, setViewport, fitView } = useSvelteFlow();
  const { reset, edges, nodes } = useStore();

  function storePage($project: Project) {
    if ($project.activePageIndex < 0) return;
    const obj = toObject();
    obj.nodes.forEach((node) => {
      removeStores(node.data);
    });
    const page: Page = {
      ...obj,
      name: get(pageName),
      grid: { ...get(gridSize) },
    };
    $project.pages[$project.activePageIndex] = page;
  }

  function loadPage($project: Project) {
    const page =
      $project.pages?.[$project.activePageIndex] ??
      structuredClone(pageTemplates.empty);

    pageName.set(page.name ?? "page");

    page.nodes.forEach((node: Node) => {
      let storeKeys: string[] = [];
      switch (node.type) {
        case "item":
          storeKeys = ["item"];
          break;
        default:
          return;
      }
      for (const key in node.data) {
        if (
          storeKeys.includes(key) &&
          !Object.hasOwn(node.data[key], "subscribe")
        ) {
          node.data[key] = writable(node.data[key]);
        }
      }
    });
    console.log("page being loaded:", page);
    reset();
    // Leave some time for the reset to happen. This prevents wierd
    // behaviour where some state is left behind from previous page
    setTimeout(() => {
      // TODO: set snapGrid
      gridSize.set(page.grid);
      nodes.set(page.nodes);
      edges.set(page.edges);

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
    pageName,
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
      $project.activePageIndex = $project.pages.length;
      $project.pages.push(structuredClone(pageTemplates[template]));
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

function removeStores(obj: any) {
  if (typeof obj === "object") {
    for (const key in obj) {
      try {
        obj[key] = get(obj[key]);
      } catch (err) {}
    }
  }
}