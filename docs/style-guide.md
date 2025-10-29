# Blueberry Quest デザインスタイルガイド

このドキュメントは、Blueberry Quest アプリケーション全体で統一感のある UI を実装するためのデザインガイドラインです。

## 📐 基本設計思想

- **明るく親しみやすい**: RPG 感覚を演出する楽しいデザイン
- **視認性の高さ**: 大きなタイポグラフィと適切なコントラスト
- **モダンな UI**: グラデーション、ガラスモーフィズム、滑らかなアニメーション
- **ダークモード対応**: 全ページでライト/ダークモード両対応

---

## 🎨 カラーパレット

### ブランドカラー

- **Primary**: Purple 系 (`purple-600`, `purple-400`, `purple-50`)
- **Secondary**: Blue 系 (`blue-600`, `blue-400`, `blue-50`)
- **Gradient**: `from-purple-600 to-blue-600` (テキストや背景に使用)

### 背景色

```tsx
// ページ全体の背景
className =
  "bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800";

// カードやセクションの背景
className = "bg-white dark:bg-gray-800";

// サブ背景 (強調エリア)
className = "bg-purple-50 dark:bg-gray-800";
className = "bg-blue-50 dark:bg-gray-800";
```

### テキストカラー

```tsx
// 見出し
className = "text-gray-900 dark:text-gray-100";

// 本文
className = "text-gray-700 dark:text-gray-300";

// サブテキスト・補足
className = "text-gray-600 dark:text-gray-400";
className = "text-gray-500 dark:text-gray-500";

// アクセントテキスト
className = "text-purple-600 dark:text-purple-400";
className = "text-blue-600 dark:text-blue-400";
```

### ボーダー

```tsx
className = "border-gray-200 dark:border-gray-700";
className = "border-purple-200 dark:border-purple-800";
className = "border-purple-300 dark:border-purple-700";
```

---

## 📝 タイポグラフィ

### フォント

- **Sans Serif**: Geist Sans（デフォルト）
- **Monospace**: Geist Mono（コードや technical 表示に使用）

### 見出しサイズ

```tsx
// メインヒーロータイトル (H1)
className = "text-7xl font-bold";

// セクションタイトル (H2)
className = "text-5xl font-bold";

// サブセクションタイトル (H3)
className = "text-4xl font-bold";

// カードタイトル等 (H3-H4)
className = "text-3xl font-bold";
className = "text-2xl font-bold";

// 小見出し
className = "text-xl font-bold";
className = "text-lg font-bold";
```

### 本文サイズ

```tsx
// 通常の本文
className = "text-lg";

// デフォルト
className = "text-base";

// 小さいテキスト（補足など）
className = "text-sm";
className = "text-xs";
```

### グラデーションテキスト

```tsx
// タイトルなどに使用
className =
  "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent";
```

---

## 📦 レイアウト

### コンテナ

```tsx
// 標準コンテナ（最大幅6xl）
<div className="container mx-auto px-4 py-12 max-w-6xl">
  {/* コンテンツ */}
</div>

// 中サイズコンテナ（最大幅5xl）
<div className="container mx-auto px-4 py-12 max-w-5xl">
  {/* コンテンツ */}
</div>

// 小サイズコンテナ（最大幅3xl）
<div className="max-w-3xl mx-auto">
  {/* コンテンツ */}
</div>
```

### スペーシング

```tsx
// セクション間の余白
className = "py-24"; // 大きなセクション
className = "py-12"; // 中程度のセクション

// 要素間の余白
className = "space-y-12"; // 大きな間隔
className = "space-y-8"; // 中程度の間隔
className = "space-y-6"; // 小さい間隔
className = "space-y-4"; // 最小の間隔

// マージン
className = "mb-12"; // 大
className = "mb-8"; // 中
className = "mb-4"; // 小
className = "mt-24"; // セクション間
```

### グリッドレイアウト

```tsx
// 2カラム
<div className="grid md:grid-cols-2 gap-8">
  {/* コンテンツ */}
</div>

// 3カラム
<div className="grid grid-cols-3 gap-4">
  {/* コンテンツ */}
</div>

// 4カラム（レスポンシブ）
<div className="grid md:grid-cols-4 gap-4">
  {/* コンテンツ */}
</div>
```

---

## 🎴 カードコンポーネント

### 基本カード

```tsx
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
  {/* コンテンツ */}
</div>
```

### ホバーエフェクト付きカード

```tsx
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:scale-105 transition-transform cursor-pointer">
  {/* コンテンツ */}
</div>
```

### ボーダー付きカード

```tsx
<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md transition-all">
  {/* コンテンツ */}
</div>
```

### アクセントカード（色付き背景）

```tsx
<div className="bg-purple-50 dark:bg-gray-800 rounded-xl p-10">
  {/* コンテンツ */}
</div>

<div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-12">
  {/* コンテンツ */}
</div>
```

### ガラスモーフィズムエフェクト

```tsx
<div className="bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-16">
  <div className="bg-background rounded-3xl p-8">{/* コンテンツ */}</div>
</div>
```

---

## 🔘 ボタン

### サイズ

```tsx
import { Button } from "@/components/ui/button";

// 大きいボタン（CTA用）
<Button size="lg" className="text-lg px-8 py-6">
  テキスト
</Button>

// 通常サイズ
<Button>テキスト</Button>

// 小さいボタン
<Button size="sm">テキスト</Button>
```

### バリアント

```tsx
// Primary（デフォルト）
<Button>Primary Button</Button>

// Outline（セカンダリーアクション）
<Button variant="outline">Outline Button</Button>

// Ghost（ナビゲーション等）
<Button variant="ghost">Ghost Button</Button>
```

### カスタムスタイル

```tsx
// Purpleアクセント付きOutlineボタン
<Button
  variant="outline"
  className="border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-950"
>
  使い方
</Button>
```

---

## 🏷️ バッジ

```tsx
import { Badge } from "@/components/ui/badge";

// セクションラベル
<Badge variant="secondary">コンセプト</Badge>

// タグ
<Badge variant="outline">#github</Badge>
<Badge variant="outline">#discussions</Badge>

// カラーバリエーション（優先度表示等）
<span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">
  high
</span>

<span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
  medium
</span>

<span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
  low
</span>

<span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
  #tag
</span>

<span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full">
  3 クエスト
</span>
```

---

## 🎯 角丸（Border Radius）

```tsx
// 大きい角丸（セクション、大きなカード）
className = "rounded-3xl";

// 中程度の角丸（カード）
className = "rounded-2xl";
className = "rounded-xl";

// 小さい角丸（小要素）
className = "rounded-lg";
className = "rounded-md";

// 完全な円形
className = "rounded-full";
```

---

## ✨ シャドウ

```tsx
// カードの標準シャドウ
className = "shadow-lg";

// ホバー時のシャドウ
className = "hover:shadow-md";

// 軽いシャドウ
className = "shadow-xs";
```

---

## 🎨 アイコン・絵文字

### 絵文字の使い方

```tsx
// 大きな絵文字（カード内の主要ビジュアル）
<span className="text-8xl">💬</span>

// 中サイズ絵文字（セクション装飾）
<span className="text-4xl">{item.emoji}</span>

// 小サイズ絵文字（インライン）
<span className="text-3xl">🫐⚔️</span>
```

### Lucide Icons

```tsx
import { ArrowRightCircle, FileText, Github } from "lucide-react";

// 大きいアイコン（カード内）
<FileText className="w-16 h-16 text-blue-500 dark:text-blue-300" />

// 中サイズアイコン（ボタン内など）
<ArrowRightCircle className="w-8 h-8" />

// 小サイズアイコン（インライン）
<Github className="w-6 h-6" />
```

---

## 🔄 トランジション・アニメーション

### ホバーエフェクト

```tsx
// スケールアップ
className = "hover:scale-105 transition-transform";

// 色の変化
className = "hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors";

// 複合的なトランジション
className =
  "hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md transition-all";

// 透明度の変化
className = "hover:opacity-80 transition-opacity";
```

### カーソル

```tsx
className = "cursor-pointer"; // クリック可能な要素
```

---

## 🧩 コンポーネントパターン例

### セクション見出し

```tsx
<div>
  <Badge variant="secondary" className="mb-4">
    セクション名
  </Badge>
  <h2 className="text-5xl font-bold mb-12 text-gray-900 dark:text-gray-100">
    見出しテキスト
  </h2>
  <p className="text-gray-700 dark:text-gray-400 text-lg mb-12">説明文...</p>
</div>
```

### アイコンカード

```tsx
<div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-12 space-y-4 flex flex-col items-center justify-center">
  <IconComponent className="w-16 h-16 text-blue-500 dark:text-blue-300" />
  <h3 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100">
    カードタイトル
  </h3>
</div>
```

### ステップカード（番号付き）

```tsx
<div className="bg-background rounded-xl p-4 flex flex-col space-y-4">
  <div className="flex items-center gap-4">
    <span className="text-xl border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
      1
    </span>
    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
      ステップタイトル
    </h3>
  </div>
  <p className="text-gray-700 dark:text-gray-400">説明文...</p>
</div>
```

### レベル表示

```tsx
<span className="font-bold text-purple-600 dark:text-purple-400">Lv.1</span>
```

---

## 🎯 ページ構造のテンプレート

### 標準ページレイアウト

```tsx
export default function PageName() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* ヘッダー */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            ページタイトル
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">説明文</p>
        </header>

        {/* メインコンテンツ */}
        <div className="space-y-6">{/* コンテンツ */}</div>

        {/* フッター（ホームへ戻るボタンなど） */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              ホームに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

## 📱 レスポンシブデザイン

### ブレークポイント

- `sm:` - 640px 以上
- `md:` - 768px 以上
- `lg:` - 1024px 以上
- `xl:` - 1280px 以上

### 使用例

```tsx
// フレックス方向の変更
className = "flex flex-col sm:flex-row gap-4";

// グリッドのカラム数変更
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

// テキストサイズの調整
className = "text-5xl md:text-7xl";
```

---

## ⚠️ 注意事項

1. **ダークモード対応の徹底**

   - 全ての色指定で `dark:` バリアントを必ず記述する
   - テキストカラー、背景色、ボーダーカラーすべてに対応

2. **アクセシビリティ**

   - コントラスト比を十分に確保する
   - インタラクティブな要素には適切なホバーステートを設定

3. **統一感**

   - 角丸のサイズは同じ種類の要素では統一する
   - スペーシングは一貫したパターンを使用する

4. **パフォーマンス**
   - 不要なトランジションを避ける
   - アニメーションは控えめに使用する

---

## 🔗 参考実装

完全な実装例は以下のファイルを参照してください：

- `src/app/(root)/page.tsx` - トップページの実装
- `src/app/(root)/_components/hero.tsx` - ヒーローセクション
- `src/app/(root)/_components/concept-section.tsx` - コンセプトセクション
- `src/app/(root)/_components/benefits-section.tsx` - 特徴セクション
- `src/app/(root)/_components/how-to-submit-section.tsx` - 使い方セクション
- `src/components/header.tsx` - ヘッダーコンポーネント
- `src/components/footer.tsx` - フッターコンポーネント

---

**最終更新**: 2025-10-22
