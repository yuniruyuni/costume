import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Router } from "wouter";
import { navigate } from "wouter/use-browser-location";

import "./index.css";

import { costumes } from "./costumes";
import { Detail } from "./detail";
import { Gallery } from "./gallery";

export function MainScreen() {
  return (
    <div className="container mx-auto">
      <Route path="/">
        <title>ゆにコス</title>
        <header className="bg-slate-200 rounded-lg mt-2 mb-4 pl-4 pt-2 pb-2">
          <h1 className="text-2xl text-sky-800">
            <a href="https://yuniruyuni.net">yuniruyuni.net</a> &gt; ゆにコス:
            ゆにるユニのコスチュームリスト
          </h1>
        </header>
        <Gallery onSelect={(target) => navigate(`/${target.id}`)} />
      </Route>
      <Route path="/:id">
        {({ id }) => {
          const target = costumes.find((c) => c.id === id);
          if (!target) {
            return <div>Not found</div>;
          }
          return (
            <>
              <title>{`ゆにコス: ${target.name}`}</title>
              <Detail
                target={target}
                onClose={() => navigate("/")}
                onPrevious={() => {
                  const index = costumes.indexOf(target);
                  if (index > 0) {
                    const id = costumes[index - 1].id;
                    navigate(`/${id}`);
                  }
                }}
                onNext={() => {
                  const index = costumes.indexOf(target);
                  if (index < costumes.length - 1) {
                    const id = costumes[index + 1].id;
                    navigate(`/${id}`);
                  }
                }}
              />
            </>
          );
        }}
      </Route>
    </div>
  );
}

// ハッシュURLからパスベースURLへの移行リダイレクト
if (window.location.hash.startsWith("#/")) {
  const path = window.location.hash.slice(1);
  window.history.replaceState(null, "", path);
}

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Router>
        <MainScreen />
      </Router>
    </React.StrictMode>,
  );
}
