import { afterEach, describe, expect, jest, test } from "bun:test";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { Costume } from "./costumes";
import { Photo } from "./photo";

afterEach(cleanup);

const sampleCostume: Costume = {
  id: "test1",
  name: "Test Costume",
  thumbnail: "/thumbnails/test1.png",
  image: "/images/test1.png",
  author: "Test Author",
  booth: "https://example.com",
  comment: "This is a test comment.",
  vrchat_only: false,
};

describe("Photo コンポーネント", () => {
  test("サムネイル画像が正しくレンダリングされる", () => {
    const onSelect = jest.fn();
    render(<Photo costume={sampleCostume} onSelect={onSelect} />);

    const img = screen.getByRole("img", { name: sampleCostume.name });
    expect(img).toHaveAttribute("src", sampleCostume.thumbnail);
    cleanup();
  });

  test("ボタンのクリックで onSelect が呼ばれ、Costume が渡される", () => {
    const onSelect = jest.fn();
    render(<Photo costume={sampleCostume} onSelect={onSelect} />);

    // Photo コンポーネントは button 要素でラップされている
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onSelect).toHaveBeenCalledWith(sampleCostume);
    cleanup();
  });
});
