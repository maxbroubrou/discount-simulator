import { discountOffers } from "../database/initDb.js";
import { Store } from "../../classes/store.js";
import { DiscountOffer } from "../../classes/discountOffer.js";

async function simulateDiscount(req, res) {
  try {
    const offers = await discountOffers.findAll({
      where: { partnerName: req.body.partners }
    });

    //TODO: initStore function
    const store = new Store(
      offers.map(offer => {
        return new DiscountOffer(
          offer.partnerName,
          offer.expiresIn,
          offer.discountRateInPercent
        );
      })
    );
    store.partnersRules = {};
    offers.map(offer => {
      store.partnersRules[offer.partnerName] = {
        canExpires: offer.canExpires,
        dropsToZeroWhenExpired: offer.dropsToZeroWhenExpired,
        maxDiscount: offer.maxDiscount,
        rules: offer.rules
      };
    });

    const log = [];
    for (let elapsedDays = 0; elapsedDays < req.params.days; elapsedDays++) {
      const products = store.updateDiscounts();
      products.forEach(product => {
        log.push({
          partnerName: product.partnerName,
          discountInPercent: product.discountInPercent,
          expiresIn: product.expiresIn
        });
      });
    }

    if (offers.length === 0) {
      return res.status(204).end();
    }
    return res.status(200).send({ data: log });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export default {
  simulateDiscount
};
