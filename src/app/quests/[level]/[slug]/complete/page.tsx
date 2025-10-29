import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestBySlug, getAllQuests } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Trophy, Share2, Home, ArrowLeft } from "lucide-react";
import { auth } from "../../../../../../auth";
import { getUserProgress } from "@/lib/progress";

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

interface CompletePageProps {
  params: Promise<{ level: string; slug: string }>;
  searchParams: Promise<{ username?: string }>;
}

export default async function CompletePage({
  params,
  searchParams,
}: CompletePageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const day = parseInt(resolvedParams.level, 10);
  const slug = resolvedParams.slug;
  const username = resolvedSearchParams.username || "冒険者";

  const quest = await getQuestBySlug(day, slug);

  if (!quest) {
    notFound();
  }

  // ユーザーの進捗を確認
  const session = await auth();
  const githubUsername = session?.user?.name || "";
  const userCurrentDay = await getUserProgress(githubUsername);
  // const questUnlocked = isQuestUnlocked(quest.level, userCurrentDay);

  // Xシェア用のテキストとURL
  const shareText = `🎉 Blueberry Questで「${quest.metadata.title}」を完了しました！ #BlueberryQuest #GitHub`;
  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(
    `https://blueberry-quest.vercel.app/quests/${quest.slug}`
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* ナビゲーション */}
        <div className="mb-6 flex gap-2">
          <Link href={`/quests/${quest.slug}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              クエストに戻る
            </Button>
          </Link>
          <Link href="/quests">
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4 mr-2" />
              クエスト一覧
            </Button>
          </Link>
        </div>

        {/* メインコンテンツ */}
        <div className="bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 shadow-xl">
          {/* 完了カード */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 space-y-8">
            {/* お祝いヘッダー */}
            <div className="text-center space-y-6">
              {/* アニメーション絵文字 */}
              <div className="flex justify-center gap-4 text-6xl animate-bounce">
                <span>🎉</span>
                <span className="text-8xl">{quest.metadata.emoji}</span>
                <span>🎉</span>
              </div>

              {/* タイトル */}
              <div className="space-y-4">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Trophy className="w-5 h-5 mr-2 inline" />
                  クエスト完了！
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  おめでとうございます！
                </h1>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {username} さん
                </p>
              </div>
            </div>

            {/* クエスト情報 */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">{quest.metadata.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-semibold">
                      Day {quest.level}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {quest.metadata.title}
                  </h2>
                </div>
              </div>

              {/* タグ */}
              <div className="flex flex-wrap justify-center gap-2">
                {quest.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 達成メッセージ */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-green-900 dark:text-green-100">
                    クエストを完了しました！
                  </h3>
                  <p className="text-green-800 dark:text-green-300">
                    あなたは「{quest.metadata.title}
                    」をクリアし、新しいスキルを習得しました。
                    <br />
                    この調子で次のクエストにも挑戦しましょう！
                  </p>
                </div>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="space-y-4">
              {/* Xシェアボタン */}
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg py-6"
                >
                  <Share2 className="w-6 h-6 mr-2" />
                  達成を X (Twitter) でシェアする
                </Button>
              </a>

              {/* その他のアクション */}
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/quests" className="block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-950"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    次のクエストを探す
                  </Button>
                </Link>
                <Link href="/" className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    <Home className="w-5 h-5 mr-2" />
                    ホームに戻る
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* サブメッセージ */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              🫐 冒険を続けて、さらなる成長を目指しましょう！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
