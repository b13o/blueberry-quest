import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HowToSubmitSection = () => {
  return (
    <div className="mt-24 bg-purple-50 dark:bg-gray-800 rounded-2xl p-10 space-y-16">
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
        Blueberry Quest の始め方
      </h2>
      {/* grid 3 cols. 3 square boxes. each box has a title and a description */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            step: 1,
            emoji: "🌱",
            title: "旅立ち",
            description: "まずは、最初のクエストに参加しよう！",
          },
          {
            step: 2,
            emoji: "📝",
            title: "回答を提出",
            description:
              "クエストは、完了したら回答を提出してチェックを受けよう！",
          },
          {
            step: 3,
            emoji: "⚔️",
            title: "トライアンドエラー",
            description: "さまざまなクエスト（習慣）を実践してみよう！",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="bg-background aspect-square rounded-xl space-y-4 p-4 flex flex-col"
          >
            {/* 左上に丸ボーダーにindexを表示 */}
            <div className="flex items-center gap-4">
              <span className="text-xl border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
                {item.step}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {item.title}
              </h3>
            </div>
            <div className="w-full py-12 bg-purple-50 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-4xl">{item.emoji}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center space-y-4">
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link href="/quests">今すぐ始める →</Link>
        </Button>
        <p className="text-purple-600 dark:text-purple-400 font-bold">
          クエストをこなしてランクを上げよう👑
        </p>
      </div>
    </div>
  );
};
