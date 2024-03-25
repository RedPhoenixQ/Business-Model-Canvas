<svelte:options immutable={true} />

<script lang="ts">
  import { cn } from "$lib/utils";
  import { predefinedIcons, type IconInfo } from "./index";

  export let icon: IconInfo;
  export let alt = "";

  // Used to stop type error from not having $$restProps typed
  $: restProps = $$restProps as object;
</script>

{#if icon.default}
  <svelte:component this={predefinedIcons[icon.default]} {...restProps} />
{:else if icon.src}
  <div
    class={cn(
      "flex aspect-square items-center justify-center",
      icon.shape === "circle" ? "rounded-full" : "rounded",
      icon.background !== undefined
        ? icon.background === "dark"
          ? "bg-black"
          : "bg-white"
        : "",
      $$restProps.class,
    )}
  >
    <img class="w-full" src={icon.src} {alt} />
  </div>
{:else}
  <svg
    class={cn(
      "aspect-square stroke-black dark:stroke-white",
      icon.shape === "circle" ? "rounded-full" : "rounded",
      icon.background !== undefined
        ? icon.background === "dark"
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
