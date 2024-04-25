<script lang="ts">
  import type { SectionInfo } from "./content";

  export let sections: SectionInfo[];

  console.log(sections);
</script>

<ul class="list-disc pl-6">
  {#each sections as { id, heading, children }}
    <li>
      <a href="#{id}">{heading}</a>
      {#if children}
        <svelte:self sections={children} />
      {/if}
    </li>
  {/each}
</ul>
