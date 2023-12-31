# Discount simulator for partners

Backend service to simulate discounts of partners on an ecommerce store, including an API.

You can find a [deployed API](http://35.180.66.136:3000/api-docs/) and a [UI example](https://mbroussart.retool.com/apps/0044eca2-6883-11ee-bd38-0bd44c737b96/Greenly%20discount%20simulator) to simulate discount.

## 🚅 System specifications

Introduction to our system:

- All discount offers have an `expiresIn` value which denotes the number of days we have until the offer expires.
- All discount offers have a `discountInPercent` value which gives the percent of discount on the partner products.
- At the end of each day, our system lowers the discountInPercent by 1 unit (percent).

But there is more: partners discounts can have specific rules such as a max discount, a discount that increases as the expiration date approaches, or a discount that never expires. Those rules can be configured in a JSON configuration file.

## 🔩 JSON Configuration of partner discounts

To even make accessible the simulation of a new discount to non-developers (such as sales), we based the configuration of partners discounts on a JSON file ([`config/partnersDiscounts.json`](config/partnersDiscounts.json)).

In this JSON configuration, each object of the main array is a partner. The `name` property is mandatory and must be unique. The other properties are optional and take default values if not specified (from [`config/defaultDiscount.json`](config/defaultDiscount.json)):
- **durationInDays (Number)** : initial duration of the discount in days (`expiresIn` value)
- **initialPercentage (Number)** : initial percentage of the discount (`discountInPercent` value)
- **maxDiscount (Number)** : maximum percentage of the discount
- **canExpires (Boolean)** : boolean to indicate if `expiresIn` and `discountInPercent` values change over time
- **dropsToZeroWhenExpired (Boolean)** : boolean to indicate if the discount drops to 0% when `expiresIn` reaches 0
- **rules (Array of Objects)** : discount change to apply according to the interval of days left. Each rule is an object :
  - **expireRange (Objects)** : object of 2 properties (start and end) to indicate the range of `expiresIn` values to which the rule applies (Numbers, "-inf" or "inf" strings are the accepted values)
  - **discountChange (Number)** : integer to indicate the change of `discountInPercent` value when the rule applies

### Example:

(non specified properties take `config.defaultDiscount.json` value)

``` json
[
    {
        "name": "Naturalia",
        "durationInDays": 10,
        "initialPercentage": 5,
        "rules": [
            {
                "expireRange": {
                    "start": "-inf",
                    "end": -1
                },
                "discountChange": 2
            },
            {
                "expireRange": {
                    "start": 0,
                    "end": "inf"
                },
                "discountChange": 1
            }
        ]
    }
]
```

## 🏃 Quick start

### One-run simulation locally

Config the discount offers on [`config/partnersDiscounts.json`](config/partnersDiscounts.json) then launch the simulation.
The log of the simulation is written in an [_output.txt_](./output.txt) file.
You can generate a new file by running one of the following commands:

```sh
yarn && yarn start
```

### Run the API locally on port 3000

[API Documentation](http://127.0.0.1:3000/api-docs/)

```sh
yarn && yarn serve
```

or

```sh
docker-compose up db server
```
(this will pull docker image of the project available on [docker-hub](https://hub.docker.com/repository/docker/broubroumachine/discount-simultor-api/general))

### Run the tests

```sh
yarn && yarn test
```
