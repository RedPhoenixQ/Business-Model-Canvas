<script lang="ts">
  import { IconPopover, CustomIcon } from "$lib/components/custom/icon";
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
  import { type ItemData } from ".";
  import {
    EditIcon,
    ArrowLeftFromLineIcon,
    ArrowRightToLineIcon,
    XIcon,
    PlusIcon,
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

<svelte:window on:item-details-open={(event) => (open = event.detail === id)} />

<Sheet.Root portal="#itemDetailsPortal" bind:open>
  {#if $$slots.default}
    <Sheet.Trigger><slot /></Sheet.Trigger>
  {/if}
  <Sheet.Content
    side="right"
    class="grid p-4"
    style="grid-template-rows: auto 1fr;"
  >
    <Sheet.Header class="px-2">
      <Sheet.Title>Edit item</Sheet.Title>
    </Sheet.Header>
    <div class="space-y-4 overflow-y-auto p-2">
      <div class="flex items-center gap-4">
        <IconPopover
          bind:icon={data}
          class="group relative size-20 flex-none rounded border p-2"
          on:change={(event) => dispatch("change", event.detail)}
        >
          <CustomIcon icon={data} alt={data.name} />
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
      <Label class="block w-full space-y-2">
        <span>Description</span>
        <Textarea
          bind:value={data.description}
          on:change={() => dispatch("change", "description")}
        />
      </Label>
      {#if data.impactText === undefined}
        <Button
          variant="ghost"
          class="text-muted-foreground"
          on:click={() => (data.impactText = "")}
        >
          <PlusIcon />
          Add impact description
        </Button>
      {:else}
        <Label class="block w-full space-y-2">
          <span> Impact </span>
          <div class="flex items-center gap-2">
            <Textarea
              bind:value={data.impactText}
              on:change={() => dispatch("change", "description")}
            />
            <Button
              variant="destructive"
              size="icon"
              class="aspect-square"
              on:click={() => (data.impactText = undefined)}
            >
              <XIcon />
            </Button>
          </div>
        </Label>
      {/if}
      <div class="space-y-4 text-sm font-medium leading-none">
        <span>Connections</span>
        <div class="space-y-4">
          {#each connections as connection}
            {@const selfIsSource = connection.source === id}
            {@const node = getNode(
              selfIsSource ? connection.target : connection.source,
            )}
            {#if node && node.data}
              <div class="flex items-center gap-2">
                <div class="w-12">
                  {#if node?.data}
                    <button
                      on:click={() => {
                        window.dispatchEvent(
                          new CustomEvent("item-details-open", {
                            detail: node.id,
                          }),
                        );
                      }}
                    >
                      <CustomIcon icon={node?.data} />
                    </button>
                  {:else if node.type === "slider"}
                    <span>Slider</span>
                  {:else if node.type === "customGroup"}
                    <span>Group</span>
                  {/if}
                </div>
                <Label class="flex-1 space-y-1">
                  <span>
                    {#if selfIsSource}
                      <ArrowLeftFromLineIcon size={16} class="inline" />
                    {:else}
                      <ArrowRightToLineIcon size={16} class="inline" />
                    {/if}
                    {node.data.name}{node.parentNode
                      ? ` - ${node.parentNode}`
                      : ""}
                  </span>
                  <Input
                    value={connection.label}
                    placeholder="Add connection label..."
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
                </Label>
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
