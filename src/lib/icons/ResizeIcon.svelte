<svelte:options immutable={true} />

<script lang="ts">
  export let size = 24;
  export let strokeWidth = 2;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  height={size}
  viewBox="0 0 24 24"
  width={size}
  {...$$restProps}
  ><path
    d="m21 15-6 6m6-13-13 13"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width={strokeWidth}
  /></svg
>
