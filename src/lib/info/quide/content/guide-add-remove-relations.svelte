<script lang="ts">
  import LMB from "../LMB.svelte";
  import AddRemoveRelations from "../preview/AddRemoveRelations.gif";
</script>

<p>
  To add a relation between items, click and drag from the grey dot that appears
  at edge of any item and then let go with the mouse on top of any other item.
</p>
<p>
  Relations are automatically hidden if you are not hovering the item. Click <LMB
  /> to select and item to show the relations when not hovering it. Press
  <kbd>Ctrl</kbd>
  + <LMB /> on another item to select multiple items at the same time.
</p>
<p>
  To remove a relationship, you can press <LMB /> on the relationship line and while
  its highlighted, press <kbd>Delete</kbd> or <kbd>Backspace</kbd>.
</p>
<figure>
  <img
    class="m-auto max-h-[50vh]"
    src={AddRemoveRelations}
    alt="Adding and removing relations between items"
  />
  <figcaption>Adding and removing a relation between to items</figcaption>
</figure>
