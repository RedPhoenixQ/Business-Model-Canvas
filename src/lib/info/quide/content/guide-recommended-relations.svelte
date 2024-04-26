<script lang="ts">
  import LMB from "../LMB.svelte";
  import RecommendedAndIgnoredRelations from "../preview/RecommendedAndIgnoredRelations.gif";
</script>

<p>
  Segments in a diagram layout can have recommended relations to items in other
  segments. When these relations are not present a small warning icon i shown on
  the item.
</p>
<p>
  Recommended relations can be ignored by pressing <LMB /> on the warning icon to
  show the recommendations and then pressing <LMB /> on any of the segment names.
  The recommended relations shouldn't all be ignored unless there is good reasons
  for it, perhaps that it wouldn't make sense for a certain item.
</p>
<aside>
  Note: In the <i>controls</i> on the bottom left there is a button to hide all relation
  warnings. This might be usefull while the diagram is incompete to reduce the visual
  noise.
</aside>
<figure>
  <img
    class="m-auto max-h-[50vh]"
    src={RecommendedAndIgnoredRelations}
    alt="Adding and removing an item with menus and with keyboard"
  />
  <figcaption>
    Items in <i>Key Activites</i> has recommended relations to
    <i>Key Resource</i> OR <i>Key Support</i>
  </figcaption>
</figure>
