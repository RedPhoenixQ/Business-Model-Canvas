<script lang="ts">
  import { useCopy, usePaste } from ".";
  import { isInputElement } from "$lib/utils";
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
  on:paste={(event) => {
    console.log(event);
    // @ts-expect-error: event.target will be a HTMLElement
    if (event.defaultPrevented || isInputElement(event.target)) return;
    event.preventDefault();
    paste(mousePos, !holdingShift);
  }}
  on:copy={(event) => {
    // @ts-expect-error: event.target will be a HTMLElement
    if (event.defaultPrevented || isInputElement(event.target)) return;
    event.preventDefault();
    copy($nodes.filter((node) => node.selected));
  }}
  on:cut={(event) => {
    // @ts-expect-error: event.target will be a HTMLElement
    if (event.defaultPrevented || isInputElement(event.target)) return;
    event.preventDefault();
    cut($nodes.filter((node) => node.selected));
  }}
/>
