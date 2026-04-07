import { expect, test } from "@playwright/test";

test("トップページが開く", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/ゆにコス/);
});

test("各コスチュームのページが開く (SSG)", async ({ page }) => {
  await page.goto("/alice_in_dream_garden");
  await expect(page).toHaveTitle(/ゆにコス: /);
});
