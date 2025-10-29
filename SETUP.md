# 🫐 Blueberry Quest - セットアップガイド

このドキュメントでは、Blueberry Quest のセットアップ方法を説明します。

## 📋 前提条件

- Node.js 20 以上
- npm または yarn
- GitHub アカウント

## 🚀 初期セットアップ

### 1. リポジトリの設定

#### GitHub 設定ファイルの更新

`src/config/github.ts` を開き、実際のリポジトリ情報に更新してください：

```typescript
export const GITHUB_CONFIG = {
  owner: "b13o", // ← あなたのGitHubユーザー名
  repo: "blueberry-quest", // ← リポジトリ名
  branch: "main", // ← デフォルトブランチ
} as const;
```

### 2. GitHub リポジトリの設定

#### Issues を有効化

1. リポジトリの Settings → General
2. "Features" セクションで "Issues" にチェック

#### Discussions を有効化（推奨）

1. リポジトリの Settings → General
2. "Features" セクションで "Discussions" にチェック

#### GitHub Actions の権限設定

1. リポジトリの Settings → Actions → General
2. "Workflow permissions" で以下を設定：
   - ✅ "Read and write permissions" を選択
   - ✅ "Allow GitHub Actions to create and approve pull requests" にチェック

### 3. 必要なパッケージのインストール

GitHub Actions で使用するパッケージをワークフロー内で利用できるようにします。

`.github/workflows/quest-completion.yml` を確認し、以下の npm packages が利用可能であることを確認：

- `gray-matter`（すでに `package.json` にインストール済み）

### 4. ラベルの作成

以下のラベルをリポジトリに作成してください：

1. リポジトリの "Issues" → "Labels" → "New label"
2. 以下のラベルを作成：

| ラベル名            | 色        | 説明             |
| ------------------- | --------- | ---------------- |
| `quest-in-progress` | `#FFA500` | クエスト作業中   |
| `quest-completion`  | `#00FF00` | クエスト完了申請 |
| `needs-review`      | `#FBCA04` | レビュー待ち     |

### 5. ブランチ保護ルール（推奨）

main ブランチへの直接プッシュを防ぎ、PR レビューを必須にします。

1. Settings → Branches → "Add rule"
2. Branch name pattern: `main`
3. 以下を設定：
   - ✅ "Require a pull request before merging"
   - ✅ "Require approvals" (1 以上)

## 🧪 動作テスト

### ローカル開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアクセスできます。

### クエストの追加テスト

1. `_data/level-0/test.md` を作成
2. フロントマターとコンテンツを記述
3. ブラウザで表示を確認

### GitHub Actions のテスト

1. テスト用の Issue を作成（Issue template を使用）
2. コメントに「完了しました」と投稿
3. GitHub Actions が実行され、PR が作成されることを確認
4. PR に成果物を投稿
5. PR をレビュー＆マージ

## 📁 ディレクトリ構造

```
blueberry-quest/
├── _data/                    # クエストのマークダウンファイル
│   ├── level-0/
│   ├── level-1/
│   ├── level-2/
│   ├── level-3/
│   ├── level-4/
│   └── level-5/
├── .github/
│   ├── ISSUE_TEMPLATE/       # Issueテンプレート
│   │   └── quest-start.yml
│   ├── workflows/            # GitHub Actions
│   │   └── quest-completion.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── src/
│   ├── app/
│   │   ├── (root)/
│   │   │   └── page.tsx      # ホームページ
│   │   ├── quests/
│   │   │   ├── page.tsx      # クエスト一覧
│   │   │   └── [...id]/
│   │   │       └── page.tsx  # クエスト詳細
│   │   ├── how-to-submit/
│   │   │   └── page.tsx      # 提出方法ガイド
│   │   └── ...
│   ├── components/           # UIコンポーネント
│   ├── config/
│   │   └── github.ts         # GitHub設定
│   ├── lib/
│   │   └── markdown.ts       # マークダウン処理
│   └── types/
│       └── quest.ts          # 型定義
└── package.json
```

## 📝 クエストの作成方法

### クエストファイルの構造

`_data/level-X/quest-name.md` を作成：

```markdown
---
createdAt: "2025-10-13"
updatedAt: "2025-10-13"
title: "クエストのタイトル"
priority: "low" # low, medium, high
emoji: "🎯"
tags: ["タグ1", "タグ2"]
completers: []
---

# Quest: クエスト名

## 概要

クエストの説明

## 参照資料

- リンク 1
- リンク 2

## 成功条件

- 条件 1
- 条件 2

## ヒント

💡 ヒントがあればここに
```

### フロントマターの説明

- `createdAt`: クエスト作成日（YYYY-MM-DD 形式）
- `updatedAt`: クエスト更新日（YYYY-MM-DD 形式）
- `title`: クエストのタイトル
- `priority`: 優先度（low, medium, high）
- `emoji`: クエストを表す絵文字
- `tags`: タグの配列
- `completers`: 完了者の GitHub ユーザー名の配列（空配列で開始）

## 🔧 カスタマイズ

### デザインの変更

- カラースキーム: `src/app/globals.css`
- コンポーネント: `src/components/`

### レベル数の変更

レベル数を変更する場合は、以下のファイルを更新：

- `src/lib/markdown.ts` の `getAllQuests()` 関数
- `src/app/quests/page.tsx` の `levelDescriptions`
- `src/app/(root)/page.tsx` のロードマップ

## 🐛 トラブルシューティング

### PR が自動作成されない

1. GitHub Actions の権限設定を確認
2. ワークフローのログを確認（Actions タブ）
3. Issue に `quest-in-progress` ラベルが付いているか確認
4. コメントに「完了しました」などのキーワードが含まれているか確認

### ビルドエラー

```bash
# キャッシュをクリア
rm -rf .next node_modules
npm install
npm run dev
```

## 📚 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 コントリビューション

バグ報告や機能提案は、GitHub の Issues または Discussions でお願いします！

---

Happy Questing! 🫐✨
