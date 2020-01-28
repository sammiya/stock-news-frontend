import moment from "moment";

//TODO: Fetch API の適切なエラー処理（サーバーエラーとクライアントエラーでメッセージを分ける、存在しない stockCode に対処する）
function fetchStocksVolatile() {
  return fetch("/stocks-volatile")
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

export default fetchStocksVolatile;
