import { useState } from "react";
import { describe, test, expect, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import { Router } from "wouter";
import { costumes } from "./costumes";
import { MainScreen } from "./";

afterEach(cleanup);

// テスト用：初期ルートを指定できるフェイクロケーションフックのファクトリ関数
function createFakeLocation(initial: string) {
  return function useFakeLocation() {
    const [location, setLocation] = useState(initial);
    return [location, setLocation] as [string, (l: string) => void];
  };
}

// ─────────────────────────────────────────────
// index.tsx に対する統合テスト
describe("MainScreen (index) のルーティング", () => {
  test("ルートが '/' の場合、Gallery がレンダリングされる", () => {
    render(
      <Router hook={createFakeLocation("/")}>
        <MainScreen />
      </Router>
    );
    // ヘッダーに表示される "yuniruyuni.net" のリンクが表示されること
    expect(screen.getByText("yuniruyuni.net")).toBeInTheDocument();
    // Gallery コンポーネントは各 Costume のサムネイル画像をレンダリングしているはずなので、
    // costumes 配列の先頭の Costume の alt 属性（名前）が表示されていることを確認
    expect(screen.getByRole("img", { name: costumes[0].name })).toBeInTheDocument();
  });

  test("有効な id の場合、Detail がレンダリングされる", () => {
    const validId = costumes[0].id;
    render(
      <Router hook={createFakeLocation(`/${validId}`)}>
        <MainScreen />
      </Router>
    );
    // Detail コンポーネントはタイトルに "ゆにコス: {costume.name}" を表示しているので、それを確認
    expect(screen.getByText(`ゆにコス: ${costumes[0].name}`)).toBeInTheDocument();
    // また、Detail 内の画像が costume.image を src に持つことも確認
    expect(screen.getByRole("img", { name: costumes[0].name })).toHaveAttribute("src", costumes[0].image);
  });

  test("無効な id の場合、'Not found' がレンダリングされる", () => {
    render(
      <Router hook={createFakeLocation("/nonexistent")}>
        <MainScreen />
      </Router>
    );
    expect(screen.getByText("Not found")).toBeInTheDocument();
  });
});
