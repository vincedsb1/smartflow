export type Color =
  | string
  | "red-500"
  | "orange-500"
  | "yellow-500"
  | "green-500"
  | "teal-500"
  | "blue-500"
  | "indigo-500"
  | "purple-500"
  | "pink-500"
  | "red-600"
  | "orange-600"
  | "yellow-600";

export const getColorClass = (
  colorState: "normal" | "desactivated" | "warning" | undefined
) => {
  switch (colorState) {
    case "normal":
      return "text-neutral-600 dark:text-neutral-200";
    case "desactivated":
      return "text-gray-300";
    case "warning":
      return "text-red-500";
    default:
      return "text-neutral-600 dark:text-neutral-200";
  }
};

export const colorClasses: Record<Color, string> = {
  "red-500": "bg-red-500",
  "orange-500": "bg-orange-500",
  "yellow-500": "bg-yellow-500",
  "green-500": "bg-green-500",
  "teal-500": "bg-teal-500",
  "blue-500": "bg-blue-500",
  "indigo-500": "bg-indigo-500",
  "purple-500": "bg-purple-500",
  "pink-500": "bg-pink-500",
  "red-600": "bg-red-600",
  "orange-600": "bg-orange-600",
  "yellow-600": "bg-yellow-600",
};
