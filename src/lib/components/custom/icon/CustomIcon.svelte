<svelte:options immutable={true} />

<script lang="ts">
  import { cn } from "$lib/utils";
  import type { IconInfo } from "./index";

  export let icon: IconInfo;
  export let alt = "";
</script>

{#if icon?.iconSrc}
  <div
    class={cn(
      "flex aspect-square items-center justify-center",
      icon.iconShape === "circle" ? "rounded-full" : "rounded",
      icon.iconBackground !== undefined
        ? icon.iconBackground === "dark"
          ? "bg-black"
          : "bg-white"
        : "",
      $$restProps.class,
    )}
  >
    <img class="w-full" src={icon.iconSrc} {alt} />
  </div>
{:else}
  <svg
    class={cn(
      "aspect-square stroke-black dark:stroke-white",
      icon.iconShape === "circle" ? "rounded-full" : "rounded",
      icon.iconBackground !== undefined
        ? icon.iconBackground === "dark"
          ? "bg-black"
          : "bg-white"
        : "",
      $$restProps.class,
    )}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke-width="8">
      <ellipse ry="40" rx="40" cy="50" cx="50" fill="none" />
      <line transform="rotate(-45 51.5 50.5)" y2="12" x2="51" y1="89" x1="52" />
    </g>
  </svg>
{/if}
