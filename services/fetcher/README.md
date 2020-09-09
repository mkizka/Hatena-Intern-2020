# タイトル取得サービス (TypeScript)

主要なモジュール:

- `src/fetcher.ts`: タイトル取得の実装が含まれる
- `src/server.ts`: `src/renderer.ts` を gRPC で操作するためのインターフェース (gRPC サーバー) を実装する

その他のディレクトリ / モジュール:

- `pb/`: gRPC サービス定義から自動生成されたコード (リポジトリルートの `/pb/ts` からコピーされたもの)
- `src/config.ts`: サーバーの設定を読み込む

## テスト
以下のコマンドを実行します.

``` shell
yarn test
```
