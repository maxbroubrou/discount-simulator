import express from "express";
import offerController from "./controller/offer.js";
import simulateController from "./controller/simulate.js";
import swaggerUi from "swagger-ui-express";
import jsYaml from "js-yaml";
import fs from "fs";

const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/offers", offerController.getAll);
app.post("/offers", offerController.createOrUpdate);
app.delete("/offers/:partnerName", offerController.deleteOffer);

app.get("/simulate/:days", simulateController.simulateDiscount);

const openApiDocument = jsYaml.load(fs.readFileSync("openapi.yaml", "utf-8"));

app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(openApiDocument, { explorer: true }));

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Server is running on port ${PORT}.`);
  /* eslint-enable no-console */
});
