<svelte:options immutable={true} />

<script lang="ts">
  export let size = 24;
  export let strokeWidth = 2;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  height={size}
  width={size}
  viewBox="0 0 24 24"
  fill="currentColor"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class="lucide lucide-mouse"
  {...$$restProps}
>
  <rect x="5" y="2" width="14" height="20" rx="7" fill="none" />
  <path
    d="M 16.527 9.996 C 16.527 6.871 14.572 4.569 12 4.569 L 12 10 L 16.527 9.996 Z"
  />
</svg>
