//TODO: Fetch API の適切なエラー処理（サーバーエラーとクライアントエラーでメッセージを分ける、存在しない StockCode に対処する）
function fetchStockOptions() {
  return fetch("/stocks").then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}

export default fetchStockOptions;
