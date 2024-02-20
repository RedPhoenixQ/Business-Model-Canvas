import {
  useEdges,
  useNodes,
  useStore,
  useSvelteFlow,
  type Node,
} from "@xyflow/svelte";
import { segmentColumns, segmentRows } from "./segments";
import { get, writable } from "svelte/store";

export function useSave() {
  const { toObject, viewport } = useSvelteFlow();
  const { reset } = useStore();
  const nodes = useNodes();
  const edges = useEdges();

  function save(): string {
    const flowData = toObject();

    flowData.nodes.forEach((node) => {
      if (typeof node.data === "object") {
        for (const key in node.data) {
          try {
            node.data[key] = get(node.data[key]);
          } catch (err) {}
        }
      }
    });
    console.log(flowData);
    const json = JSON.stringify({
      ...flowData,
      grid: {
        columns: get(segmentColumns),
        rows: get(segmentRows),
      },
    });
    return json;
  }

  function saveToLocalStorage() {
    const json = save();
    localStorage.setItem("save", json);
  }

  function loadFromLocalStorage() {
    const json = localStorage.getItem("save");
    if (!json) return;
    try {
      load(json);
    } catch (err) {
      console.error(err);
    }
  }

  function download_file() {
    const blob = new Blob([save()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    // Create a one-time link element for downloading
    const dlink = document.createElement("a");
    // TODO: Get project name from somewere
    dlink.download = "Test name.json";
    dlink.href = url;
    dlink.click();
    dlink.remove();
    URL.revokeObjectURL(url);
  }

  function load(json: string) {
    // TODO: Handle parse error
    const flowData = JSON.parse(json);
    flowData.nodes.forEach((node: Node) => {
      let storeKeys: string[] = [];
      switch (node.type) {
        case "item":
          storeKeys = ["item"];
          break;
        default:
          return;
      }
      for (const key in node.data) {
        if (storeKeys.includes(key)) {
          node.data[key] = writable(node.data);
        }
      }
    });
    console.log(flowData);
    reset();
    segmentColumns.set(flowData.grid.columns);
    segmentRows.set(flowData.grid.rows);
    nodes.set(flowData.nodes);
    edges.set(flowData.edges);
    viewport.set(flowData.viewport);
  }
  return {
    save,
    load,
    download_file,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
}
