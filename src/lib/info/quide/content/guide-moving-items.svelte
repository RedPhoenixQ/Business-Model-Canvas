<script lang="ts">
  import RMB from "../RMB.svelte";
  import LMB from "../LMB.svelte";
  import MovingBetweenSegments from "../preview/MovingBetweenSegments.svelte";
</script>

<p>
  To move and item you press <LMB /> and drag. If the items is within a segment or
  group, it is restricted to stay within that segment or group.
</p>
<p>
  Moving between groups or segments can be achived by toggling the restrictions
  in the <i>controls</i> at the bottom left. When dropping an item in a new segment
  or group, it's now part of it. Toggling back on the restrictions will keep it within
  the new segment or group.
</p>
<p>
  Another option to move between segments is to click <RMB /> on the item and in
  the <i>Move To</i> option select the segments you wish to move the item to.
</p>
<figure>
  <MovingBetweenSegments class="m-auto max-h-[50vh]" />
  <figcaption>
    Moving an item between segments. Note the recommened relations changing when
    the segment changes.
  </figcaption>
</figure>
