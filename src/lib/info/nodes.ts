import type { GroupData } from "$lib/nodes/group";
import type { ItemData } from "$lib/nodes/item";
import type { SegmentData } from "$lib/nodes/segment";
import type { SliderData } from "$lib/nodes/slider";
import type { Node, XYPosition } from "@xyflow/svelte";

export type DefaultNode = Omit<Node, "id" | "position" | "data"> &
  (
    | {
        type: "item";
        data: ItemData;
      }
    | {
        type: "segment";
        data: SegmentData;
      }
    | {
        type: "slider";
        data: SliderData;
      }
    | {
        type: "customGroup";
        data: GroupData;
      }
  );

/**
 *
 * @param nodes Should contain atleast one "root" node with no parent. If the array is empty undefined will be returned
 * @param position Should be the absolute position that will be converted to the relative coordinate of the found parent node
 * @returns
 */
export function findFirstParentAndRelativePos(
  nodes: Node[],
  { x, y }: XYPosition = { x: 0, y: 0 },
): { node: Node; relative_pos: XYPosition } | undefined {
  const relative_pos: XYPosition = { x, y };
  let node: Node | undefined;
  for (
    let next = nodes.find((n) => !n.parentNode);
    next !== undefined;
    next = nodes.find((n) => next?.id === n.parentNode)
  ) {
    relative_pos.x -= next.position.x;
    relative_pos.y -= next.position.y;
    node = next;
  }
  return node === undefined ? node : { node, relative_pos };
}
