import type { EdgeTypes } from "@xyflow/svelte";
import StraightLineEdge from "./StraightLineEdge.svelte";

export const edgeTypes: EdgeTypes = {
  line: StraightLineEdge,
} as const;
