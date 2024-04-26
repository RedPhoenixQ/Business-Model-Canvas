<script lang="ts">
  import { useCopy, usePaste } from ".";
  import { useNodes } from "@xyflow/svelte";

  const paste = usePaste();
  const { copy, cut } = useCopy();

  const nodes = useNodes();

  const mousePos = { x: 0, y: 0 };

  let holdingShift = false;
</script>

<svelte:window
  on:keydown={(event) => (holdingShift = event.shiftKey)}
  on:keyup={(event) => (holdingShift = event.shiftKey)}
  on:mousemove={(event) => {
    mousePos.x = event.pageX;
    mousePos.y = event.pageY;
  }}
  on:paste|preventDefault={() => paste(mousePos, !holdingShift)}
  on:copy|preventDefault={() => copy($nodes.filter((node) => node.selected))}
  on:cut|preventDefault={() => cut($nodes.filter((node) => node.selected))}
/>
