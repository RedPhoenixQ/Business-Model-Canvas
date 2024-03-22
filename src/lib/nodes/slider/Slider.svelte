<script lang="ts">
  import { type NodeProps } from "@xyflow/svelte";
  import Slider from "$lib/components/ui/slider/slider.svelte";
  import MaleIcon from "../../icons/MaleIcon.svelte";
  import FemaleIcon from "../../icons/FemaleIcon.svelte";
  import { addHistoryEntry } from "$lib/project/history";
  import type { SliderData } from ".";
  import ConnectionHandles from "../ConnectionHandles.svelte";

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
</script>

<div class="group grid gap-2 pt-2" style:grid-template-columns="auto 1fr auto">
  <ConnectionHandles />
  <MaleIcon />
  <Slider
    bind:value={data.value}
    min={0}
    max={100}
    step={1}
    {onValueChange}
    class="w-24"
  />
  <FemaleIcon />
</div>
