import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestBySlug, getAllQuests } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { getGitHubUrls } from "@/config/github";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightCircle, Swords } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { auth } from "../../../../../auth";
import { getUserProgress, isQuestUnlocked } from "@/lib/progress";

// 動的ルートのパラメータを生成
export async function generateStaticParams() {
  const allQuests = getAllQuests();
  return allQuests.map((quest) => {
    const [day, slug] = quest.slug.split("/");
    return {
      level: day,
      slug: slug,
    };
  });
}

interface QuestDetailPageProps {
  params: Promise<{ level: string; slug: string }>;
}

export default async function QuestDetailPage({
  params,
}: QuestDetailPageProps) {
  const resolvedParams = await params;
  const day = parseInt(resolvedParams.level, 10);
  const slug = resolvedParams.slug;
  const quest = await getQuestBySlug(day, slug);

  if (!quest) {
    notFound();
  }

  // ユーザーの進捗を確認
  const session = await auth();
  const githubUsername = session?.user?.name || "";
  const userCurrentDay = await getUserProgress(githubUsername);
  const questUnlocked = isQuestUnlocked(quest.level, userCurrentDay);

  // ロックされている場合は、ロックページを表示
  if (!questUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 text-center space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <span className="text-8xl grayscale blur-sm">
                  {quest.metadata.emoji}
                </span>
                {/* <Lock className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-gray-500 dark:text-gray-400" /> */}
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                🔒 このクエストはロックされています
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {quest.metadata.title}
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border-2 border-purple-200 dark:border-purple-800">
              <p className="text-purple-900 dark:text-purple-200 font-semibold">
                現在の進捗: Day {userCurrentDay}
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">
                このクエスト (Day {quest.level}) にアクセスするには、Day{" "}
                {quest.level - 1} までのクエストをクリアする必要があります。
              </p>
            </div>

            <div className="space-y-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="/quests">クエスト一覧に戻る</Link>
              </Button>

              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href="/">ホームに戻る</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const githubUrls = getGitHubUrls(quest.slug, quest.metadata.title);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* ヘッダー */}
        <div className="mb-6">
          <Link href="/quests">
            <Button variant="outline" size="sm">
              ← クエスト一覧に戻る
            </Button>
          </Link>
        </div>

        {/* 3:1 で右側にナビゲーションを配置 */}
        <div className="grid grid-cols-4 gap-6">
          {/* クエスト情報 */}
          <article className="bg-zinc-100 dark:bg-gray-800 rounded-l shadow-xl p-8 col-span-3 space-y-8">
            {/* 装飾 */}
            <div className="text-sm relative flex items-center gap-2 text-gray-500 dark:text-gray-400">
              {Array.from({ length: 20 }).map((_, i) => (
                <Swords
                  key={i}
                  className="w-12 h-12 text-purple-300 fill-purple-300"
                />
              ))}
              <span className="text-gray-900 dark:text-gray-400 text-xl font-bold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Quest: 依頼書
              </span>
            </div>

            {/* タイトルエリア */}
            <header className="border-b border-dashed  border-gray-500 dark:border-gray-700 pb-6">
              {/* <div className="flex items-start gap-4 mb-4">
                <span className="text-6xl">{quest.metadata.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-semibold">
                      Level {quest.level}
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        quest.metadata.priority === "high"
                          ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                          : quest.metadata.priority === "medium"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      }`}
                    >
                      {quest.metadata.priority}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {quest.metadata.title}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {quest.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div> */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <div className="bg-green-100 aspect-square rounded-3xl">
                    <span className="text-8xl flex items-center justify-center h-full">
                      {quest.metadata.emoji}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 text-left space-y-6 p-4">
                  <h2 className="text-4xl font-bold">{quest.metadata.title}</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    GitHub Discussions
                    を使用して、コミュニケーションをとりましょう。プロジェクトに関する議論、知見の蓄積、質問などを自由に行えます。
                  </p>
                  {/* レベルと、タグを表示 */}
                  <div className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-4">
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      Level: {quest.level}
                    </span>
                    {/* <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        quest.metadata.priority === "high"
                          ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                          : quest.metadata.priority === "medium"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      }`}
                    >
                      {quest.metadata.priority}
                    </span> */}

                    <div className="flex gap-2">
                      {quest.metadata.tags.map((tag) => (
                        <Badge variant="outline" key={tag}>
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {/* アイコン */}
                  <div className="flex justify-end">
                    <Link href="/quests">
                      <Button
                        variant="ghost"
                        size="lg"
                        className="text-lg px-8 py-6"
                      >
                        クエストに挑戦する
                        <ArrowRightCircle className="w-8 h-8" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* メタ情報 */}
              {/* <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400 mt-4">
                <div className="flex items-center gap-2">
                  <span>📅 作成日:</span>
                  <span className="font-semibold">
                    {quest.metadata.createdAt}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔄 更新日:</span>
                  <span className="font-semibold">
                    {quest.metadata.updatedAt}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🏆 完了者:</span>
                  <span className="font-semibold">
                    {quest.metadata.completers.length}人
                  </span>
                </div>
              </div> */}

              {/* 完了者リスト */}
              {/* {quest.metadata.completers.length > 0 && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                    🎉 このクエストを完了した冒険者たち:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quest.metadata.completers.map((completer) => (
                      <span
                        key={completer}
                        className="inline-block bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm"
                      >
                        {completer}
                      </span>
                    ))}
                  </div>
                </div>
              )} */}

              <div className="text-sm relative flex items-center gap-2 text-gray-500 dark:text-gray-400">
                {Array.from({ length: 20 }).map((_, i) => (
                  <Swords
                    key={i}
                    className="w-12 h-12 text-purple-300 fill-purple-300"
                  />
                ))}
              </div>
            </header>

            {/* クエストコンテンツ */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                       prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                       prose-p:text-gray-700 dark:prose-p:text-gray-300
                       prose-a:text-purple-600 dark:prose-a:text-purple-400
                       prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                       prose-code:text-purple-600 dark:prose-code:text-purple-400
                       prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950"
              dangerouslySetInnerHTML={{ __html: quest.contentHtml || "" }}
            />
          </article>
          <div className="col-span-1">
            {/* アクションボタン */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>次のステップ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <a
                    href={githubUrls.newIssue}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button size="lg" className="w-full">
                      🚀 クエストに挑戦する
                    </Button>
                  </a>
                  <a
                    href={githubUrls.newQuestion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" size="lg" className="w-full">
                      💬 質問する
                    </Button>
                  </a>
                </div>

                {/* 使い方ガイドリンク */}
                <div className="mt-4 text-center">
                  <Link
                    href="/how-to-submit"
                    className="text-sm text-gray-700 dark:text-gray-300 underline hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    📚 提出方法を確認する
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
