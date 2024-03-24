<script lang="ts">
  import { useCopy, usePaste } from ".";
  import { isInputElement } from "$lib/utils";
  import { useNodes, type Node } from "@xyflow/svelte";

  const paste = usePaste();
  const { copy, cut } = useCopy();

  const nodes = useNodes();

  const mousePos = { x: 0, y: 0 };

  function findSelectedNode(): Node | undefined {
    const selected = $nodes.filter((node) => node.selected);
    if (selected.length !== 1) {
      // TODO: Inform user about this warning
      console.warn("Can only handle one selected node for copy/paste");
      return;
    }
    return selected[0];
  }
</script>

<svelte:window
  on:mousemove={(event) => {
    mousePos.x = event.pageX;
    mousePos.y = event.pageY;
  }}
  on:paste={(event) => {
    console.log(event);
    // @ts-expect-error: event.target will be a HTMLElement
    if (event.defaultPrevented || isInputElement(event.target)) return;
    event.preventDefault();
    paste(mousePos);
  }}
  on:copy={(event) => {
    // @ts-expect-error: event.target will be a HTMLElement
    if (event.defaultPrevented || isInputElement(event.target)) return;
    const node = findSelectedNode();
    if (node) {
      event.preventDefault();
      copy(node.id);
    }
  }}
  on:cut={(event) => {
    // @ts-expect-error: event.target will be a HTMLElement
    if (event.defaultPrevented || isInputElement(event.target)) return;
    event.preventDefault();
    const node = findSelectedNode();
    if (node) {
      event.preventDefault();
      cut(node.id);
    }
  }}
/>
