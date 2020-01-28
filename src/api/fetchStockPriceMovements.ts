import moment from "moment";

//TODO: Fetch API の適切なエラー処理（サーバーエラーとクライアントエラーでメッセージを分ける、存在しない StockCode に対処する）
function fetchStockPriceMovements(stockCode: string) {
  return fetch(`/stock-price-movements/${stockCode}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(resJson => {
      resJson.map((v: any) => {
        v.date = moment(new Date(v.date)).format("YY/MM/DD");
        return v;
      });
      return resJson;
    });
}

export default fetchStockPriceMovements;
