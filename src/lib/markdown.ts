import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Quest, QuestMetadata } from "@/types/quest";

// mdコンテンツのパス
const dataDirectory = path.join(process.cwd(), "_data");

/**
 * 指定されたレベルのすべてのクエストを取得
 * @param level - クエストレベル（0-5）
 * @returns クエストの配列
 */
export function getQuestsByLevel(level: number): Quest[] {
  const levelDir = path.join(dataDirectory, `level-${level}`);

  // ディレクトリが存在しない場合は空配列を返す
  if (!fs.existsSync(levelDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(levelDir);
  const quests = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(levelDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: `level-${level}/${slug}`,
        level,
        metadata: data as QuestMetadata,
        content,
      };
    });

  return quests;
}

/**
 * すべてのクエストを取得
 * @returns すべてのクエストの配列
 */
export function getAllQuests(): Quest[] {
  const allQuests: Quest[] = [];

  // レベル0-5まで取得
  for (let level = 0; level <= 5; level++) {
    const quests = getQuestsByLevel(level);
    allQuests.push(...quests);
  }

  return allQuests;
}

/**
 * 特定のクエストを取得
 * @param slug - クエストスラッグ（例: "level-0/start"）
 * @returns クエスト情報
 */
export async function getQuestBySlug(slug: string): Promise<Quest | null> {
  try {
    const fullPath = path.join(dataDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // マークダウンをHTMLに変換
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    // レベルを抽出
    const levelMatch = slug.match(/level-(\d+)/);
    const level = levelMatch ? parseInt(levelMatch[1], 10) : 0;

    return {
      slug,
      level,
      metadata: data as QuestMetadata,
      content,
      contentHtml,
    };
  } catch (error) {
    console.error(`Error loading quest ${slug}:`, error);
    return null;
  }
}

/**
 * レベル別にクエストをグループ化
 * @returns レベルごとのクエストマップ
 */
export function getQuestsGroupedByLevel(): Record<number, Quest[]> {
  const grouped: Record<number, Quest[]> = {};

  for (let level = 0; level <= 5; level++) {
    const quests = getQuestsByLevel(level);
    if (quests.length > 0) {
      grouped[level] = quests;
    }
  }

  return grouped;
}
