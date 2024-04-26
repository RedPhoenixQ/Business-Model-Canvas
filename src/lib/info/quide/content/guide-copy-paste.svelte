<script lang="ts">
  import RMB from "../RMB.svelte";
  import CopyPaste from "../preview/CopyPaste.gif";
</script>

<p>
  Clicking <RMB /> on an item and pressing <i>Edit</i> opens the editing menu where
  things about the item can be changed.
</p>
<aside>Note: Copy and paste works across pages.</aside>
<aside>
  Note: Multiple items can be copy and pasted at the same time by selecting
  multiple items.
</aside>
<figure>
  <img class="m-auto max-h-[50vh]" src={CopyPaste} alt="Copy and pasting" />
  <figcaption>Copy and pasting items</figcaption>
</figure>
