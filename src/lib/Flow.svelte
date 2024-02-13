<script lang="ts">
  import { writable } from "svelte/store";
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    type SnapGrid,
    type Node,
    type Edge,
  } from "@xyflow/svelte";

  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import "@xyflow/svelte/dist/style.css";
  import FlowItem from "./FlowItem.svelte";

  const nodeTypes = {
    item: FlowItem,
  };

  // We are using writables for the nodes and edges to sync them easily. When a user drags a node for example, Svelte Flow updates its position.
  const nodes = writable([
    {
      id: "1",
      type: "input",
      data: { label: "Input Node" },
      position: { x: 0, y: 0 },
    },
    {
      id: "2",
      type: "item",
      data: {
        label: "Node",
        item: writable({
          name: "steam",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
        }),
      },
      position: { x: 0, y: 150 },
    },
    {
      id: "3",
      type: "item",
      data: {
        label: "Node",
        item: writable({
          name: "steam",
        }),
      },
      position: { x: 100, y: 150 },
    },
  ] as Node[]);

  // same for edges
  const edges = writable([
    {
      id: "1-2-test",
      type: "default",
      source: "1",
      target: "2",
      label: "Edge Text",
      hidden: true,
    },
    {
      id: "1-3-test",
      type: "default",
      source: "1",
      target: "3",
      label: "Edge Text 2",
      hidden: true,
    },
  ] as Edge[]);

  const snapGrid: SnapGrid = [25, 25];
</script>

<!--
  👇 By default, the Svelte Flow container has a height of 100%.
  This means that the parent container needs a height to render the flow.
  -->
<div style:height="500px">
  <SvelteFlow
    {nodes}
    {edges}
    {snapGrid}
    {nodeTypes}
    fitView
    colorMode="dark"
    on:paneclick={() => {
      for (const edge of $edges) {
        edge.hidden = true;
      }
      $edges = $edges;
    }}
    on:nodeclick={(event) => {
      console.log("on node click", event.detail.node);
      const id = event.detail.node.id;
      for (const edge of $edges) {
        edge.hidden = !(edge.source === id || edge.target === id);
      }
      $edges = $edges;
    }}
  >
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
    <MiniMap />
  </SvelteFlow>
</div>
