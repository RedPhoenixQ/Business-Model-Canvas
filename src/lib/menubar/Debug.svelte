<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import { useEdges, useNodes } from "@xyflow/svelte";

  const nodes = useNodes();
  const edges = useEdges();
</script>

<Menubar.Menu>
  <Menubar.Trigger>Debug</Menubar.Trigger>
  <Menubar.Content>
    <Menubar.Sub>
      <Menubar.SubTrigger>Log</Menubar.SubTrigger>
      <Menubar.SubContent>
        <Menubar.Item on:click={() => console.log("Debug nodes", $nodes)}>
          Nodes
        </Menubar.Item>
        <Menubar.Item on:click={() => console.log("Debug edges", $edges)}>
          Edges
        </Menubar.Item>
      </Menubar.SubContent>
    </Menubar.Sub>
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
