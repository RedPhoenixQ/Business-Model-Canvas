<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import { type NodeProps } from "@xyflow/svelte";
  import ItemIcon from "./ItemIcon.svelte";
  import { type ItemData } from ".";
  import { addHistoryEntry } from "$lib/project/history";
  import IconSearch from "./IconSearch.svelte";
  import * as Popover from "$lib/components/ui/popover";
  import * as Select from "$lib/components/ui/select";
  import { EditIcon } from "lucide-svelte";

  type $$Props = Pick<NodeProps<ItemData>, "data" | "id">;

  export let id: $$Props["id"];
  export let data: $$Props["data"];

  const iconBackground = [
    { label: "None", value: "none" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];
  const iconShape = [
    { label: "Square", value: "square" },
    { label: "Circle", value: "circle" },
  ];

  let from = data;
</script>

<Sheet.Root
  onOpenChange={(is_open) => {
    if (is_open) {
      from = structuredClone(data);
    } else {
      addHistoryEntry({
        type: "nodeData",
        to: structuredClone(data),
        from,
        id,
      });
    }
  }}
>
  <Sheet.Trigger><slot /></Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Edit item</Sheet.Title>
    </Sheet.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right">Name</Label>
        <Input
          id="name"
          type="text"
          class="col-span-3"
          bind:value={data.name}
        />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="icon" class="text-right">Icon Link</Label>
        <Input
          id="icon"
          type="url"
          class="col-span-2"
          bind:value={data.icon.src}
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
                  value === "circle" || value === "square" ? value : undefined;
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
            <IconSearch
              iconInfo={data.icon}
              on:iconSelected={(event) => {
                console.log("iconSelected", event.detail);
                if (!data) return;
                data.icon.src = event.detail.src;
              }}
            />
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
    <Sheet.Footer>
      <Sheet.Close asChild let:builder>
        <Button builders={[builder]} type="submit">Save changes</Button>
      </Sheet.Close>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
