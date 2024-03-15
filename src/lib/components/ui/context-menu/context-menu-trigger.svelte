<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
  import { createEventDispatcher, getContext } from "svelte";

  type $$Props = ContextMenuPrimitive.TriggerProps;
  type $$Event = ContextMenuPrimitive.TriggerEvents;

  const dispatch = createEventDispatcher();

  const rootId: string = getContext("custom-context-menu-id");
</script>

<ContextMenuPrimitive.Trigger
  {...$$restProps}
  on:pointerdown
  on:contextmenu={(event) => {
    if (event.detail.originalEvent.defaultPrevented) {
      event.preventDefault();
    } else {
      document.dispatchEvent(
        new CustomEvent("custom-menu-close", { detail: rootId }),
      );
    }
    dispatch("contextmenu", event.detail);
  }}
>
  <slot />
</ContextMenuPrimitive.Trigger>
