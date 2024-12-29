import { clsx } from "clsx";
import type React from "react";
import type { Costume } from "./costumes";

export type PhotoProps = {
  costume: Costume;
  onSelect: (target: Costume) => void;
};

export const Photo: React.FC<PhotoProps> = ({ costume, onSelect }) => (
  <button
    type="button"
    key={costume.id}
    className={clsx(
      "rounded-lg",
      "border border-solid border-slate-300",
      "shadow-md"
    )}
    onClick={() => onSelect(costume)}
  >
    <img
      className={clsx(
        "w-40",
        "h-full max-h-full",
        "object-cover object-center",
        "rounded-lg",
        "hover:bg-slate-300"
      )}
      src={costume.thumbnail}
      alt={costume.name}
    />
  </button>
);
