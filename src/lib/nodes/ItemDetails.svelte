<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import { useSvelteFlow } from "@xyflow/svelte";
  import ItemIcon from "./ItemIcon.svelte";
  import { itemDetails } from "./items";

  const { updateNodeData } = useSvelteFlow();

  function change() {
    if (!$itemDetails) return;
    updateNodeData($itemDetails.id, $itemDetails.data);
  }

  $: open = $itemDetails !== undefined;
</script>

<Sheet.Root
  bind:open
  onOpenChange={(is_open) => {
    if (!is_open && $itemDetails) {
      updateNodeData($itemDetails.id, $itemDetails.data);
      $itemDetails = undefined;
    }
  }}
>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Edit item</Sheet.Title>
    </Sheet.Header>
    {#if $itemDetails}
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input
            id="name"
            type="text"
            class="col-span-3"
            bind:value={$itemDetails.data.name}
            on:change={change}
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="icon" class="text-right">Icon Link</Label>
          <Input
            id="icon"
            type="url"
            class="col-span-2"
            bind:value={$itemDetails.data.icon}
            on:change={change}
          />
          <ItemIcon src={$itemDetails.data.icon} alt={$itemDetails.data.name} />
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
