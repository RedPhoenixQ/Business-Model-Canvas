<script>
  import * as Dialog from "$lib/components/ui/dialog";

  export let open = false;
</script>

<Dialog.Root bind:open>
  <Dialog.Content
    class="max-h-[90vh] overflow-auto md:max-w-screen-sm lg:max-w-screen-md"
  >
    <Dialog.Header>
      <Dialog.Title level="h2">Quickstart guide</Dialog.Title>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
