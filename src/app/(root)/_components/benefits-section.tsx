import { Badge } from "@/components/ui/badge";

export const BenefitsSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 py-24">
      {/* 左側: 画像や図解を使用 */}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center hover:scale-105 transition-transform">
        <p>ToDo: 画像を追加</p>
      </div>

      {/* 右側: 説明文 */}
      <div className="">
        <Badge variant="secondary" className="mb-4">
          特徴
        </Badge>
        <h2 className="text-5xl font-bold mb-12 text-gray-900 dark:text-gray-100">
          ゲーム感覚で、習慣を形成しよう！
        </h2>

        <p className="text-gray-700 dark:text-gray-400 text-lg mb-12">
          Blueberry Quest
          は、習慣化することで、大きな効果を生み出す取り組みをまとめました。
          継続するほどあなたのスキル/実績/ランクが積み上がります。
        </p>
      </div>
    </div>
  );
};
