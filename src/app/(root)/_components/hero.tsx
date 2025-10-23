import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Hero = () => {
  return (
    <div className="text-center py-24">
      <div className="space-y-12">
        <h1 className="text-7xl font-bold">開発者としての習慣を形成する</h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          RPG感覚で、プログラマーとしての慣習を実践！
          <br />
          クエストに挑戦して、自分に最適なルーティンを構築しよう 🚀
        </p>

        {/* CTA ボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link href="/quests">
            <Button size="lg" className="text-lg px-8 py-6">
              クエストを見る
            </Button>
          </Link>
          <Link href="/how-to-submit">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              使い方を学ぶ
            </Button>
          </Link>
        </div>
      </div>
      {/* グラスモーフィズムのエフェクト */}
      <div className="bg-gradient-to-br mt-24 relative from-blue-200/30 to-purple-200/30 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-16">
        {/* 左上に、「クエスト」という文字を表示 */}
        <div className="absolute top-3 left-4">
          <span className="text-3xl font-bold font-mono text-gray-700 dark:text-gray-300">
            ⚔️ Quests ⚔️
          </span>
        </div>
        {/* 左右中央に、スライド用の矢印を表示 */}
        <div className="absolute top-1/2 left-3">
          <ArrowLeftCircle className="w-8 h-8 hover:text-gray-700 text-gray-500 dark:text-gray-300" />
        </div>
        <div className="absolute top-1/2 right-3">
          <ArrowRightCircle className="w-8 h-8 hover:text-gray-700 text-gray-500 dark:text-gray-300" />
        </div>
        <div className="bg-background rounded-3xl p-8">
          {/* 左右3:7 の比率でレイアウト */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="bg-green-100 aspect-square rounded-3xl">
                <span className="text-8xl flex items-center justify-center h-full">
                  💬
                </span>
              </div>
            </div>
            <div className="col-span-2 text-left space-y-6 p-4">
              <h2 className="text-4xl font-bold">
                GitHub Discussions を使いこなそう！
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                GitHub Discussions
                を使用して、コミュニケーションをとりましょう。プロジェクトに関する議論、知見の蓄積、質問などを自由に行えます。
              </p>
              {/* レベルと、タグを表示 */}
              <div className="text-sm text-gray-700 dark:text-gray-300 flex gap-4">
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  Level: 1
                </span>

                <div className="flex gap-2">
                  <Badge variant="outline">#github</Badge>
                  <Badge variant="outline">#discussions </Badge>
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
        </div>
      </div>
    </div>
  );
};
