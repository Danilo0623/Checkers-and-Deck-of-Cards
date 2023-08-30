const { test, expect } = require("@playwright/test");

test("Navigate to Checkers URL", async ({ page }) => {
  await page.goto("https://www.gamesforthebrain.com/game/checkers/");
  await expect(page).toHaveTitle("Checkers - Games for the Brain");
  await expect(page.locator("div[class='page'] h1")).toContainText("Checkers");
});

test("Play a game - make 5 moves and Restart the game", async ({ page }) => {
  await page.goto("https://www.gamesforthebrain.com/game/checkers/");
  await page.locator("img[name='space62']").click();
  await page.locator("img[name='space53']").click();

  await expect(page.locator("#message")).toContainText("Make a move.");

  await page.locator("img[name='space42']").click();
  await page.locator("img[name='space33']").click();

  await page.locator("img[name='space51']").click();
  await page.locator("img[name='space33']").click();

  await page.locator("img[name='space22']").click();
  await page.locator("img[name='space13']").click();

  await page.locator("img[name='space31']").click();
  await page.locator("img[name='space53']").click();

  await page.locator("//a[normalize-space()='Restart...']").click();

  await expect(page.locator("#message")).toContainText(
    "Select an orange piece to move."
  );
});
