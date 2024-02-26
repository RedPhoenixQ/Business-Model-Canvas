<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import { useSvelteFlow } from "@xyflow/svelte";
  import ItemIcon from "./ItemIcon.svelte";
  import { itemDetails, type ItemData } from ".";
  import { addHistoryEntry } from "$lib/project/history";
  import IconSearch from "./IconSearch.svelte";
  import * as Popover from "$lib/components/ui/popover";
  import * as Select from "$lib/components/ui/select";
  import { EditIcon } from "lucide-svelte";

  const { updateNodeData } = useSvelteFlow();

  const iconBackground = [
    { label: "None", value: "none" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];
  const iconShape = [
    { label: "Square", value: "square" },
    { label: "Circle", value: "circle" },
  ];

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
          <Popover.Root>
            <Popover.Trigger class="relative rounded">
              <ItemIcon icon={data.icon} alt={data.name} />
              <div
                class="absolute right-0 top-0 flex h-full w-full items-center justify-center bg-muted/25 p-4 text-black opacity-0 transition-opacity hover:opacity-100"
              >
                <EditIcon class="text-white" />
              </div>
            </Popover.Trigger>
            <Popover.Content
              side="left"
              sideOffset={20}
              class="flex flex-col gap-4"
            >
              <div>Edit Icon</div>
              <Select.Root
                items={iconBackground}
                selected={iconBackground.find(
                  ({ value }) => value === data?.icon?.background,
                ) ?? iconBackground[0]}
                onSelectedChange={(selected) => {
                  if (!data || !selected) return;
                  const value = selected.value;
                  data.icon.background =
                    value === "light" || value === "dark" ? value : undefined;
                }}
              >
                <Select.Trigger>
                  <Select.Value class="capitalize" />
                </Select.Trigger>
                <Select.Content>
                  {#each iconBackground as { value, label }}
                    <Select.Item {value}>{label}</Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>
              <Select.Root
                items={iconShape}
                selected={iconShape.find(
                  ({ value }) => value === data?.icon?.shape,
                ) ?? iconShape[0]}
                onSelectedChange={(selected) => {
                  if (!data || !selected) return;
                  const value = selected.value;
                  data.icon.shape =
                    value === "circle" || value === "square"
                      ? value
                      : undefined;
                }}
              >
                <Select.Trigger>
                  <Select.Value class="capitalize" />
                </Select.Trigger>
                <Select.Content>
                  {#each iconShape as { value, label }}
                    <Select.Item {value}>{label}</Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>
            </Popover.Content>
          </Popover.Root>
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
