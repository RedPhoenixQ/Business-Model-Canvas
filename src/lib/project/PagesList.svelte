<script lang="ts">
  import { PlusIcon } from "lucide-svelte";
  import PageMenu from "./PageMenu.svelte";
  import { buttonVariants, Button } from "../components/ui/button";
  import { useProject, projectStore, pageStore } from ".";
  import { pageTemplates } from "../info/templates";
  import * as Dropdown from "../components/ui/dropdown-menu";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{ pageSwap: undefined }>();

  const { swapActivePage, addPage } = useProject();

  function pageFromTemplate(template: string, preset?: string) {
    if (!pageTemplates?.[template as keyof typeof pageFromTemplate]) return;
    addPage(template as keyof typeof pageTemplates, preset);
  }

  let prevPage = $projectStore.activePageIndex;
  $: if ($projectStore.activePageIndex !== prevPage) {
    prevPage = $projectStore.activePageIndex;
    dispatch("pageSwap");
  }

  let open = false;
</script>

<ul
  class="pointer-events-auto absolute bottom-0 left-0 right-0 z-10 mx-auto flex w-min max-w-[70vw] gap-2 overflow-x-auto"
>
  {#each $projectStore.pages as page, i}
    <li>
      {#if $projectStore.activePageIndex === i}
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
            bind:textContent={$pageStore.name}
            on:keypress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
              }
            }}
            on:selectstart|stopPropagation={() => {}}
          >
            {page.data.name}
          </span>
          <PageMenu {page} {i} />
        </div>
      {:else}
        {@const name = page.data.name ?? "page"}
        <Button
          variant="secondary"
          class="justify-between p-2"
          on:click={() => swapActivePage(i)}
        >
          <span class="p-2">
            {name}
          </span>
          <PageMenu {page} {i} />
        </Button>
      {/if}
    </li>
  {/each}
  <li>
    <Dropdown.Root bind:open>
      <Dropdown.Trigger
        class={buttonVariants({ variant: "secondary", size: "icon" })}
      >
        <PlusIcon />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Label>Templates</Dropdown.Label>
        {#each Object.entries(pageTemplates) as [templateName, template]}
          {@const presets = template[1]}
          {#if Object.keys(presets).length > 0}
            <Dropdown.Sub>
              <Dropdown.SubTrigger
                class="gap-2"
                on:click={() => {
                  open = false;
                  pageFromTemplate(templateName);
                }}
              >
                {templateName}
              </Dropdown.SubTrigger>
              <Dropdown.SubContent>
                <Dropdown.Label>Presets</Dropdown.Label>
                <Dropdown.Separator />
                {#each Object.keys(presets) as presetName}
                  <Dropdown.Item
                    class="gap-2"
                    on:click={() => pageFromTemplate(templateName, presetName)}
                  >
                    {presetName}
                  </Dropdown.Item>
                {/each}
              </Dropdown.SubContent>
            </Dropdown.Sub>
          {:else}
            <Dropdown.Item
              class="gap-2"
              on:click={() => pageFromTemplate(templateName)}
            >
              {templateName}
            </Dropdown.Item>
          {/if}
        {/each}
      </Dropdown.Content>
    </Dropdown.Root>
  </li>
</ul>
