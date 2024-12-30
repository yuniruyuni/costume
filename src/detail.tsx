import { clsx } from "clsx";
import type React from "react";
import type { Costume } from "./costumes";

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};

const CopyButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      "relative",
      "ml-1",
      "top-1",
      "bg-blue-400 rounded-md p-1",
      "inline-flex items-center justify-center",
      "hover:bg-blue-300",
      "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
    )}
  >
    <span className="sr-only">Copy</span>
    <svg
      className="h-4 w-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
      />
    </svg>
  </button>
);

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      "absolute top-0 right-0 z-30",
      "bg-white rounded-md p-2",
      "inline-flex items-center justify-center",
      "text-gray-400 hover:text-gray-500 hover:bg-gray-100",
      "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
    )}
  >
    <span className="sr-only">Close</span>
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

const PreviousButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    className="absolute left-0 top-0 h-max min-h-full min-w-10 z-10 text-2xl hover:bg-gradient-to-r hover:from-slate-100 text-slate-500"
    onClick={onClick}
  >
    &lt;
  </button>
);

const NextButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    className="absolute right-0 top-0 h-max min-h-full min-w-10 z-10 text-2xl hover:bg-gradient-to-l hover:from-slate-100 text-slate-500"
    onClick={onClick}
  >
    &gt;
  </button>
);

export type DetailProps = {
  target?: Costume;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export const Detail: React.FC<DetailProps> = ({
  target,
  onClose,
  onNext,
  onPrevious,
}) => {
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
    >
      <CloseButton onClick={onClose} />
      <div
        className={clsx(
          "relative",
          "w-full max-w-full",
          "h-full max-h-full",
          "col-span-1 row-span-8",
          "sm:col-span-8 sm:row-span-1",
        )}
      >
        <PreviousButton onClick={onPrevious} />
        <img
          className={clsx(
            "object-contain object-center",
            "col-span-10",
            "w-full max-w-full",
            "h-full max-h-full",
          )}
          src={target.image}
          alt={target.name}
        />
        <NextButton onClick={onNext} />
      </div>
      <ul
        className={clsx(
          "p-4",
          "shadow-lg",
          "bg-slate-100",
          "h-full w-full",
          "content-center",
          "overflow-y-auto",

          "rounded-t-3xl",
          "row-span-4 col-span-1",

          "sm:rounded-none sm:rounded-l-3xl",
          "sm:row-span-1 sm:col-span-4",
        )}
      >
        <li className="isolate mb-4">
          <div className="rounded-lg bg-slate-200 font-bold">Name</div>
          <div>
            {target.name}{" "}
            <CopyButton onClick={() => copyToClipboard(target.name)} />
          </div>
        </li>
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
          <div className="rounded-lg bg-slate-200 font-bold">Comment</div>
          <div>{target.comment}</div>
        </li>
      </ul>
    </button>
  );
};
