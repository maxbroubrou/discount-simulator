import defaultConfig from "../../config/defaultDiscount.json";
import partnersConfig from "../../config/partnersDiscounts.json";

const NEGATIVE_INFINITE = "-inf";
const POSITIVE_INFINITE = "inf";

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
    this.partnersRules = this.loadDiscountsRules();
  }
  loadDiscountsRules() {
    let partnersRules = {};
    for (const partner of partnersConfig) {
      partnersRules[partner.name] = Object.assign({}, defaultConfig);
      for (const property of Object.keys(partner)) {
        if (property !== "name") {
          // overwrite default discount rules
          partnersRules[partner.name][property] = partner[property];
        }
      }
    }
    return partnersRules;
  }
  updateDiscounts() {
    for (const offer of this.discountOffers) {
      const partnerRules =
        this.partnersRules[offer.partnerName] || defaultConfig;
      if (partnerRules.canExpires) {
        offer.expiresIn--;
        for (const rule of partnerRules.rules) {
          const { start, end } = rule.expireRange;
          if (
            (start === NEGATIVE_INFINITE || offer.expiresIn >= start) &&
            (end === POSITIVE_INFINITE || offer.expiresIn <= end)
          ) {
            offer.discountInPercent += rule.discountChange;
          }
        }

        // discount limits
        const isOfferExpired =
          partnerRules.dropsToZeroWhenExpired && offer.expiresIn < 0;
        const isDiscountNegative = offer.discountInPercent < 0;
        if (isOfferExpired || isDiscountNegative) {
          offer.discountInPercent = 0;
        } else if (offer.discountInPercent > partnerRules.maxDiscount) {
          offer.discountInPercent = this.partnersRules[
            offer.partnerName
          ].maxDiscount;
        }
      }
    }

    return this.discountOffers;
  }
}
