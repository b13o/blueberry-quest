import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HowToSubmitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* ヘッダー */}
        <div className="mb-6">
          <Link href="/quests">
            <Button variant="outline" size="sm">
              ← クエスト一覧に戻る
            </Button>
          </Link>
        </div>

        {/* メインコンテンツ */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              📚 クエストの提出方法
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              クエストに挑戦して、完了報告を提出する流れを説明します
            </p>
          </header>

          {/* フローチャート */}
          <div className="mb-12 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              🗺️ 完了までの流れ
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  emoji: "🎯",
                  title: "クエストを選ぶ",
                  description: "挑戦したいクエストを選択",
                },
                {
                  step: 2,
                  emoji: "🚀",
                  title: "Issueを作成",
                  description:
                    "「挑戦する」ボタンからIssueを作成して作業開始を宣言",
                },
                {
                  step: 3,
                  emoji: "💪",
                  title: "作業・学習",
                  description: "クエストの成功条件を満たすように作業",
                },
                {
                  step: 4,
                  emoji: "✅",
                  title: "完了報告",
                  description: "Issueに「完了しました」とコメント",
                },
                {
                  step: 5,
                  emoji: "🤖",
                  title: "PR自動作成",
                  description: "GitHub Actionsが自動的にPRを作成",
                },
                {
                  step: 6,
                  emoji: "📝",
                  title: "成果物を提出",
                  description:
                    "PRに成果物（URL、スクリーンショットなど）を投稿",
                },
                {
                  step: 7,
                  emoji: "👀",
                  title: "レビュー",
                  description: "メンテナーがレビュー",
                },
                {
                  step: 8,
                  emoji: "🎉",
                  title: "完了！",
                  description: "PRがマージされてクエスト完了",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="text-3xl">{item.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 詳細説明 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              📖 詳細ガイド
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="step-1"
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-purple-50 dark:hover:bg-gray-700">
                  <span className="text-lg font-semibold">
                    Step 1: Issueの作成方法
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                  <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                    <li>
                      挑戦したいクエストの詳細ページで
                      <strong>「🚀 クエストに挑戦する」</strong>
                      ボタンをクリック
                    </li>
                    <li>GitHubのIssue作成画面が開きます</li>
                    <li>
                      以下の項目を入力：
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li>レベル</li>
                        <li>クエストID（例: level-0/start）</li>
                        <li>クエスト名</li>
                        <li>GitHubユーザー名</li>
                        <li>目標・学習計画</li>
                      </ul>
                    </li>
                    <li>確認事項にチェックを入れる</li>
                    <li>
                      <strong>「Submit new issue」</strong>をクリック
                    </li>
                  </ol>
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      💡 <strong>ポイント：</strong>
                      Issueを作成することで、他の人に「このクエストに挑戦中です！」と伝えることができます。
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="step-2"
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-purple-50 dark:hover:bg-gray-700">
                  <span className="text-lg font-semibold">
                    Step 2: 作業・学習
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p>クエストの成功条件を満たすように作業を進めます。</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        作業のコツ：
                      </h4>
                      <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>成功条件を一つずつ確認しながら進める</li>
                        <li>
                          わからないことがあったら、IssueやDiscussionで質問
                        </li>
                        <li>
                          証拠になるもの（スクリーンショット、URLなど）を保存しておく
                        </li>
                        <li>学んだことをメモしておく（振り返りで使用）</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-500">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚠️ <strong>注意：</strong>
                        GitHubのプライベート情報やアクセストークンなどは公開しないように注意してください。
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="step-3"
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-purple-50 dark:hover:bg-gray-700">
                  <span className="text-lg font-semibold">
                    Step 3: 完了報告（PR自動作成）
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p>作業が完了したら、自動的にPRが作成されます。</p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        手順：
                      </h4>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>作成したIssueのページを開く</li>
                        <li>
                          コメント欄に以下のいずれかを投稿：
                          <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                            <li>「完了しました」</li>
                            <li>「完了」</li>
                            <li>「done」</li>
                            <li>「Done」</li>
                          </ul>
                        </li>
                        <li>GitHub Actionsが自動的にPRを作成（数秒〜数分）</li>
                        <li>IssueにPRへのリンクがコメントされます</li>
                      </ol>
                    </div>
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded border-l-4 border-green-500">
                      <p className="text-sm text-green-800 dark:text-green-200">
                        ✨ <strong>自動化の魔法：</strong>
                        PRには自動的にあなたのユーザー名が完了者リストに追加されます！
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="step-4"
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-purple-50 dark:hover:bg-gray-700">
                  <span className="text-lg font-semibold">
                    Step 4: 成果物の提出
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p>
                      作成されたPRに、成功条件を満たしたことを証明する成果物を投稿します。
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        提出するもの：
                      </h4>
                      <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>
                          <strong>URL：</strong>
                          記事、リポジトリ、デモサイトなど
                        </li>
                        <li>
                          <strong>スクリーンショット：</strong>
                          作業結果、GitHubのプロフィールなど
                        </li>
                        <li>
                          <strong>振り返り：</strong>
                          学んだこと、苦労したこと、次の目標
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded p-4 border border-gray-200 dark:border-gray-700">
                      <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                        投稿例：
                      </h5>
                      <pre className="text-sm bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto">
                        {`## 提出物

### 成果物
- GitHub Discussions投稿: https://github.com/...
- プロフィール: https://github.com/username

### スクリーンショット
[画像を添付]

### 振り返り
GitHub Discussionsの使い方を学びました。
特にカテゴリの選び方が重要だと感じました。`}
                      </pre>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="step-5"
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-purple-50 dark:hover:bg-gray-700">
                  <span className="text-lg font-semibold">
                    Step 5: レビューとマージ
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p>
                      メンテナーが提出物をレビューし、問題なければPRがマージされます。
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        レビュー中：
                      </h4>
                      <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>
                          修正依頼があった場合は、PRのコメントに返信して対応
                        </li>
                        <li>追加の証拠が必要な場合は、コメントで追加</li>
                        <li>質問があれば気軽にコメントで聞いてください</li>
                      </ul>
                    </div>
                    <div className="space-y-3 mt-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        マージ後：
                      </h4>
                      <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>
                          あなたのユーザー名がクエストの完了者リストに表示されます
                        </li>
                        <li>クエスト一覧ページで完了者数が増えます</li>
                        <li>次のクエストに挑戦しましょう！</li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded border-l-4 border-purple-500">
                      <p className="text-sm text-purple-800 dark:text-purple-200">
                        🎉 <strong>おめでとうございます！</strong>
                        クエスト完了です。継続して学習を進めましょう！
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              ❓ よくある質問
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Q: PRが自動作成されない場合は？
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  A:
                  コメントに「完了しました」などのキーワードが含まれているか確認してください。数分待っても作成されない場合は、Discussionで質問してください。
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Q: 同じクエストを複数回挑戦できますか？
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  A:
                  学習目的なら何度でも挑戦できますが、完了者リストには1回だけ追加されます。
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Q: 途中で諦めた場合は？
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  A:
                  Issueをクローズするだけで大丈夫です。また挑戦したくなったら新しいIssueを作成してください。
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Q: レビューにはどのくらい時間がかかりますか？
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  A:
                  通常、数日以内にレビューされますが、メンテナーの状況により変動します。
                </p>
              </div>
            </div>
          </div>

          {/* アクション */}
          <div className="text-center space-y-4">
            <Link href="/quests">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                🎯 クエスト一覧に戻る
              </Button>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              わからないことがあれば、
              <a
                href="https://github.com/your-username/blueberry-quest/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Discussions
              </a>
              で質問してください！
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

