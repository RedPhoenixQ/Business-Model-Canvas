import IconPopover from "./IconPopover.svelte";
import CustomIcon from "./CustomIcon.svelte";
import FemaleIcon from "$lib/icons/FemaleIcon.svelte";
import MaleIcon from "$lib/icons/MaleIcon.svelte";

export type IconInfo = {
    iconSrc?: string | PredifinedIcon;
    iconBackground?: "dark" | "light";
    iconShape?: "square" | "circle";
};

export type PredifinedIcon = keyof typeof prefinedIcon;

export const prefinedIcon = {
    "Female": FemaleIcon,
    "Male": MaleIcon,
} as const

export {
    IconPopover,
    CustomIcon,
}