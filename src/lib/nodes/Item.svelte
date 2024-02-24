<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import {
    Handle,
    Position,
    type NodeProps,
    useSvelteFlow,
  } from "@xyflow/svelte";
  import { itemDetails, type ItemData } from "./items";
  import ItemIcon from "./ItemIcon.svelte";
  import CustomContextMenuTrigger from "../CustomContextMenuTrigger.svelte";
  import { addHistoryEntry } from "$lib/history";

  type $$Props = NodeProps<ItemData>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];
  export let selected: $$Props["selected"];

  const { deleteElements } = useSvelteFlow();

  async function deleteNode(id: string) {
    const deleted = await deleteElements({ nodes: [{ id }] });
    addHistoryEntry({
      type: "delete",
      nodes: deleted.deletedNodes,
      edges: deleted.deletedEdges,
    });
  }
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
    <ItemIcon src={data.icon} alt={data.name} />
  </div>

  <ContextMenu.Content>
    <ContextMenu.Label class="flex items-center gap-2">
      <div class="w-6">
        <ItemIcon src={data.icon} alt={data.name} />
      </div>
      <span class="text-center">{data.name}</span>
    </ContextMenu.Label>
    <ContextMenu.Separator />
    <ContextMenu.Item on:click={() => ($itemDetails = { id, data })}>
      Edit
    </ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item
      class="text-destructive data-[highlighted]:bg-destructive data-[highlighted]:text-destructive-foreground"
      on:click={() => {
        if (confirm("Are you sure?")) {
          console.log("deleting node", id, data);
          deleteNode(id);
        }
      }}>Delete</ContextMenu.Item
    >
  </ContextMenu.Content>
</CustomContextMenuTrigger>
