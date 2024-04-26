<script lang="ts">
  import LMB from "../LMB.svelte";
  import Selections from "../preview/Selections.gif";
</script>

<p>
  Multiple items can be selected by using <kbd>Ctrl</kbd> + <LMB /> or holding
  <kbd>Shift</kbd> and pressing <LMB /> and dragging to select and area. Actions
  can then be preformed on them as a group like moving, deleting or copying with
  keyboard shortcuts.
</p>
<figure>
  <img class="m-auto max-h-[50vh]" src={Selections} alt="Selecting items" />
  <figcaption>Selecting multiple items</figcaption>
</figure>
