import {
  FileText,
  Lightbulb,
  RefreshCw,
  Github,
  Rocket,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

export const ConceptSection = () => {
  const conceptCards: {
    id: number;
    icon: LucideIcon;
    title: string;
  }[] = [
    {
      id: 1,
      icon: FileText,
      title: "作業の記録",
    },
    {
      id: 2,
      icon: Lightbulb,
      title: "アウトプット",
    },
    {
      id: 3,
      icon: RefreshCw,
      title: "振り返り",
    },
    {
      id: 4,
      icon: Github,
      title: "Git/GitHub の活用",
    },
    {
      id: 5,
      icon: Rocket,
      title: "OSS への貢献",
    },
    {
      id: 6,
      icon: Users,
      title: "開発者と繋がる",
    },
  ];

  return (
    <section className="py-24 grid md:grid-cols-4 gap-4">
      <div className="col-span-2">
        <Badge variant="secondary" className="mb-4">
          コンセプト
        </Badge>
        <h2 className="text-5xl font-bold mb-12 text-gray-900 dark:text-gray-100">
          「やった方が良い」と分かっていることを、やる。
        </h2>

        <p className="text-gray-700 dark:text-gray-400 text-lg mb-12">
          開発者として「取り組むべき・取り組んだ方が良い慣習」というのはたくさんあります。
          しかし、直接的なプログラミングスキルではないため、先延ばしにしがちでもあります。
          そして、継続も難しいです🫠🫠
        </p>
      </div>

      {conceptCards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className="bg-blue-50 dark:bg-gray-800 rounded-xl p-12 space-y-4 flex flex-col items-center justify-center"
          >
            <IconComponent className="w-16 h-16 text-blue-500 dark:text-blue-300" />
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100">
              {card.title}
            </h3>
          </div>
        );
      })}
    </section>
  );
};
