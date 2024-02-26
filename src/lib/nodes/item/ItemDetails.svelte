<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import { useSvelteFlow } from "@xyflow/svelte";
  import ItemIcon from "./ItemIcon.svelte";
  import { itemDetails, type ItemData } from ".";
  import { addHistoryEntry } from "$lib/project/history";

  const { updateNodeData } = useSvelteFlow();

  function change() {
    if (
      !$itemDetails ||
      !data ||
      !Object.entries(data).some(
        ([k, v]) => $itemDetails?.data[k as keyof ItemData] !== v,
      )
    ) {
      console.debug(
        "Change called but no values where changed",
        $itemDetails?.data,
        data,
      );
      return;
    }
    $itemDetails.data = data;
    const id = $itemDetails.id;
    updateNodeData(id, (node) => {
      if (!data) return;
      console.log(data === node.data);
      addHistoryEntry({
        type: "nodeData",
        id,
        from: structuredClone(node.data),
        to: structuredClone(data),
      });
      return data;
    });
  }

  // Create a copy to save previous values for history
  let data: ItemData | undefined;
  $: if ($itemDetails) {
    if (!data) data = structuredClone($itemDetails.data);
  } else {
    data = undefined;
  }

  $: open = $itemDetails !== undefined;
</script>

<Sheet.Root
  bind:open
  onOpenChange={(is_open) => {
    if (!is_open && $itemDetails) {
      change();
      $itemDetails = undefined;
    }
  }}
>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Edit item</Sheet.Title>
    </Sheet.Header>
    {#if data}
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input
            id="name"
            type="text"
            class="col-span-3"
            bind:value={data.name}
            on:change={change}
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="icon" class="text-right">Icon Link</Label>
          <Input
            id="icon"
            type="url"
            class="col-span-2"
            bind:value={data.icon.src}
            on:change={change}
          />
          <ItemIcon icon={data.icon} alt={data.name} />
        </div>
      </div>
    {:else}
      <div>These is no item to edit...</div>
    {/if}
    <Sheet.Footer>
      <Sheet.Close asChild let:builder>
        <Button builders={[builder]} type="submit">Save changes</Button>
      </Sheet.Close>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
