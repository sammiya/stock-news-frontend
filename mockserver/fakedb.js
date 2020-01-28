const faker = require("faker");
faker.locale = "ja";

const stocks = [...Array(90).keys()].map(i => ({
  stockCode: faker.random
    .number({ min: 1000 + 100 * i, max: 1099 + 100 * i })
    .toFixed(),
  stockName: faker.company.companyName(),
  market: ["東証1部", "東証2部", "マザーズ"][
    faker.random.number({ min: 0, max: 2 })
  ],
  industry: ["空運業", "鉱業", "水産・農林業"][
    faker.random.number({ min: 0, max: 2 })
  ]
}));

const generateFakeNews = () => ({
  url: faker.internet.url(),
  title: faker.lorem.sentence()
});

const generateFakeVolatileStock = change => {
  const { stockCode, stockName } = stocks[
    faker.random.number({ min: 0, max: stocks.length - 1 })
  ];
  return {
    stockCode,
    stockName,
    newsList: [...Array(faker.random.number({ min: 1, max: 5 }))].map(
      generateFakeNews
    ),
    change
  };
};

const stocksVolatile = [...Array(2)]
  .reduce(
    dateList => [
      ...dateList,
      new Date(
        dateList[dateList.length - 1] -
          86400000 /*Milliseconds in a day*/ *
            faker.random.number({ min: 1, max: 3 })
      )
    ],
    [faker.date.past()]
  )
  .map(date => {
    let fallingChange = -0.3;
    let risingChange = 0.3;
    return {
      date: date.toString(),
      volatileStocks: [...Array(5)].map(() => {
        fallingChange /= faker.random.number({ min: 101, max: 200 }) / 100;
        risingChange /= faker.random.number({ min: 101, max: 200 }) / 100;
        return {
          rising: generateFakeVolatileStock(risingChange),
          falling: generateFakeVolatileStock(fallingChange)
        };
      })
    };
  });

const stockPriceMovementsNested = stocks
  .map(stock => stock.stockCode)
  .map(stockCode => {
    let date = faker.date.past();
    return [...Array(faker.random.number({ min: 1, max: 100 }))].map(() => {
      date.setDate(date.getDate() + faker.random.number({ min: 1, max: 3 }));

      const low = faker.random.number({ min: 1, max: 10000 }) / 10;
      const high = low + faker.random.number({ min: 1, max: 10000 }) / 10;
      return {
        stockCode,
        date: date.toString(),
        volume: faker.random.number({ min: 1, max: 100000 }) / 10,
        opening: faker.random.number({ min: low, max: high }),
        closing: faker.random.number({ min: low, max: high }),
        high,
        low,
        avg13Weeks: faker.random.number({ min: 2000, max: 8000 }) / 10,
        change: faker.random.number({ min: -3000, max: 3000 }) / 10000,
        newsList: [...Array(faker.random.number({ min: 0, max: 5 }))].map(
          generateFakeNews
        )
      };
    });
  });

// flatten
const stockPriceMovements = [].concat(...stockPriceMovementsNested);

module.exports = () => ({
  stocks: stocks,
  "stocks-volatile": stocksVolatile,
  "stock-price-movements": stockPriceMovements
});
