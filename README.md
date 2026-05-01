# costume.yuniruyuni.net

Virtual TechLead / VTuber ゆにるユニが、通常配信およびVRChat配信で使用する衣装のリストサイトです。各衣装の写真・クレジット・BOOTH販売ページへのリンクを掲載しています。

通常配信ではVRM形式のアバターを使用し、VRChat配信ではVRChat向けアバターを使用します。VRMとVRChatアバター形式の違いにより、VRChat側のほうが表現力やアバター機能が高いため、一部の衣装はVRChat配信専用です。

https://costume.yuniruyuni.net/

## 技術スタック

- **ランタイム / ビルド**: [Bun](https://bun.sh)
- **フロントエンド**: React, TypeScript, Tailwind CSS
- **ルーティング**: wouter
- **サーバー**: Hono（静的ファイル配信 + `/health`）
- **リンター**: Biome
- **テスト**: Bun test + happy-dom + Testing Library + Playwright
- **画像処理**: sharp（サムネイル・表示用画像・OGP画像生成）
- **デプロイ**: Docker + Cloud Run

## セットアップ

```bash
bun install
```

## 開発

```bash
bun run watch:run
```

ローカルサーバー (http://localhost:3000) が起動し、クライアントのビルド・CSS生成・HTML生成・画像生成・サーバー起動が watch モードで動きます。

テストや型チェックも並行して監視したい場合は、別ターミナルで次を実行してください。

```bash
bun run watch:test
bun run watch:type
```

## ビルド

```bash
bun run build
```

`client/static/` に静的ファイルが生成され、`server/dist/server` にサーバーバイナリが生成されます。

## テスト・リント

```bash
bun run check:test  # テスト実行
bun run check:type  # 型チェック
bun run check:lint  # リント
bun run check:e2e   # E2Eテスト
bun run check       # 型チェック・リント・テスト・E2Eを並列実行
bun run fix:lint    # Biome check (自動修正付き)
```

E2Eテストはデフォルトで http://localhost:3000 を使います。別のプロセスが3000番を使っている場合は、次のようにポートを変更できます。

```bash
E2E_PORT=3100 bun run check:e2e
```

## 衣装の追加

`client/src/costumes.ts` の `rawCostumes` 配列に新しいエントリを追加し、対応する画像ファイル (`images/<id>.png`) を配置してください。サムネイル・表示用画像・OGP画像はビルド時に自動生成されます。

通常配信でも使える衣装は `vrchat_only: false`、VRChat配信専用の衣装は `vrchat_only: true` を設定してください。

## Docker

```bash
docker build -t costume .
docker run -p 3000:3000 costume
```
