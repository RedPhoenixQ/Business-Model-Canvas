<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  import { items, type Item } from ".";

  let open = false;
  export function openDialog(x?: number, y?: number) {
    item = initItem(x, y);
    open = true;
  }

  function initItem(x = 0, y = 0): Item {
    return {
      id: crypto.randomUUID(),
      name: "",
      icon: "",
      x,
      y,
      relations: [],
    };
  }

  function handleAdd(_event: SubmitEvent) {
    console.log("Handle add called");
    open = false;
    $items.set(item.id, item);
    $items = $items;
  }

  let item = initItem();

  $: console.log(item);
</script>

<Dialog.Root bind:open>
  <Dialog.Content>
    <form on:submit|preventDefault={handleAdd}>
      <Dialog.Header>
        <Dialog.Title>Add icon</Dialog.Title>
        <Dialog.Description>Add an icon</Dialog.Description>
      </Dialog.Header>
      <div>
        <Label>
          Name
          <Input type="text" bind:value={item.name}></Input>
        </Label>
        <Label>
          Icon url
          <Input type="url" bind:value={item.icon}></Input>
        </Label>
      </div>
      <Dialog.Footer>
        <Button class="mx-auto" type="submit">Add</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
