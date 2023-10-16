import express from "express";
import offerController from "./controller/offer.js";
import simulateController from "./controller/simulate.js";

const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/offers", offerController.getAll);
app.post("/offers", offerController.createOrUpdate);
app.delete("/offers/:partnerName", offerController.deleteOffer);

app.get("/simulate/:days", simulateController.simulateDiscount);


app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Server is running on port ${PORT}.`);
  /* eslint-enable no-console */
});
