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
    document.addEventListener("custom-menu-close", close, false);
    return () => {
      document.removeEventListener("custom-menu-close", close);
    };
  });
</script>

<DropdownMenuPrimitive.Root
  {...$$props}
  onOpenChange={(o) => {
    if (o) {
      document.dispatchEvent(
        new CustomEvent("custom-menu-close", { detail: id }),
      );
    }
    $$props.onOpenChange?.();
  }}
  bind:open
>
  <slot />
</DropdownMenuPrimitive.Root>
