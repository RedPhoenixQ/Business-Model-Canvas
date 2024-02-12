<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import { itemDetails, type Item, items } from ".";

  let open: boolean;
  $: item = $itemDetails ? $items.get($itemDetails) : undefined;
  $: open = item !== undefined;

  $: console.log(item, open);
</script>

<Sheet.Root
  bind:open
  onOpenChange={(is_open) => {
    if (!is_open) {
      $itemDetails = undefined;
    }
  }}
>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Edit item</Sheet.Title>
    </Sheet.Header>
    {#if item}
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input id="name" bind:value={item.name} class="col-span-3" />
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
