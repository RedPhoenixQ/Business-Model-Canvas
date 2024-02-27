export type ItemIconInfo = {
  src?: string;
  background?: "dark" | "light";
  shape?: "square" | "circle";
};

export type ItemData = {
  name: string;
  icon: ItemIconInfo;
};
