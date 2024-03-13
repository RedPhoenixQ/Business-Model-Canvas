<script lang="ts">
  import IconPopover from "./IconPopover.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import {
    type NodeProps,
    type Node,
    getConnectedEdges,
    useEdges,
    useSvelteFlow,
  } from "@xyflow/svelte";
  import ItemIcon from "./ItemIcon.svelte";
  import { type ItemData } from ".";
  import {
    EditIcon,
    ArrowLeftFromLineIcon,
    ArrowRightToLineIcon,
    XIcon,
  } from "lucide-svelte";
  import { Textarea } from "$lib/components/ui/textarea";
  import { createEventDispatcher } from "svelte";
  import { addHistoryEntry } from "$lib/project/history";
  import Button from "$lib/components/ui/button/button.svelte";

  export let id: NodeProps<ItemData>["id"];
  export let data: NodeProps<ItemData>["data"];
  export let open = false;

  const dispatch = createEventDispatcher<{
    change: keyof ItemData;
  }>();

  const { getNode, deleteElements } = useSvelteFlow();
  const edges = useEdges();

  $: connections = getConnectedEdges([{ id } as Node], $edges);

  async function deleteConnection(id: string) {
    const deleted = await deleteElements({ edges: [{ id }] });
    addHistoryEntry({
      type: "delete",
      nodes: deleted.deletedNodes,
      edges: deleted.deletedEdges,
    });
  }
</script>

<Sheet.Root portal="#itemDetailsPortal" bind:open>
  {#if $$slots.default}
    <Sheet.Trigger><slot /></Sheet.Trigger>
  {/if}
  <Sheet.Content
    side="right"
    class="grid"
    style="grid-template-rows: auto 1fr;"
  >
    <Sheet.Header class="mb-6">
      <Sheet.Title>Edit item</Sheet.Title>
    </Sheet.Header>
    <div class="space-y-4 overflow-y-auto">
      <div class="flex items-center gap-4">
        <IconPopover
          bind:data
          class="group relative size-20 flex-none rounded border p-2"
          on:close={() => dispatch("change", "icon")}
        >
          <ItemIcon icon={data.icon} alt={data.name} />
          <EditIcon
            class="absolute right-1 top-1 text-white opacity-50 group-hover:opacity-100"
            size="20"
          />
        </IconPopover>
        <Label class="w-full space-y-2">
          <span> Name </span>
          <Input
            type="text"
            class="col-span-3"
            bind:value={data.name}
            on:change={() => dispatch("change", "name")}
          />
        </Label>
      </div>
      <div>
        <Label class="w-full space-y-2">
          <span>Description</span>
          <Textarea
            bind:value={data.description}
            on:change={() => dispatch("change", "description")}
          />
        </Label>
      </div>
      <div class="space-y-2 text-sm font-medium leading-none">
        <span>Connections</span>
        <div class="max-h-[50vh] space-y-2 overflow-y-auto py-2">
          {#each connections as connection}
            {@const selfIsSource = connection.source === id}
            {@const node = getNode(
              selfIsSource ? connection.target : connection.source,
            )}
            {#if node && node.data}
              <div class="flex items-center gap-2">
                <div class="w-12">
                  {#if node?.data?.icon}
                    <ItemIcon icon={node?.data?.icon} />
                  {:else if node.type === "slider"}
                    <span>Slider</span>
                  {:else if node.type === "customGroup"}
                    <span>Group</span>
                  {/if}
                </div>
                {#if selfIsSource}
                  <ArrowLeftFromLineIcon />
                {:else}
                  <ArrowRightToLineIcon />
                {/if}
                <Label class="flex-1">
                  <span>
                    {node.data.name}{node.parentNode
                      ? ` - ${node.parentNode}`
                      : ""}
                  </span>
                </Label>
                <Input
                  class="flex-1"
                  value={connection.label}
                  on:change={(event) => {
                    const edge = $edges.find(
                      (edge) => edge.id === connection.id,
                    );
                    if (!edge || !event.target) return;
                    // @ts-expect-error: event.target.value will exist
                    edge.label = event.target.value;
                    $edges = $edges;
                  }}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  on:click={() => deleteConnection(connection.id)}
                >
                  <XIcon />
                </Button>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </Sheet.Content>
</Sheet.Root>
