<script lang="ts">
  import { type NodeProps } from "@xyflow/svelte";
  import Slider from "$lib/components/ui/slider/slider.svelte";
  import { addHistoryEntry } from "$lib/project/history";
  import type { SliderData } from ".";
  import ConnectionHandles from "../ConnectionHandles.svelte";
  import {
    CustomIcon,
    IconPopover,
    type IconInfo,
  } from "$lib/components/custom/icon";
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import SliderMenu from "./SliderMenu.svelte";

  type $$Props = NodeProps<SliderData>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];

  let from: SliderData;
  let timeout: number | undefined;
  function onValueChange() {
    if (timeout === undefined) {
      from = structuredClone(data);
    } else {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = undefined;
      console.debug("setting history", id, from, data);
      addHistoryEntry({
        type: "nodeData",
        id,
        from,
        to: structuredClone(data),
      });
    }, 1000);
  }

  function onIconChange(
    side: keyof Pick<SliderData, "leftIcon" | "rightIcon">,
    key: keyof IconInfo,
  ) {
    console.log(side, key);
    if (from?.[side]?.[key] === data?.[side]?.[key]) return;
    const to = structuredClone(data);
    addHistoryEntry({
      type: "nodeData",
      from,
      to,
      id,
    });
    from = to;
  }
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div
      class="group grid gap-2 pt-2"
      style:grid-template-columns="auto 1fr auto"
    >
      <SliderMenu type="context-menu" {id} />
      <ConnectionHandles />
      <IconPopover
        side="left"
        bind:icon={data.leftIcon}
        on:change={(event) => onIconChange("leftIcon", event.detail)}
      >
        <CustomIcon class="w-6" icon={data.leftIcon} />
      </IconPopover>
      <Slider
        bind:value={data.value}
        min={0}
        max={100}
        step={1}
        {onValueChange}
        class="w-24"
      />
      <IconPopover
        bind:icon={data.rightIcon}
        on:change={(event) => onIconChange("rightIcon", event.detail)}
      >
        <CustomIcon class="w-6" icon={data.rightIcon} />
      </IconPopover>
    </div>
  </ContextMenu.Trigger>
</ContextMenu.Root>
