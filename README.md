# frontend-testing-book-nextjs-review

このリポジトリは「フロントエンドテスト本（仮）」のレビュー用リポジトリです。  
ここに含まれるサンプルコードは全１２章構成のうち、中盤〜終盤の第７章〜第１２章で解説するものです。  
基本的な CRUD 機能を備えた Next.js アプリをサンプルに、実践的なフロントエンドテストについて解説します。  

- 第７章 Web アプリケーション・結合テスト
- 第８章 UI コンポーネントエクスプローラー
- 第９章 ビジュアルリグレッション
- 第１０章 E2E テスト
- 第１１章 GitHub Actions で実行する UI コンポーネントテスト
- 第１２章 GitHub Actions で実行する E2E テスト

特定フロントエンドフレームワーク特有のトピック（Next.js）は、なるべく７章に限定し、  
他フロントエンドフレームワーク使用読者でも有益なものとなるよう検討しました。

## 第７章 Web アプリケーション・結合テスト

Next.js や React 特有の結合テストについて解説します。  
Context や Next.js Router を織り交ぜた結合テストが中心で、後半には MSW も登場します。
【サンプルコード】`src/components/**/*.test.tsx`

```
$ npm test
```

## 第８章 UI コンポーネントエクスプローラー

Storybook をテストツールとして使用する方法について解説します。
a11y アドオン等を使用したデバッグ手法から、Test runner を使用したブラウザテストを紹介します。
【サンプルコード】`src/components/**/*.stories.tsx`

```
$ npm run storybook:build
$ npm run storybook:ci
```

## 第９章 ビジュアルリグレッションテスト

reg-suit を使用した VRT の実践方法について解説します。  
このリポジトリにも VRT はありますが、本編はより簡素にした以下サンプルリポジトリで別途解説します。  
【サンプルコード】https://github.com/takefumi-yoshii/frontend-testing-book-vrt-review

## 第１０章 E2E テスト

Playwright を使用した、E2E テストを解説します。  
DB/Redis/S3 が連携して提供される機能を中心に、E2E テスト観点を解説。  
Playwright, Next.js, Prisma 　の詳細については解説しきれない（主旨から外れる）ため、  
理解するうえで必要最低限の解説にとどめます。
【サンプルコード】`e2e/**.spec.ts`

```
$ npm run docker:e2e:build
$ npm run docker:e2e:ci
```

## 第１１章 GitHub Actions で実行する UI コンポーネントテスト

ここまで解説した自動テストを GitHub Actions で実行する方法を解説します。  
ワークフロー解説のほか、Actions パネルの見方について取り上げます。  
【サンプルコード】`.github/workflows/*.yaml`

## 第１２章 GitHub Actions で実行する E2E テスト

GitHub Actions テスト向けの Docker ファイルの書き方、docker-compose ファイルの書き方について解説します。  
【サンプルコード】`Dockerfile.*, doceker-compose.*.yaml`

# Installation

Node.js がインストールされている開発環境で、依存モジュールをインストールします。

```bash
$ npm i
```

## Create MinIO Bucket with MinIO Client

開発環境では S3 には接続せず、ローカル環境で利用できる S3 互換の MinIO を使用します。  
MinIO Client がインストールされていない場合、はじめにインストールをします。

```bash
$ brew install minio/stable/mc
```

開発環境の MinIO にバケットを作成します。Docker Compose で MinIO サーバーを起動後、バケット生成スクリプトを実行します。

```bash
$ docker compose up -d
$ sh create-image-bucket.sh
```

## DB マイグレーションの実行

```bash
$ docker compose up -d
$ npm run prisma:migrate
```

## 開発サーバーの起動

```bash
$ docker compose up -d
$ npm run dev
```

## UI コンポーネントテストのローカル実行

```bash
$ npm run storybook:build && npm run storybook:ci
```

## E2E テストのローカル実行

```bash
$ npm run docker:e2e:build && npm run docker:e2e:ci
```
