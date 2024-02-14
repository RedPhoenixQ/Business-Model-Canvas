<script lang="ts">
  import {
    useEdges,
    useNodes,
    useSvelteFlow,
    type Node,
    useStore,
  } from "@xyflow/svelte";
  import Button from "./components/ui/button/button.svelte";
  import { get, writable } from "svelte/store";
  import { segmentColumns, segmentRows } from "./segments";

  const { toObject, viewport } = useSvelteFlow();
  const { reset } = useStore();
  const nodes = useNodes();
  const edges = useEdges();

  function save() {
    const flowData = toObject();

    console.log();

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
        columns: $segmentColumns,
        rows: $segmentRows,
      },
    });
    navigator.clipboard.writeText(json);
    console.log("Save data copied to clipboard");
  }

  function load() {
    const input = prompt("input");
    if (input === null) return;
    // TODO: Handle parse error
    const flowData = JSON.parse(input);
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
</script>

<Button on:click={save}>Save</Button>
<Button on:click={load}>Load</Button>
