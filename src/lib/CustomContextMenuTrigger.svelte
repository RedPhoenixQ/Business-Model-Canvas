<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";

  let open = false;
</script>

<ContextMenu.Root bind:open>
  <ContextMenu.Trigger
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
  <slot name="content">
    <ContextMenu.Content>
      <ContextMenu.Item>No content added</ContextMenu.Item>
    </ContextMenu.Content>
  </slot>
</ContextMenu.Root>
