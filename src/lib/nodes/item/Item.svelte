<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import {
    Handle,
    Position,
    type NodeProps,
    useSvelteFlow,
  } from "@xyflow/svelte";
  import { itemDetails, type ItemData } from ".";
  import ItemIcon from "./ItemIcon.svelte";
  import CustomContextMenuTrigger from "../../CustomContextMenuTrigger.svelte";
  import { addHistoryEntry } from "$lib/project/history";

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

  <ItemContextMenu {data} {id} />
</CustomContextMenuTrigger>
