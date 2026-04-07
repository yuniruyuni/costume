# CLAUDE.md

## Project Overview

costume.yuniruyuni.net — Virtual TechLead ゆにるユニのコスチュームギャラリー (静的 SPA + SSG + 画像処理パイプライン)。React 19 で実装したギャラリー / 詳細画面と、`client/bin/` の SSG / sharp 画像処理スクリプトで構成され、Hono ベースの極薄 server から静的ファイルとして配信する。

## Tech Stack

- **Runtime/Package Manager:** Bun (workspaces: client, server, e2e)
- **Frontend:** React 19 + TypeScript + Tailwind CSS v4 + wouter (ルーター) + react-use
- **Backend:** Hono — **静的配信のみ** (compress + secureHeaders + `/health` + serveStatic)。tRPC / DB / API なし
- **SSG / 画像処理:** `client/bin/html.ts` (per-costume HTML を生成), `client/bin/image.ts` (sharp で webp 変換 + サムネ / OGP 生成)
- **Linting/Formatting:** Biome (`biome.jsonc`)
- **Testing:** bun:test (unit), Playwright (e2e)
- **i18n:** i18next + react-i18next (ja/en, scaffold のみ)
- **Deployment:** Docker (distroless) → Cloud Run

## Commands

```bash
bun run watch:run     # 開発サーバー起動 (client bundle/tailwind/SSG/image + server --watch)
bun run build         # プロダクションビルド (client → static/, server → dist/server)
bun run check         # 全チェック並列実行 (type + lint + test)
bun run check:type    # TypeScript 型チェック (全ワークスペース)
bun run check:lint    # Biome lint (全ワークスペース)
bun run check:test    # ユニットテスト (全ワークスペース)
bun run check:e2e     # Playwright e2e テスト
bun run fix:lint      # Biome auto-fix (全ワークスペース)
```

## Project Structure

```
├── package.json              # ワークスペースルート (name: "costume")
├── biome.jsonc               # 共有 Biome 設定
├── compose.yml               # ローカル動作確認 (single service, docker compose watch 対応)
├── Dockerfile                # プロダクション (client build + server compile + distroless)
├── cloudrun.yaml             # Cloud Run 単一サービス (port 3000)
│
├── images/                   # 元画像 (PNG)。client/bin/image.ts が ../images/ を参照する
│
├── client/                   # @costume/client
│   ├── package.json
│   ├── tsconfig.json
│   ├── bunfig.toml           # bun:test の preload / coverage 設定
│   ├── matchers.d.ts         # @testing-library/jest-dom の bun:test 用型拡張
│   ├── test-preload.ts       # happy-dom register + cleanup + bun-bagel
│   ├── favicon.ico
│   ├── bin/
│   │   ├── html.ts            # SSG: 各コスチューム /:id/index.html を生成
│   │   └── image.ts           # sharp 画像処理 (thumbnails / images / ogp)
│   └── src/
│       ├── index.html         # ルート HTML テンプレート (SSG の置換元)
│       ├── index.tsx          # React エントリ (wouter ルーター)
│       ├── index.css          # Tailwind v4 @theme (design system v0)
│       ├── costumes.ts        # コスチュームメタデータ
│       ├── gallery.tsx        # 一覧画面
│       ├── detail.tsx         # 詳細画面
│       ├── photo.tsx          # サムネタイル
│       └── i18n/              # i18next scaffold (locales は空)
│
├── server/                   # @costume/server (静的配信専用)
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts           # Bun.serve エントリ
│       ├── infra/
│       │   └── logger.ts      # console ロガー
│       └── presentation/
│           └── index.ts       # createApp: compress + secureHeaders + /health + serveStatic
│
└── e2e/                      # @costume/e2e
    ├── package.json
    ├── tsconfig.json
    ├── playwright.config.ts
    └── basic.spec.ts          # SSG 各ページの起動確認
```

## Architecture Patterns

- **Bun ワークスペース**: `client/` + `server/` + `e2e/` のモノレポ
- **Hono サーバー**: 静的ファイル配信のみを単一 server で処理 (Nginx 廃止)。tRPC / API は持たない
- **SSG + 画像処理パイプライン**: ビルド時に `client/bin/html.ts` で各コスチュームの `/:id/index.html` を生成し、`client/bin/image.ts` で sharp によって webp サムネ / 本体画像 / OGP 画像を生成する
- **元画像 (`images/`) の置き場所**: リポジトリルート直下に置き、生成物 (`client/static/`) とは別ライフサイクルで管理する。`client/bin/image.ts` から `../images/` で参照する
- **パスエイリアス**: `~/*` → `./src/*` (`client/tsconfig.json`)

## Theme Colors (`client/src/index.css`) — yuniruyuni.net design system v0

**コンセプト**: 女性的でやわらかい、淡いトーンを基調にしたパレット。強い原色は避け、各 ramp の中央域は「くすみ・ペール寄りの中明度」に寄せる。

utility-first を徹底するため、`@theme` には **色名 + 諧調のみ** を置く。`primary` / `*-hover` / `*-border` / `text-muted` のような role / state / 用途名はトークンに含めず、Tailwind の utility + variant の組み合わせで markup 側に表現する。`--color-*: initial` で Tailwind v4 デフォルトパレットを消し、本システムの色だけを許可する制約として機能させている。

white / slate を起点に、`sky` を主軸として色相順 (sky → blue → purple → fuchsia → pink → red → orange → amber → green) で並べる。

| 色名 | 設計上の役割 |
| --- | --- |
| `white` | ベース背景・余白 |
| `slate-{50..950}` | 中立色 + 暗部 (pure black の代替、`slate-950` で止める) |
| `sky-{50..950}` | 浅い水色。本デザインシステムの主軸となる冷色アクセント |
| `blue-{50..950}` | 引き締めた青。`sky` と対になる冷色側の中核アクセント |
| `purple-{50..950}` | 上品な薄紫 (パステルラベンダー) |
| `fuchsia-{50..950}` | 鮮やかなマゼンタ。`pink` を補強する華やかな差し色 |
| `pink-{50..950}` | やわらかい桃色。フェミニンな親和トーン |
| `red-{50..950}` | 警告色 (rose 寄りに振った淡い赤。原色赤を避ける) |
| `orange-{50..950}` | 温度のある橙。暖色側の中核アクセント |
| `amber-{50..950}` | 淡い黄金。やわらかい暖色 (日差しのような明るさ) |
| `green-{50..950}` | 成功・進行中 (mint・sage 寄りに振った淡い緑。彩度を落とし威圧感を抑制) |

利用例: `bg-white text-slate-900 border border-slate-200 hover:bg-sky-50 focus:ring-blue-400`

## Testing

- **Unit**: `client/src/**/*.test.ts(x)` — Happy DOM + Testing Library + bun-bagel
- **E2E**: `e2e/*.spec.ts` — Playwright (chromium)。スナップショットは gitignore 対象、CI で再生成

## CI (.github/workflows/)

- `deploy.yml`: Docker build → Artifact Registry / GHCR push → `gcloud run services replace cloudrun.yaml`

## Cloud Run デプロイの注意点

今後の refactor で再発させてはいけない落とし穴。命名・環境変数・memory の扱いを間違えるとデプロイが壊れる。

### 命名の一貫性

`deploy.yml` の `env.SERVICE_NAME` と `cloudrun.yaml` の `metadata.name` は対応している必要がある。命名を変更する場合は両方同時に変更する。

- Service: `${SERVICE_NAME}` (= `costume`)

DB / migration job は **無い** (静的サイトのため)。

### memory の最低要件

Cloud Run **gen2 実行環境は合計 512Mi 以上の memory** が必須 (CPU always allocated の制約)。
ただし、本サービスは container が **1 つだけ** (cloudflared サイドカー無し) なので、container 単体で 512Mi 以上を要求するのではなく、`limits.memory` を `256Mi` のままにしても **gen1** 互換実行で起動できることを確認済み。memory を下げる際はこの制約を再確認すること。

### `PORT` 環境変数

`PORT` は **Cloud Run の予約環境変数** で、`containerPort` から自動注入される。`cloudrun.yaml` の `env` に `PORT` を追加してはいけない (起動失敗の原因)。
server 側は `process.env.PORT ?? 3000` で受け取るため、開発時は環境変数で上書き可能だが、本番 yaml では設定不要。

### DB / cloudflared サイドカー

DB を持たないため、`cloudflared` サイドカーや `*-db-app-password` 等の secret は **不要**。template / StreamTagInventory の cloudrun.yaml をベースにする際は、サイドカーと secret 参照を必ず削除すること。
