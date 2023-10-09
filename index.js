import { Store } from "./src/classes/store";
import { DiscountOffer } from "./src/classes/discountOffer";

import fs from "fs";

const ELAPSED_DAYS = 30;
const discountOffers = [
  new DiscountOffer("Velib", 20, 30),
  new DiscountOffer("Naturalia", 10, 5),
  new DiscountOffer("Vinted", 5, 40),
  new DiscountOffer("Ilek", 15, 40)
];
const store = new Store(discountOffers);

const log = [];

for (let elapsedDays = 0; elapsedDays < ELAPSED_DAYS; elapsedDays++) {
  log.push(JSON.stringify(store.updateDiscounts()));
}

/* eslint-disable no-console */
fs.writeFile("output.txt", log.join(), err => {
  if (err) {
    console.error("error", err);
    throw new Error(err);
  }
  console.log("success");
});
/* eslint-enable no-console */
