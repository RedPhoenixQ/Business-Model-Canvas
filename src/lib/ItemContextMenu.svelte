<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import type { Writable } from "svelte/store";
  import { itemDetails, type Item } from "./items";
  import CustomContextMenuTrigger from "./CustomContextMenuTrigger.svelte";
  import { useEdges, useNodes, type NodeProps } from "@xyflow/svelte";

  const nodes = useNodes();
  const edges = useEdges();

  export let data: NodeProps<Writable<Item>>;
  $: item = data.data;

  function deleteNode() {
    console.log("delete", data);
    $nodes = $nodes.filter((node) => node.id !== data.id);
    $edges = $edges.filter(
      (edge) => edge.source !== data.id && edge.target !== data.id,
    );
  }
</script>

<CustomContextMenuTrigger>
  <slot />

  <ContextMenu.Content>
    <ContextMenu.Item
      on:click={() => {
        $itemDetails = item;
      }}>Edit</ContextMenu.Item
    >
    <ContextMenu.Separator />
    <ContextMenu.Item
      class="text-destructive data-[highlighted]:bg-destructive data-[highlighted]:text-destructive-foreground"
      on:click={() => {
        if (confirm("Are you sure?")) {
          deleteNode();
        }
      }}>Delete</ContextMenu.Item
    >
  </ContextMenu.Content>
</CustomContextMenuTrigger>
