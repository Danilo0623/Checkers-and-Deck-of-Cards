const { test, expect, request } = require("@playwright/test");

let deckID = 0;

test("Navigate to Deck of cards URL", async ({ page }) => {
  await page.goto("https://deckofcardsapi.com/");
  await expect(page).toHaveTitle("Deck of Cards API");
  await expect(page.locator(".title")).toContainText("Deck of Cards");
});

test("Get a New Deck of cards and shuffle it", async () => {
  const newRequest = await request.newContext();

  // Get new Deck of cards
  const newDeckResponse = await newRequest.get(
    "https://deckofcardsapi.com/api/deck/new/"
  );

  expect(newDeckResponse.ok()).toBeTruthy();

  const newDeckRes = await newDeckResponse.json();

  expect(await newDeckRes.shuffled).toBe(false);

  deckID = await newDeckRes.deck_id;

  // Shuffle the deck
  const shufDeckResponse = await newRequest.get(
    "https://deckofcardsapi.com/api/deck/" + deckID + "/shuffle/"
  );

  const shuffledResponse = await shufDeckResponse.json();
  expect(await shuffledResponse.shuffled).toBe(true);
});

test("Deal three cards and check for a Blackjack", async () => {
  const newRequest = await request.newContext();

  // Draw a card (3 cards - player 1)
  const playerOneCards = await newRequest.get(
    "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=3"
  );

  const playerOneResponse = await playerOneCards.json();
  let playerOneValue1 = await playerOneResponse.cards[0].value;
  let playerOneValue2 = await playerOneResponse.cards[1].value;
  let playerOneValue3 = await playerOneResponse.cards[2].value;

  if (
    playerOneValue1 === "KING" ||
    playerOneValue1 === "JACK" ||
    playerOneValue1 === "QUEEN"
  ) {
    playerOneValue1 = "10";
  } else if (playerOneValue1 === "ACE") {
    playerOneValue1 = "11";
  }

  if (
    playerOneValue2 === "KING" ||
    playerOneValue2 === "JACK" ||
    playerOneValue2 === "QUEEN"
  ) {
    playerOneValue2 = "10";
  } else if (playerOneValue2 === "ACE") {
    playerOneValue2 = "11";
  }

  if (
    playerOneValue3 === "KING" ||
    playerOneValue3 === "JACK" ||
    playerOneValue3 === "QUEEN"
  ) {
    playerOneValue3 = "10";
  } else if (playerOneValue3 === "ACE") {
    playerOneValue3 = "11";
  }

  const totalValuePlayer1 =
    parseInt(playerOneValue1) +
    parseInt(playerOneValue2) +
    parseInt(playerOneValue3);

  // Draw a card (3 cards - player 2)
  const playerTwoCards = await newRequest.get(
    "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=3"
  );

  const playerTwoResponse = await playerTwoCards.json();
  let playerTwoValue1 = await playerTwoResponse.cards[0].value;
  let playerTwoValue2 = await playerTwoResponse.cards[1].value;
  let playerTwoValue3 = await playerTwoResponse.cards[2].value;

  if (
    playerTwoValue1 === "KING" ||
    playerTwoValue1 === "JACK" ||
    playerTwoValue1 === "QUEEN"
  ) {
    playerTwoValue1 = "10";
  } else if (playerTwoValue1 === "ACE") {
    playerTwoValue1 = "11";
  }

  if (
    playerTwoValue2 === "KING" ||
    playerTwoValue2 === "JACK" ||
    playerTwoValue2 === "QUEEN"
  ) {
    playerTwoValue2 = "10";
  } else if (playerTwoValue2 === "ACE") {
    playerTwoValue2 = "11";
  }

  if (
    playerTwoValue3 === "KING" ||
    playerTwoValue3 === "JACK" ||
    playerTwoValue3 === "QUEEN"
  ) {
    playerTwoValue3 = "10";
  } else if (playerTwoValue3 === "ACE") {
    playerTwoValue3 = "11";
  }

  const totalValuePlayer2 =
    parseInt(playerTwoValue1) +
    parseInt(playerTwoValue2) +
    parseInt(playerTwoValue3);

  // Check for the Blackjack
  if (totalValuePlayer1 === 21) {
    console.log("Player 1 won a Blackjack!");
  } else {
    console.log("Player 1 didn't win a Blackjack!");
  }

  if (totalValuePlayer2 === 21) {
    console.log("Player 2 won a Blackjack!");
  } else {
    console.log("Player 2 didn't win a Blackjack!");
  }
});
