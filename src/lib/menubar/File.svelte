<script lang="ts">
  import {
    useEdges,
    useNodes,
    useSvelteFlow,
    type Node,
    useStore,
  } from "@xyflow/svelte";
  import * as Menubar from "$lib/components/ui/menubar";
  import { get, writable } from "svelte/store";
  import { segmentColumns, segmentRows } from "../segments";

  const { toObject, viewport } = useSvelteFlow();
  const { reset } = useStore();
  const nodes = useNodes();
  const edges = useEdges();

  function save(): string {
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
    return json;
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
</script>

<Menubar.Menu>
  <Menubar.Trigger>File</Menubar.Trigger>
  <Menubar.Content class="min-w-fit">
    <Menubar.Item
      on:click={() => {
        const input = prompt("input");
        if (input === null) return;
        load(input);
      }}>Open</Menubar.Item
    >
    <Menubar.Item on:click={() => navigator.clipboard.writeText(save())}>
      Copy to Clipboard
    </Menubar.Item>
    <Menubar.Item on:click={download_file}>Download</Menubar.Item>
  </Menubar.Content>
</Menubar.Menu>
<!-- <Button on:click={save}>Save</Button>
<Button on:click={load}>Load</Button> -->
