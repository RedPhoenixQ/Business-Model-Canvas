<svelte:options immutable />

<script lang="ts">
  import type { SectionInfo } from "./content";

  export let sections: SectionInfo[];
  export let level = 1;

  $: headingElement = `h${level}`;
</script>

{#each sections as { id, heading, content, children }}
  <section class="!mb-8 space-y-2">
    <svelte:element this={headingElement} {id}>{heading}</svelte:element>
    {#if content}
      <svelte:component this={content} />
    {/if}
    {#if children}
      <svelte:self sections={children} level={level + 1} />
    {/if}
  </section>
{/each}
