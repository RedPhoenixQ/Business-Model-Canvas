<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
  import { onMount, setContext } from "svelte";

  type $$Props = ContextMenuPrimitive.Props;

  export let open: $$Props["open"] = undefined;

  const id = crypto.randomUUID();
  function close(event: CustomEvent<string>) {
    if (event.detail === id) return;
    open = false;
  }
  setContext("custom-context-menu-id", id);

  onMount(() => {
    document.addEventListener("custom-menu-close", close, false);
    return () => {
      document.removeEventListener("custom-menu-close", close);
    };
  });
</script>

<ContextMenuPrimitive.Root {...$$props} bind:open>
  <slot />
</ContextMenuPrimitive.Root>
