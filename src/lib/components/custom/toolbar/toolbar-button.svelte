<script lang="ts">
  import { cn } from "$lib/utils";
  import { Toolbar as ToolbarPrimitive } from "bits-ui";

  type $$Props = ToolbarPrimitive.ButtonProps;
  type $$Events = ToolbarPrimitive.ButtonEvents;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<ToolbarPrimitive.Button
  class={cn(
    "inline-flex max-h-10 items-center justify-center rounded-lg px-3 py-2 text-foreground/80 transition-all hover:bg-muted focus-visible:bg-muted active:scale-95 active:bg-muted/50 disabled:pointer-events-none disabled:text-muted-foreground",
    className,
  )}
  {...$$restProps}
  on:keydown
  on:click
>
  <slot />
</ToolbarPrimitive.Button>
