import { database } from "./config.js";
import { Sequelize, DataTypes } from "sequelize";
import defaultConfig from "../../../config/defaultDiscount.json";
import partnersConfig from "../../../config/partnersDiscounts.json";

const sequelize = new Sequelize(database);

export const discountOffers = sequelize.define("discountOffers", {
  partnerName: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  expiresIn: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  discountRateInPercent: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  maxDiscount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  canExpires: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  dropsToZeroWhenExpired: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  rules: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

export const seedDatabase = async () => {
  await sequelize.sync({
    force: true
  });
  for (const partner of partnersConfig) {
    let partnerFinalConfig = {};
    partnerFinalConfig = Object.assign({}, defaultConfig);
    for (const property of Object.keys(partner)) {
      partnerFinalConfig[property] = partner[property];
    }
    await discountOffers.create({
      partnerName: partnerFinalConfig.name,
      expiresIn: partnerFinalConfig.durationInDays,
      discountRateInPercent: partnerFinalConfig.initialPercentage,
      maxDiscount: partnerFinalConfig.maxDiscount,
      canExpires: partnerFinalConfig.canExpires,
      dropsToZeroWhenExpired: partnerFinalConfig.dropsToZeroWhenExpired,
      rules: partnerFinalConfig.rules
    });
  }
};

seedDatabase();
