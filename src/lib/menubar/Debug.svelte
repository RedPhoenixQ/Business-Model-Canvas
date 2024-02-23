<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import { useEdges, useNodes } from "@xyflow/svelte";

  const nodes = useNodes();
  const edges = useEdges();
</script>

<Menubar.Menu>
  <Menubar.Trigger>Debug</Menubar.Trigger>
  <Menubar.Content>
    <Menubar.Item
      on:click={() => {
        $edges.forEach((edge) => {
          edge.hidden = false;
        });
        $edges = $edges;
      }}
    >
      Show all edges
    </Menubar.Item>
  </Menubar.Content>
</Menubar.Menu>
