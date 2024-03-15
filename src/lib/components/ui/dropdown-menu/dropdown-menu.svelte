<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import { onMount } from "svelte";

  type $$Props = DropdownMenuPrimitive.Props;

  export let open: $$Props["open"] = undefined;

  const id = crypto.randomUUID();
  function close(event: CustomEvent<string>) {
    if (event.detail === id) return;
    open = false;
  }

  onMount(() => {
    window.addEventListener("custom-menu-close", close, false);
    return () => {
      window.removeEventListener("custom-menu-close", close);
    };
  });
</script>

<DropdownMenuPrimitive.Root
  onOpenChange={(o) => {
    if (o) {
      document.dispatchEvent(
        new CustomEvent("custom-menu-close", { detail: id }),
      );
    }
    $$props.onOpenChange?.(o);
  }}
  {...$$restProps}
  bind:open
>
  <slot />
</DropdownMenuPrimitive.Root>
