import { describe, test, expect, jest, afterEach } from "bun:test";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Gallery } from "./gallery";
import { costumes } from "./costumes";

afterEach(cleanup);

describe("Gallery コンポーネント", () => {
  test("costumes の数だけ Photo コンポーネントがレンダリングされる", () => {
    const onSelect = jest.fn();
    render(<Gallery onSelect={onSelect} />);

    // Photo コンポーネントは button 要素としてレンダリングされるため取得
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(costumes.length);
  });

  test("各 Photo をクリックすると正しい Costume が onSelect に渡される", () => {
    const onSelect = jest.fn();
    render(<Gallery onSelect={onSelect} />);

    // costumes 配列の最初のアイテムの画像（alt 属性に Costume 名が設定されている）を取得し、親のボタンをクリック
    const firstCostume = costumes[0];
    const img = screen.getByRole("img", { name: firstCostume.name });
    const button = img.closest("button");
    if (button) {
      fireEvent.click(button);
    }
    expect(onSelect).toHaveBeenCalledWith(firstCostume);
  });
});
