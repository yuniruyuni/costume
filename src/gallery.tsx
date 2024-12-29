import type React from "react";
import { type Costume, costumes } from "./costumes";
import { Photo } from "./photo";

export type GalleryProps = {
  onSelect: (target: Costume) => void;
};

export const Gallery: React.FC<GalleryProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {costumes.map((costume) => (
        <Photo
          key={costume.id}
          costume={costume}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
