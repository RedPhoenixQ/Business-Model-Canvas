<script lang="ts">
  import {
    DownloadIcon,
    ClipboardCopyIcon,
    ClipboardPasteIcon,
    FileInputIcon,
    PlusIcon,
  } from "lucide-svelte/icons";
  import * as Menubar from "$lib/components/ui/menubar";
  import { useProject, projectStore } from "$lib/project/index";
  import { projectTemplates } from "$lib/info/templates";

  const { toJSON, fromJSON, newProject } = useProject();

  function downloadFile() {
    const blob = new Blob([toJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    // Create a one-time link element for downloading
    const dlink = document.createElement("a");
    // TODO: Get project name from somewere
    dlink.download = `${$projectStore.name ?? "unnamed"}.json`;
    dlink.href = url;
    dlink.click();
    dlink.remove();
    URL.revokeObjectURL(url);
  }

  const projectTemplateKeys = Object.keys(
    projectTemplates,
  ) as (keyof typeof projectTemplates)[];

  let fileInput: HTMLInputElement;
</script>

<input
  class="hidden"
  type="file"
  accept="application/json"
  on:change={async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    if (
      !confirm(
        "All unsaved changes will be lost. Are you sure you want to open this file?",
      )
    ) {
      return;
    }
    fromJSON(await file.text());
  }}
  bind:this={fileInput}
/>

<Menubar.Menu>
  <Menubar.Trigger>File</Menubar.Trigger>
  <Menubar.Content>
    <Menubar.Sub>
      <Menubar.SubTrigger class="gap-2">
        <PlusIcon size="20" />
        New
      </Menubar.SubTrigger>
      <Menubar.SubContent>
        <Menubar.Label>Template</Menubar.Label>
        {#each projectTemplateKeys as template}
          <Menubar.Item
            class="capitalize"
            on:click={() => {
              if (
                confirm(
                  "Are you sure you want to create a new project?\n\nAll unsaved progress will be lost!",
                )
              ) {
                newProject(template);
              }
            }}
          >
            {template.replace("-", " ")}
          </Menubar.Item>
        {/each}
      </Menubar.SubContent>
    </Menubar.Sub>

    <Menubar.Separator />
    <Menubar.Item
      class="gap-2"
      on:click={() => {
        const input = prompt("input");
        if (input === null) return;
        fromJSON(input);
      }}
    >
      <ClipboardPasteIcon size="20" />
      Open from clipboard
    </Menubar.Item>
    <Menubar.Item class="gap-2" on:click={() => fileInput.click()}>
      <FileInputIcon size="20" />
      Open file
    </Menubar.Item>

    <Menubar.Separator />
    <Menubar.Item
      class="gap-2"
      on:click={() => navigator.clipboard.writeText(toJSON())}
    >
      <ClipboardCopyIcon size="20" />
      Copy to Clipboard
    </Menubar.Item>
    <Menubar.Item class="gap-2" on:click={downloadFile}>
      <DownloadIcon size="20" />
      Download
    </Menubar.Item>
  </Menubar.Content>
</Menubar.Menu>
