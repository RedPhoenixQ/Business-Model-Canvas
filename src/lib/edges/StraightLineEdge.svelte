<svelte:options immutable />

<script lang="ts">
  import {
    getStraightPath,
    useNodes,
    type EdgeProps,
    type Node,
    BaseEdge,
  } from "@xyflow/svelte";
  import { getEdgeParams } from "./utils";

  type $$Props = EdgeProps;

  export let source: $$Props["source"];
  export let target: $$Props["target"];

  const nodes = useNodes();

  let sourceNode: Node | undefined;
  let targetNode: Node | undefined;

  let edgePath: string | undefined;

  let labelX: number | undefined;
  let labelY: number | undefined;

  $: {
    $nodes.forEach((node) => {
      if (node.id === source) sourceNode = node;
      if (node.id === target) targetNode = node;
    });
    if (sourceNode && targetNode) {
      const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
      [edgePath, labelX, labelY] = getStraightPath({
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
      });
    } else {
      edgePath = undefined;
    }
  }
</script>

<BaseEdge path={edgePath ?? ""} {labelX} {labelY} {...$$props} />
