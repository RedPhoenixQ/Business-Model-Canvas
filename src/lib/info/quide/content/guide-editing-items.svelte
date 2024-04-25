<script lang="ts">
  import RMB from "../RMB.svelte";
  import EditItem from "../preview/EditItem.svelte";
</script>

<p>
  Clicking <RMB /> on an item and pressing <i>Edit</i> opens the editing menu where
  things about the item can be changed.
</p>
<figure>
  <EditItem class="m-auto max-h-[50vh]" />
  <figcaption>Editing the name and description on an item</figcaption>
</figure>
