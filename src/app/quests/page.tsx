import Link from "next/link";
import { getQuestsGroupedByLevel } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Quest } from "@/types/quest";
import { auth } from "../../../auth";
import { getUserProgress, isQuestUnlocked } from "@/lib/progress";
import { Lock } from "lucide-react";
import SignInButton from "@/components/sign-in-button";

// レベルの説明
const levelDescriptions: Record<number, string> = {
  0: "🌱 チュートリアル",
  1: "📚 基本的な学習習慣を体験",
  2: "🔧 慣れてきたら学習習慣の強化",
  3: "🤝 共同プロジェクトを体験しよう",
  4: "🚀 個人開発 → 公開 の１連の流れに挑戦",
  5: "⛰️ 更なる高みへ！",
};

// Dayからレベルを取得
const getDayToLevel = (day: number): number => {
  if (day === 0) return 0;
  if (day >= 1 && day <= 7) return 1;
  if (day >= 8 && day <= 14) return 2;
  if (day >= 15 && day <= 21) return 3;
  if (day >= 22 && day <= 28) return 4;
  return 5;
};

export default async function QuestsPage() {
  const questsByDay = getQuestsGroupedByLevel();

  // セッション情報を取得
  const session = await auth();
  const githubUsername = session?.user?.name || "";

  // ユーザーの進捗を取得
  const userCurrentDay = await getUserProgress(githubUsername);
  const userCurrentLevel = getDayToLevel(userCurrentDay);

  // クエストをレベル（週）ごとにグループ化
  const questsByLevel: Record<number, Quest[]> = {};
  Object.entries(questsByDay).forEach(([day, quests]) => {
    const level = getDayToLevel(Number(day));
    if (!questsByLevel[level]) {
      questsByLevel[level] = [];
    }
    questsByLevel[level].push(...quests);
  });

  const levels = Object.keys(questsByLevel)
    .map(Number)
    .sort((a, b) => a - b);

  // ランクが解放されているかを判定
  const isLevelUnlocked = (level: number): boolean => {
    return level <= userCurrentLevel;
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* ヘッダー */}
        <header className="text-center my-12 space-y-12">
          <h1 className="text-7xl font-bold">クエスト一覧</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            日々の開発/学習に取り入れたい、取り組みの一覧です。
            <br />
            順番に、クエストを実践していきましょう！
          </p>
          {session?.user ? (
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 max-w-2xl mx-auto border-2 border-purple-200 dark:border-purple-800">
              <p className="text-purple-900 dark:text-purple-200 font-semibold">
                🎮 現在の進捗: Day {userCurrentDay}
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                {userCurrentDay === 0
                  ? "チュートリアルからスタート！"
                  : `次のクエスト (Day ${
                      userCurrentDay + 1
                    }) を解放するには、Day ${userCurrentDay} のクエストをクリアしましょう！`}
              </p>
            </div>
          ) : (
            <SignInButton className="border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-950" />
          )}
        </header>

        {/* クエスト一覧 */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {levels.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                クエストがまだありません
              </p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {levels.map((level) => {
                const quests = questsByLevel[level];
                const levelUnlocked = isLevelUnlocked(level);

                return (
                  <AccordionItem
                    key={level}
                    value={levelUnlocked ? `level-${level}` : ""}
                    className={`rounded-lg shadow-lg border-2 overflow-hidden ${
                      levelUnlocked
                        ? "bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-800"
                        : "bg-gray-100 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 opacity-70"
                    }`}
                  >
                    <div
                      className={`${
                        levelUnlocked ? "" : "pointer-events-none"
                      }`}
                    >
                      <AccordionTrigger
                        className={`px-6 py-4 transition-colors ${
                          levelUnlocked
                            ? "hover:bg-purple-50 dark:hover:bg-gray-700 cursor-pointer"
                            : "cursor-not-allowed hover:bg-transparent"
                        }`}
                        disabled={!levelUnlocked}
                      >
                        <div className="flex items-center gap-4 w-full">
                          {!levelUnlocked && (
                            <Lock className="w-6 h-6 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                          )}
                          <span
                            className={`text-2xl font-bold ${
                              levelUnlocked
                                ? "text-purple-600 dark:text-purple-400"
                                : "text-gray-500 dark:text-gray-500"
                            }`}
                          >
                            ランク：{level}
                          </span>
                          <span
                            className={`text-lg font-semibold ${
                              levelUnlocked
                                ? "text-gray-800 dark:text-gray-100"
                                : "text-gray-500 dark:text-gray-500"
                            }`}
                          >
                            {levelDescriptions[level]}
                          </span>
                          {levelUnlocked ? (
                            <span className="ml-auto text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full">
                              {quests.length} クエスト
                            </span>
                          ) : (
                            <span className="ml-auto text-sm bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500 px-3 py-1 rounded-full">
                              🔒 ロック中
                            </span>
                          )}
                        </div>
                      </AccordionTrigger>
                    </div>
                    {levelUnlocked && (
                      <AccordionContent className="px-6 pb-4">
                        <div className="grid gap-4 mt-4">
                          {quests.map((quest) => {
                            const isUnlocked = isQuestUnlocked(
                              quest.level,
                              userCurrentDay
                            );

                            return (
                              <div key={quest.slug} className="relative">
                                {isUnlocked ? (
                                  <Link
                                    href={`/quests/${quest.slug}`}
                                    className="block"
                                  >
                                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md transition-all cursor-pointer bg-gray-50 dark:bg-gray-900">
                                      <div className="flex items-start gap-3">
                                        <span className="text-3xl">
                                          {quest.metadata.emoji}
                                        </span>
                                        <div className="flex-1">
                                          <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                                              {quest.metadata.title}
                                            </h3>
                                            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                                              Day {quest.level}
                                            </span>
                                          </div>
                                          <div className="flex flex-wrap gap-2 mb-2">
                                            {quest.metadata.tags.map((tag) => (
                                              <span
                                                key={tag}
                                                className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
                                              >
                                                #{tag}
                                              </span>
                                            ))}
                                            <span
                                              className={`text-xs px-2 py-1 rounded ${
                                                quest.metadata.priority ===
                                                "high"
                                                  ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                                                  : quest.metadata.priority ===
                                                    "medium"
                                                  ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                                                  : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                              }`}
                                            >
                                              {quest.metadata.priority}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                ) : (
                                  <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-100 dark:bg-gray-900/50 opacity-60 cursor-not-allowed">
                                    <div className="flex items-start gap-3">
                                      <div className="relative">
                                        {/* <Lock className="w-6 h-6 text-gray-500 dark:text-gray-400" /> */}
                                        <span className="text-3xl grayscale blur-sm">
                                          {quest.metadata.emoji}
                                        </span>
                                        {/* <Lock className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 dark:text-gray-400" /> */}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                          <h3 className="font-bold text-lg text-gray-500 dark:text-gray-500">
                                            {quest.metadata.title}
                                          </h3>
                                          <span className="text-sm font-semibold text-gray-400 dark:text-gray-500">
                                            Day {quest.level}
                                          </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                          <span className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500 px-2 py-1 rounded">
                                            🔒 ロック中
                                          </span>
                                          <span className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500 px-2 py-1 rounded">
                                            Day {userCurrentDay}{" "}
                                            をクリア後に解放
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>

        <RoadmapSection />

        {/* フッター */}
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

export const RoadmapSection = () => {
  return (
    <div className="mt-24 bg-blue-200/30 dark:bg-gray-800 rounded-2xl p-10 space-y-16">
      <div className="space-y-4">
        <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
          学習のヒント
        </h2>
      </div>

      {/* grid 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ロードマップ
            </h3>
            <p className="text-gray-700 dark:text-gray-400">
              {/* ランク毎の目安です；） */}
              毎日の学習・作業の合間に、ルーティンとして取り入れていきましょう！
            </p>
          </div>

          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            {Object.entries(levelDescriptions).map(([level, desc]) => (
              <div key={level} className="flex items-center gap-3">
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  Rank.{level}
                </span>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              独学の落とし穴：
            </h3>
            <p className="text-gray-700 dark:text-gray-400">
              GitHub上の開発の痕跡、記事の執筆、SNSでの発信 etc...
              <br />
              このような「取り組みの見える化」が一切なく、開発者とのコネクションもない状態で、終わりないチュートリアル学習に陥ること。
              {/* あなたが現在学習している技術が、Pythonでも、Reactでも。
              初心者でも、個人開発でも。
              あなたの取り組みを見える化し、人に見せられる */}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              解決策：
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-400">
              <li>学習のアウトプットをコツコツ発信</li>
              <li>早い段階で Git/GitHub の使用を習慣化</li>
              <li>共同プロジェクトに参加できるようになる</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-400">
              コーディングスキルだけでなく、総合的な実践力を身につけましょう。
              <br />
              そのために、Blueberry Quest があります🫐⚔️
              {/* 今日は、ReactのuseStateを学習した！ 学習時間２時間でした！
              学んだこと： useStateとはーー。 調べた内容。記事のURL。
              記事にまとめる。 学習目的で作成したデモアプリ。 */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
