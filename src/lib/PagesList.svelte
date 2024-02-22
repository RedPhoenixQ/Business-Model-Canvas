<script lang="ts">
  import { buttonVariants } from "./components/ui/button";
  import Button from "./components/ui/button/button.svelte";
  import { useProject } from "./project";

  const { project, pageName, swapActivePage, addPage, removePage } =
    useProject();

  //   let timeout: number | undefined;
  //   function handleInput() {
  //     if (timeout !== undefined) clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       timeout = undefined;
  //       updateName();
  //     }, 1000);
  //   }

  //   function updateName() {
  //     if (currentName) {
  //       console.warn("Cannot set name to empty");
  //     }
  //     $project.pages[$project.activePageIndex].name = currentName;
  //     console.log("Name updated to", currentName);
  //   }

  //   let currentName: string;
</script>

<ul
  class="pointer-events-auto absolute bottom-0 left-0 right-0 z-10 mx-auto flex w-min max-w-[70vw] gap-2 overflow-x-auto"
>
  {#each $project.pages as page, i}
    {@const isActive = $project.activePageIndex === i}
    <li>
      {#if $project.activePageIndex === i}
        <div
          class={buttonVariants({
            variant: isActive ? "default" : "secondary",
            class: "justify-between",
          })}
        >
          <Button variant="default" size="icon" on:click={() => removePage(i)}>
            X
          </Button>
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
        </div>
      {:else}
        {@const name = page.name ?? "page"}
        <Button
          variant="secondary"
          class="justify-between"
          on:click={() => swapActivePage(i)}
        >
          <Button variant="ghost" size="icon" on:click={() => removePage(i)}>
            X
          </Button>
          {name}
        </Button>
      {/if}
    </li>
  {/each}
  <li>
    <Button variant="secondary" on:click={() => addPage()}>+</Button>
  </li>
</ul>
