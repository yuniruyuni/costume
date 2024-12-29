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
