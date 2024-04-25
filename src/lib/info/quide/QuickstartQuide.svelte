<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import Section from "./Section.svelte";
  import TableOfContents from "./TableOfContents.svelte";
  import { sections } from "./content";

  export let open = false;

  function onOpenChange(isOpen: boolean) {
    if (isOpen) return;
    // Clean up the hash if a url was clicked in the table of contents
    window.location.hash = "";
  }
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content
    class="max-h-[90vh] overflow-auto md:max-w-screen-sm lg:max-w-screen-md"
  >
    <Dialog.Header>
      <Dialog.Title level="h2">Quickstart guide</Dialog.Title>
    </Dialog.Header>
    <div
      class="space-y-8 [&_aside]:opacity-75 [&_figure]:space-y-1 [&_figure]:text-center [&_figure]:text-sm [&_figure]:italic [&_h3]:text-xl [&_h3]:font-semibold [&_h4]:font-semibold [&_kbd]:whitespace-nowrap [&_kbd]:rounded-sm [&_kbd]:border [&_kbd]:border-current [&_kbd]:bg-muted [&_kbd]:px-1 [&_kbd]:py-0.5 [&_kbd]:text-[0.9em] [&_kbd]:text-muted-foreground"
    >
      <section>
        <h3>Table of Contents</h3>
        <TableOfContents {sections} />
      </section>
      <Section level={3} {sections} />
    </div>
  </Dialog.Content>
</Dialog.Root>
