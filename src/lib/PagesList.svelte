<script lang="ts">
  import PageMenu from "./PageMenu.svelte";
  import { buttonVariants, Button } from "./components/ui/button";
  import { useProject } from "./project";

  const { project, pageName, swapActivePage, addPage } = useProject();
</script>

<ul
  class="pointer-events-auto absolute bottom-0 left-0 right-0 z-10 mx-auto flex w-min max-w-[70vw] gap-2 overflow-x-auto"
>
  {#each $project.pages as page, i}
    <li>
      {#if $project.activePageIndex === i}
        <div
          class={buttonVariants({
            variant: "default",
            class: "justify-between p-2",
          })}
        >
          <span
            class="p-2"
            role="textbox"
            tabindex="0"
            contenteditable="plaintext-only"
            bind:textContent={$pageName}
            on:keypress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
              }
            }}
          >
            {page.name}
          </span>
          <PageMenu {i} {page} />
        </div>
      {:else}
        {@const name = page.name ?? "page"}
        <Button
          variant="secondary"
          class="justify-between p-2"
          on:click={() => swapActivePage(i)}
        >
          <span class="p-2">
            {name}
          </span>
          <PageMenu {i} {page} />
        </Button>
      {/if}
    </li>
  {/each}
  <li>
    <Button variant="secondary" on:click={() => addPage()}>+</Button>
  </li>
</ul>
