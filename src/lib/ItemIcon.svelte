<script lang="ts">
  export let src: string | undefined = undefined;
  export let alt = "";
</script>

{#if src}
  <img {src} {alt} />
{:else}
  <svg
    class="aspect-square w-10 stroke-black dark:stroke-white"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke-width="8">
      <ellipse ry="40" rx="40" cy="50" cx="50" fill="none" />
      <line transform="rotate(-45 51.5 50.5)" y2="12" x2="51" y1="89" x1="52" />
    </g>
  </svg>
{/if}
