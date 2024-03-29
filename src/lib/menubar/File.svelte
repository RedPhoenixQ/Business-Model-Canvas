<script lang="ts">
  import {
    DownloadIcon,
    ClipboardCopyIcon,
    ClipboardPasteIcon,
    FileInputIcon,
    PlusIcon,
  } from "lucide-svelte/icons";
  import * as Dialog from "$lib/components/ui/dialog";
  import Dropzone from "svelte-file-dropzone";
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

  let open = false;
</script>

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
    <Menubar.Item class="gap-2" on:click={() => (open = true)}>
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

<Dialog.Root bind:open>
  <Dialog.Content class="pt-10">
    <span class="text-xl">Open file</span>
    <Dropzone
      on:dropaccepted={async (event) => {
        const file = event.detail?.acceptedFiles?.[0];
        if (file) {
          open = false;
          fromJSON(await file.text());
        }
      }}
      on:droprejected={(event) => {
        console.warn("rejected file", event);
      }}
      accept="application/json"
      containerClasses="flex justify-center h-24 w-full rounded-md border border-input !bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      Drop a file here or click to select a file
    </Dropzone>
  </Dialog.Content>
</Dialog.Root>
