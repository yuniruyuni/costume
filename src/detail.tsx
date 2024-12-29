import type React from "react";
import { clsx } from "clsx";
import type { Costume } from "./costumes";

export type DetailProps = {
  target?: Costume;
  onClose: () => void;
};

export const Detail: React.FC<DetailProps> = ({ target, onClose }) => {
  if (!target) return undefined;

  return (
    <button
      type="button"
      className={clsx(
        "fixed left-0 top-0 z-10 w-screen h-screen",
        "bg-white",
        "outline-none",
        "grid gap-4",
        "overflow-x-auto overflow-y-hidden",
        "grid-cols-1 grid-rows-12",
        "sm:overflow-y-scroll sm:overflow-x-hidden",
        "sm:grid-cols-12 sm:grid-rows-1",
      )}
      onClick={onClose}
    >
      <img
        className={clsx(
          "object-contain object-center",
          "w-full max-w-full",
          "h-full max-h-full",
          "rounded-b-3xl",
          "col-span-1 row-span-10",
          "sm:object-contain sm:object-center",
          "sm:w-full sm:max-w-full",
          "sm:h-full sm:max-h-full",
          "sm:col-span-8 sm:row-span-1",
          "sm:rounded-r-3xl",
        )}
        src={target.image}
        alt="DreamyStep"
      />
      <ul
        className={clsx(
          "p-4",
          "shadow-lg",
          "bg-slate-100",
          "h-full w-full",
          "content-center",
          "overflow-y-auto",

          "rounded-t-3xl",
          "row-span-2 col-span-1",

          "sm:rounded-none sm:rounded-l-3xl",
          "sm:row-span-1 sm:col-span-4",
        )}
      >
        <li className="isolate mb-4">
          <div className="rounded-lg bg-slate-200 font-bold">
            <b>Author</b>
          </div>
          <div>
            {target.author}様
            {target.booth && (
              <a
                className="text-blue-400 hover:text-blue-600"
                href={target.booth}
              >
                (Booth)
              </a>
            )}
          </div>
        </li>
        <li className="isolate">
          <div className="rounded-lg bg-slate-200 font-bold">
            Comment
          </div>
          <div>{target.comment}</div>
        </li>
      </ul>
    </button>
  );
};

