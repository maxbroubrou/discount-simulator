import { Store } from "./src/classes/store";
import { DiscountOffer } from "./src/classes/discountOffer";

import defaultConfig from "./config/defaultDiscount.json";
import partnersConfig from "./config/partnersDiscounts.json";

import fs from "fs";

const ELAPSED_DAYS = 30;
const discountOffers = [];

for (const partner of partnersConfig) {
  if (!partner.name) {
    throw new Error(`Partner ${partner} is missing required 'name' property`);
  }
  discountOffers.push(
    new DiscountOffer(
      partner.name,
      partner.durationInDays || defaultConfig.durationInDays,
      partner.initialPercentage || defaultConfig.initialPercentage
    )
  );
}

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
