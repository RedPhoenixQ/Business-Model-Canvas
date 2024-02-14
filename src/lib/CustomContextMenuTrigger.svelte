<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";

  let open = false;
</script>

<ContextMenu.Root bind:open>
  <ContextMenu.Trigger
    {...$$restProps}
    on:contextmenu={(event) => {
      // @ts-ignore: ContextMenu event is improperly typed
      if (event.detail.originalEvent.defaultPrevented) {
        event.preventDefault();
        open = false;
      }
      // @ts-ignore: ContextMenu event is improperly typed
      event.detail.originalEvent.preventDefault();
    }}
  >
    <slot />
  </ContextMenu.Trigger>
</ContextMenu.Root>
