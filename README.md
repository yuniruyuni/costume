# costume.yuniruyuni.net

Virtual TechLead ゆにるユニの配信で使うお洋服（VRChatアバター衣装）のギャラリーサイトです。各衣装の写真・クレジット・BOOTH販売ページへのリンクを掲載しています。

https://costume.yuniruyuni.net/

## 技術スタック

- **ランタイム / ビルド**: [Bun](https://bun.sh)
- **フロントエンド**: React, TypeScript, Tailwind CSS
- **ルーティング**: wouter (hash-based)
- **リンター**: Biome
- **テスト**: Bun test + happy-dom + Testing Library
- **画像処理**: sharp（サムネイル生成）
- **デプロイ**: Docker (nginx)

## セットアップ

```bash
bun install
```

## 開発

```bash
bun run start
```

ローカルサーバー (http://localhost:3000) が起動し、ファイル変更時にホットリロードされます。テスト・型チェック・リントも同時に実行されます。

## ビルド

```bash
bun run build
```

`static/` ディレクトリに静的ファイルが生成されます。

## テスト・リント

```bash
bun test          # テスト実行
bun run type      # 型チェック
bun run lint      # リント
bun run check     # Biome check (自動修正付き)
bun run format    # フォーマット
```

## 衣装の追加

`src/costumes.ts` の `rawCostumes` 配列に新しいエントリを追加し、対応する画像ファイル (`images/<id>.png`) を配置してください。サムネイルはビルド時に自動生成されます。

## Docker

```bash
docker build -t costume .
docker run -p 8080:80 costume
```
