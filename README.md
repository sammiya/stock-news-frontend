# stock-news-frontend

## What's this?

[株ANDニュース](http://stock-news.3sigmas.net/) のフロントエンド部分の実装です。

なお、バックエンド部分、及び株価データ・ニュースデータをクロールする部分についての実装は非公開となっています。
しかしながら、代わりに [json-server](https://github.com/typicode/json-server) + [faker.js](https://github.com/marak/Faker.js/) で作成されたバックエンドのモック実装を用いることで、以下のように本アプリケーションを開発環境で動かすことが可能です。

## 開発環境での動かし方について

[Node.js](https://nodejs.org/) をインストールしていることが前提となります。

1. コマンドラインにて、`npm ci` で必要なモジュールをインストールします。
2. `npm run mockserver` を実行すると、バックエンドのモックが `http://localhost:9000` で起動します。
3. この状態で別のコマンドラインを起動し、`npm start` を実行することにより、アプリケーションが `http://localhost:3000` で起動します。

## その他

- 2020 年 1 月現在、[株ANDニュース](http://stock-news.3sigmas.net/) のデータクロールは 2019/12/20 で停止しています。原因は調査中であり、再開時期は未定です。
