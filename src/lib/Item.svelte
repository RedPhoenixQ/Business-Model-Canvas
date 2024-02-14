<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import {
    Handle,
    Position,
    type NodeProps,
    useNodes,
    useEdges,
    useSvelteFlow,
  } from "@xyflow/svelte";
  import type { Writable } from "svelte/store";
  import { itemDetails, type Item } from "./items";
  import ItemIcon from "./ItemIcon.svelte";
  import CustomContextMenuTrigger from "./CustomContextMenuTrigger.svelte";

  type $$Props = NodeProps<{
    item: Writable<Item>;
  }>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];
  export let selected: $$Props["selected"];

  const { item } = data;

  const { deleteElements } = useSvelteFlow();
  const nodes = useNodes();
  const edges = useEdges();
</script>

<CustomContextMenuTrigger>
  <div class="aspect-square w-10 {selected ? 'scale-125' : ''}">
    <Handle
      type="target"
      onconnect={(connections) => {
        console.log(connections);
      }}
      position={Position.Top}
    />
    <Handle
      type="source"
      onconnect={(connections) => {
        console.log(connections);
      }}
      position={Position.Bottom}
    />
    <ItemIcon src={$item.icon} alt={$item.name} />
  </div>

  <ContextMenu.Content>
    <ContextMenu.Label class="flex items-center gap-2">
      <div class="w-6">
        <ItemIcon src={$item.icon} alt={$item.name} />
      </div>
      <span class="text-center">{$item.name}</span>
    </ContextMenu.Label>
    <ContextMenu.Separator />
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
          console.log("deleting node", id, $item);
          deleteElements({ nodes: [{ id }] });
        }
      }}>Delete</ContextMenu.Item
    >
  </ContextMenu.Content>
</CustomContextMenuTrigger>
