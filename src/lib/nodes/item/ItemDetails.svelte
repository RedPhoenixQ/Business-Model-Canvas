<script lang="ts">
  import IconPopover from "./IconPopover.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import { type NodeProps } from "@xyflow/svelte";
  import ItemIcon from "./ItemIcon.svelte";
  import { type ItemData } from ".";
  import { addHistoryEntry } from "$lib/project/history";
  import { EditIcon } from "lucide-svelte";

  type $$Props = Pick<NodeProps<ItemData>, "data" | "id">;

  export let id: $$Props["id"];
  export let data: $$Props["data"];

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
    <Sheet.Header class="mb-6">
      <Sheet.Title>Edit item</Sheet.Title>
    </Sheet.Header>
    <div class="space-y-6">
      <div class="flex items-center gap-4">
        <IconPopover
          bind:data
          class="group relative size-20 flex-none rounded border p-2"
        >
          <ItemIcon icon={data.icon} alt={data.name} />
          <EditIcon
            class="absolute right-1 top-1 text-white opacity-50 group-hover:opacity-100"
            size="20"
          />
        </IconPopover>
        <Label class="w-full space-y-2">
          <span> Name </span>
          <Input type="text" class="col-span-3" bind:value={data.name} />
        </Label>
      </div>
    </div>
  </Sheet.Content>
</Sheet.Root>
