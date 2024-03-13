<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import type { XYPosition } from "@xyflow/svelte";
  import type { CustomEventHandler } from "bits-ui";

  let open = false;

  export let opened_at: XYPosition = { x: 0, y: 0 };

  function handleContextMenu(event: CustomEventHandler<MouseEvent>) {
    console.log(event);
    if (event.detail.originalEvent.defaultPrevented) {
      event.preventDefault();
      open = false;
    }
    opened_at.x = event.detail.originalEvent.clientX;
    opened_at.y = event.detail.originalEvent.clientY;
    event.detail.originalEvent.preventDefault();
  }
</script>

<ContextMenu.Root bind:open>
  <ContextMenu.Trigger
    {...$$restProps}
    on:contextmenu={(event) => {
      // @ts-expect-error: ContextMenu event is improperly typed, typed Event and not PointerEvent
      handleContextMenu(event);
    }}
  >
    <slot />
  </ContextMenu.Trigger>
</ContextMenu.Root>
