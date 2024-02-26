<script lang="ts">
  import { cn } from "$lib/utils";
  import { Toolbar as ToolbarPrimitive } from "bits-ui";

  type $$Props = ToolbarPrimitive.Props;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<ToolbarPrimitive.Root
  class={cn(
    "shadow-mini flex h-10 w-fit min-w-max items-center justify-center rounded-lg border bg-background p-1",
    className,
  )}
  {...$$restProps}
>
  <slot />
</ToolbarPrimitive.Root>
