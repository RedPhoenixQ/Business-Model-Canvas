<script lang="ts">
  import { type NodeProps } from "@xyflow/svelte";
  import Slider from "$lib/components/ui/slider/slider.svelte";
  import MaleIcon from "./MaleIcon.svelte";
  import FemaleIcon from "./FemaleIcon.svelte";

  type $$Props = NodeProps<{}>;

  export let id: $$Props["id"];
  export let data: $$Props["data"];
</script>

<div class="grid gap-2" style:grid-template-columns="auto 1fr auto">
  <MaleIcon />
  <Slider value={[50]} min={0} max={100} class="w-24" />
  <FemaleIcon />
</div>
