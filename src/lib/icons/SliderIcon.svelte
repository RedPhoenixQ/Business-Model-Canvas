<svelte:options immutable={true} />

<script lang="ts">
  export let size = 24;
  export let strokeWidth = 2;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  height={size}
  viewBox="0 0 24 24"
  width={size}
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  {...$$restProps}
>
  <line x1="2" y1="12" x2="22" y2="12" />
  <circle cx="12" cy="12" r="2" />
</svg>
