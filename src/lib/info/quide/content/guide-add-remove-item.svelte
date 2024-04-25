<script lang="ts">
  import RMB from "../RMB.svelte";
  import LMB from "../LMB.svelte";
  import AddingAndRemovingItems from "../preview/AddingAndRemovingItems.svelte";
</script>

<p>
  Clicking <RMB /> anywhere in the background will open up a menu were different
  types of items can be added.
</p>
<p>
  There are two options for removing an item. You can click <RMB /> the item and
  choose <i>delete</i>. Optionally you can select the item by clicking <LMB /> on
  it and pressing either <kbd>Delete</kbd> or <kbd>Backspace</kbd> on the keyboard.
</p>
<figure>
  <AddingAndRemovingItems class="m-auto max-h-[50vh]" />
  <figcaption>Editing the name and description on an item</figcaption>
</figure>
