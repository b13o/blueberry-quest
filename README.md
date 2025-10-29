# 🫐 Blueberry Quest

このプロジェクト「blueberry quest」は、
Git/GitHub を使用しながら、仲間と学習を習慣化するサービスです。
開発者としての実践力を身につけるためのクエストシステム。

RPG やゲームのような感覚で、クエストに挑戦しながら、学習を進めることができます。

クエストの領域としては、多くのユーザーがメインで学習していることは扱いません。
主に、すべての開発者が身につけるべき基本的なツール（Git/GitHub、アウトプット、コラボレーション）の使用や、ソフトスキルに焦点を当てます。

仕様としては、

- ランクが 0〜５まで存在
- アプリを使い始める際は、0 で始まる

主に、下記のようなロードマップ・区分を設定：

- 0→1: チュートリアル
- 1→2: 基本的な学習習慣の形成（git, アウトプット、、）
- 2→3: 学習習慣の強化（git/github の使用、記事）
- 3→4: 共同プロジェクトを体験しよう
- 4→5: 個人開発の流れを体験しよう
- 🎉 更なる鍛錬・習慣を維持・強化

## 要件

- GitHub の機能を活用して、より実践的な OSS のように参加できるする。
- コンテンツ（クエスト）は、github 上で、md 形式で管理する
- ユーザーのクエストへのステータス管理は、挑戦中をイシューの作成、完了を md 内に記載、する形でデータ管理する
- ユーザーは、クエストを完了した場合、サイト上のナビゲーションい従い、提出することができる。それがレビュー・承認された場合、github action によって、完了者にユーザー名が追加される。
- ユーザーは、毎日１つのクエストがアンロックされるので、将来のクエストを先に見ることはできない。

## 📖 概要

Blueberry Quest は、独学でよくある「終わりないチュートリアル学習」から脱却し、実践的なスキルを身につけることを目的としたプロジェクトです。

### 主な特徴

- **1 日 1 コンテンツ**: 毎日コツコツ続けられる学習ペース
- **週単位の構成**: レベル（週）ごとに段階的にスキルアップ
- **実践重視**: Git/GitHub を使った実際の開発フローを体験
- **進捗管理**: 個人の学習進捗をシンプルに記録

## 🗺️ 学習ロードマップ

| レベル   | 期間      | 目標                                    |
| -------- | --------- | --------------------------------------- |
| **Lv.0** | Day 0     | 🌱 チュートリアル                       |
| **Lv.1** | Day 1-7   | 📚 基本的な学習習慣を形成               |
| **Lv.2** | Day 8-14  | 🔧 Git/GitHub の使用に慣れる            |
| **Lv.3** | Day 15-21 | 🚀 個人プロジェクトの開発・公開へ       |
| **Lv.4** | Day 22-28 | 🤝 共同プロジェクトへ参加できるように   |
| **Lv.5** | Day 29+   | 🎉 総合的なベーススキルを固め、強化する |

## 📁 データ構造

### クエストファイル形式

クエストは `_data/` ディレクトリに、`{day}.{slug}.md` 形式で保存されます。

```
_data/
  ├── 0.start.md              # Day 0 (Lv.0)
  ├── 1.github-signup.md      # Day 1 (Lv.1)
  ├── 2.daily-commit.md       # Day 2 (Lv.1)
  ├── 8.pull-request.md       # Day 8 (Lv.2)
  ├── 15.week3.md             # Day 15 (Lv.3)
  ├── 22.week4.md             # Day 22 (Lv.4)
  └── progress.json           # ユーザー進捗データ
```

### クエストのフロントマター

各クエストファイルには以下のメタデータが含まれます：

```markdown
---
createdAt: "2025-10-13"
updatedAt: "2025-10-13"
title: "GitHubアカウントを作成しよう"
priority: "high"
emoji: "🐙"
tags: ["github", "初心者", "準備"]
---

# クエストの内容...
```

### 進捗管理データ（progress.json）

ユーザーの進捗は別ファイルで管理され、シンプルな構造です：

```json
{
  "users": [
    {
      "githubUsername": "tanaka",
      "currentDay": 5
    },
    {
      "githubUsername": "alice",
      "currentDay": 8
    }
  ]
}
```

## 🏗️ 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Markdown**: gray-matter, remark
- **Icons**: lucide-react

## 📂 プロジェクト構造

```
/
├── _data/                      # クエストデータ
│   ├── {day}.{slug}.md        # クエストファイル
│   └── progress.json          # 進捗データ
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (root)/           # トップページ
│   │   ├── quests/           # クエスト一覧・詳細
│   │   │   ├── page.tsx      # 一覧ページ
│   │   │   └── [level]/[slug]/
│   │   │       ├── page.tsx          # 詳細ページ
│   │   │       └── complete/         # 完了ページ
│   │   ├── how-to-submit/    # 提出方法ページ
│   │   └── layout.tsx        # レイアウト
│   ├── components/           # 共通コンポーネント
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── ui/              # shadcn/ui コンポーネント
│   ├── lib/                 # ユーティリティ
│   │   ├── markdown.ts      # マークダウン処理
│   │   └── utils.ts
│   ├── types/               # 型定義
│   │   └── quest.ts
│   └── config/              # 設定
│       └── github.ts
├── docs/                    # ドキュメント
├── public/                  # 静的ファイル
└── README.md
```

## 🎯 型定義

### Quest 型

```typescript
export interface QuestMetadata {
  createdAt: string;
  updatedAt: string;
  title: string;
  priority: string;
  emoji: string;
  tags: string[];
}

export interface Quest {
  slug: string; // "0/start" 形式
  level: number; // Day番号（0, 1, 2, ...）
  metadata: QuestMetadata;
  content: string;
  contentHtml?: string;
}
```

### Progress 型

```typescript
export interface UserProgressData {
  githubUsername: string;
  currentDay: number;
}

export interface ProgressData {
  users: UserProgressData[];
}
```

## 📝 クエストの追加方法

1. `_data/` ディレクトリに新しいマークダウンファイルを作成
2. ファイル名は `{day}.{slug}.md` 形式（例: `10.new-quest.md`）
3. フロントマターを記述
4. クエストの内容を Markdown で記述

### Day とレベルのマッピング

Day 番号から自動的にレベルが決定されます：

```typescript
const getDayToLevel = (day: number): number => {
  if (day === 0) return 0;
  if (day >= 1 && day <= 7) return 1;
  if (day >= 8 && day <= 14) return 2;
  if (day >= 15 && day <= 21) return 3;
  if (day >= 22 && day <= 28) return 4;
  return 5;
};
```
