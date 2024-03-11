<script lang="ts">
  import { PlusIcon } from "lucide-svelte";
  import PageMenu from "./PageMenu.svelte";
  import { buttonVariants, Button } from "../components/ui/button";
  import { useProject } from ".";
  import { pageTemplates } from "./templates";
  import * as Dropdown from "../components/ui/dropdown-menu";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{ pageSwap: undefined }>();

  const { project, page: activePage, swapActivePage, addPage } = useProject();

  function pageFromTemplate(template: string) {
    if (!Object.keys(pageTemplates).includes(template)) return;
    addPage(template as keyof typeof pageTemplates);
  }

  let prevPage = $project.activePageIndex;
  $: if ($project.activePageIndex !== prevPage) {
    prevPage = $project.activePageIndex;
    dispatch("pageSwap");
  }
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
            bind:textContent={$activePage.name}
            on:keypress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
              }
            }}
          >
            {page.name}
          </span>
          <PageMenu {i} />
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
          <PageMenu {i} />
        </Button>
      {/if}
    </li>
  {/each}
  <li>
    <Dropdown.Root>
      <Dropdown.Trigger
        class={buttonVariants({ variant: "secondary", size: "icon" })}
      >
        <PlusIcon />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Label>Templates</Dropdown.Label>
        {#each Object.keys(pageTemplates) as template}
          <Dropdown.Item
            class="capitalize"
            on:click={() => pageFromTemplate(template)}
          >
            {template.replaceAll("-", " ")}
          </Dropdown.Item>
        {/each}
      </Dropdown.Content>
    </Dropdown.Root>
  </li>
</ul>
