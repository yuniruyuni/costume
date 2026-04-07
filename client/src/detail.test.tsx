import { afterEach, describe, expect, jest, test } from "bun:test";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { Costume } from "./costumes";
import { Detail } from "./detail";

afterEach(cleanup);

// テスト用のサンプル Costume
const sampleCostume: Costume = {
  id: "test1",
  name: "Test Costume",
  thumbnail: "/thumbnails/test1.webp",
  image: "/images/test1.webp",
  author: "Test Author",
  booth: "https://example.com",
  comment: "This is a test comment.",
  vrchat_only: false,
};

describe("Detail コンポーネント", () => {
  test("Costume の情報が正しくレンダリングされる", () => {
    const onClose = jest.fn();
    const onNext = jest.fn();
    const onPrevious = jest.fn();

    render(
      <Detail
        target={sampleCostume}
        onClose={onClose}
        onNext={onNext}
        onPrevious={onPrevious}
      />,
    );

    // 画像のレンダリング（alt 属性に Costume 名が設定されている）
    const image = screen.getByRole("img", { name: sampleCostume.name });
    expect(image).toHaveAttribute("src", sampleCostume.image);

    // Costume の名前、作者、コメントが表示される
    expect(screen.getByText(sampleCostume.name)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(sampleCostume.author)),
    ).toBeInTheDocument();
    expect(screen.getByText(sampleCostume.comment)).toBeInTheDocument();
  });

  test("Close ボタンのクリックで onClose が呼ばれる", () => {
    const onClose = jest.fn();
    const onNext = jest.fn();
    const onPrevious = jest.fn();

    render(
      <Detail
        target={sampleCostume}
        onClose={onClose}
        onNext={onNext}
        onPrevious={onPrevious}
      />,
    );

    // ボタンはスクリーンリーダー向けの "Close" テキストが設定されている
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("キー操作（ArrowRight, ArrowLeft, Escape）で各コールバックが呼ばれる", () => {
    const onClose = jest.fn();
    const onNext = jest.fn();
    const onPrevious = jest.fn();

    render(
      <Detail
        target={sampleCostume}
        onClose={onClose}
        onNext={onNext}
        onPrevious={onPrevious}
      />,
    );

    // ArrowRight キーで onNext が呼ばれる
    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(onNext).toHaveBeenCalledTimes(1);

    // ArrowLeft キーで onPrevious が呼ばれる
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(onPrevious).toHaveBeenCalledTimes(1);

    // Escape キーで onClose が呼ばれる
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
