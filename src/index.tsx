import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

import "./index.css";

import type { Costume  } from "./costumes";
import { Gallery } from "./gallery";
import { Detail } from "./detail";

function MainScreen() {
  const [target, setTarget] = useState<Costume | undefined>(undefined);

  return (
    <div className="container mx-auto">
      <header className="bg-slate-200 rounded-lg mt-2 mb-4 pl-4 pt-2 pb-2">
        <h1 className="text-2xl text-sky-800">ゆにコス: ゆにるユニのコスチュームリスト</h1>
      </header>
      <Detail target={target} onClose={() => setTarget(undefined)} />
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
