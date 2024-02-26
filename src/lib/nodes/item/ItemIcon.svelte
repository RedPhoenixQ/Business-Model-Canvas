<script lang="ts">
  import type { ItemIconInfo } from ".";

  export let icon: ItemIconInfo;
  export let alt = "";
</script>

{#if icon?.src}
  <div
    class="flex aspect-square items-center justify-center
    {icon.shape === 'circle' ? 'rounded-full' : 'rounded'}
     {icon.background !== undefined
      ? icon.background === 'dark'
        ? 'bg-black'
        : 'bg-white'
      : ''}"
  >
    <img class="w-full" src={icon.src} {alt} />
  </div>
{:else}
  <svg
    class="aspect-square stroke-black dark:stroke-white
    {icon.shape === 'circle' ? 'rounded-full' : 'rounded'}
    {icon.background !== undefined
      ? icon.background === 'dark'
        ? 'bg-black'
        : 'bg-white'
      : ''}"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke-width="8">
      <ellipse ry="40" rx="40" cy="50" cx="50" fill="none" />
      <line transform="rotate(-45 51.5 50.5)" y2="12" x2="51" y1="89" x1="52" />
    </g>
  </svg>
{/if}
