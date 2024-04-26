<script lang="ts">
  import type { SectionInfo } from "./content";

  export let sections: SectionInfo[];
  export let level = 1;

  console.log(sections);
</script>

<ul class="list-disc pl-6 {level === 2 ? 'text-sm' : ''}">
  {#each sections as { id, heading, children }}
    <li>
      <a class="hover:underline" href="#{id}">{heading}</a>
      {#if children}
        <svelte:self sections={children} level={level + 1} />
      {/if}
    </li>
  {/each}
</ul>
