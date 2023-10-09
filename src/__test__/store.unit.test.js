import { Store } from "../classes/store";
import { DiscountOffer } from "../classes/discountOffer";
import partnersDiscounts from "./mock/partnersDiscounts.json";

describe("Store", () => {
  describe("Function updateDiscounts()", () => {
    describe("For default discount partner", () => {
      it("should decrease the discount and expiresIn", () => {
        expect(
          new Store([
            new DiscountOffer("defaultDiscountPartner", 2, 3)
          ]).updateDiscounts()
        ).toEqual([new DiscountOffer("defaultDiscountPartner", 1, 2)]);
      });

      it("should decrease the discount twice as fast when expired", () => {
        expect(
          new Store([
            new DiscountOffer("defaultDiscountPartner", -5, 20)
          ]).updateDiscounts()
        ).toEqual([new DiscountOffer("defaultDiscountPartner", -6, 18)]);
      });

      it("should not decrease the discount below 0", () => {
        expect(
          new Store([
            new DiscountOffer("defaultDiscountPartner", 2, 0)
          ]).updateDiscounts()
        ).toEqual([new DiscountOffer("defaultDiscountPartner", 1, 0)]);
      });
    });

    describe("For increasing discount partner", () => {
      it("should increase the discount", () => {
        expect(
          new Store([
            new DiscountOffer("increasingDiscountPartner", 2, 3)
          ]).updateDiscounts()
        ).toEqual([new DiscountOffer("increasingDiscountPartner", 1, 4)]);
      });

      it("should not go upper than max discount", () => {
        const maxDiscount = partnersDiscounts[0].maxDiscount;
        expect(
          new Store([
            new DiscountOffer("increasingDiscountPartner", 2, maxDiscount)
          ]).updateDiscounts()
        ).toEqual([
          new DiscountOffer("increasingDiscountPartner", 1, maxDiscount)
        ]);
      });
    });

    describe("For never expires nor decreases partner", () => {
      it("should not change the discount and expiresIn", () => {
        expect(
          new Store([
            new DiscountOffer("neverExpiresNorDecreasesPartner", 2, 3)
          ]).updateDiscounts()
        ).toEqual([new DiscountOffer("neverExpiresNorDecreasesPartner", 2, 3)]);
      });
    });

    describe("For drop to zero partner", () => {
      it("should drop the discount to 0 when expired", () => {
        expect(
          new Store([
            new DiscountOffer("dropToZeroPartner", 0, 30)
          ]).updateDiscounts()
        ).toEqual([new DiscountOffer("dropToZeroPartner", -1, 0)]);
      });
    });
  });
});
