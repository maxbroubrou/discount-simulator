import { discountOffers } from "../database/initDb.js";

async function getAll(req, res) {
  try {
    const offers = await discountOffers.findAll();
    if (offers.length === 0) {
      return res.status(204).end();
    }
    return res.status(200).send({ data: offers });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function createOrUpdate(req, res) {
  try {
    const [offer, isCreated] = await discountOffers.upsert(req.body);
    if (!isCreated) {
      return res.status(200).send({ data: offer });
    }
    return res.status(201).send({ data: offer });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
}

async function deleteOffer(req, res) {
  try {
    const response = await discountOffers.destroy({
      where: { partnerName: req.params.partnerName }
    });
    if (response !== 1) {
      return res.status(404).send({ error: "Offer not found" });
    }
    return res.status(200).send({
      message: `Offer ${req.params.partnerName} successfully deleted`
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export default {
  getAll,
  createOrUpdate,
  deleteOffer
};
