import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { type Costume, costumes } from "./costumes";
import { Detail } from "./detail";
import { Gallery } from "./gallery";

function MainScreen() {
  const [target, setTarget] = useState<Costume | undefined>(undefined);

  return (
    <div className="container mx-auto">
      <header className="bg-slate-200 rounded-lg mt-2 mb-4 pl-4 pt-2 pb-2">
        <h1 className="text-2xl text-sky-800">
          <a href="https://yuniruyuni.net">yuniruyuni.net</a> &gt; ゆにコス:
          ゆにるユニのコスチュームリスト
        </h1>
      </header>
      <Detail
        target={target}
        onClose={() => setTarget(undefined)}
        onPrevious={() => {
          if (target) {
            const index = costumes.indexOf(target);
            if (index > 0) {
              setTarget(costumes[index - 1]);
            }
          }
        }}
        onNext={() => {
          if (target) {
            const index = costumes.indexOf(target);
            if (index < costumes.length - 1) {
              setTarget(costumes[index + 1]);
            }
          }
        }}
      />
      <Gallery onSelect={setTarget} />
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <MainScreen />
    </React.StrictMode>,
  );
}
