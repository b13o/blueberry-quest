import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Quest, QuestMetadata } from "@/types/quest";

// mdコンテンツのパス
const dataDirectory = path.join(process.cwd(), "_data");

/**
 * すべてのクエストを取得
 * @returns すべてのクエストの配列
 */
export function getAllQuests(): Quest[] {
  if (!fs.existsSync(dataDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(dataDirectory);
  const quests = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // ファイル名から day と slug を抽出（例: "0.start.md" -> day=0, slug="start"）
      const match = fileName.match(/^(\d+)\.(.+)\.md$/);
      if (!match) return null;

      const day = parseInt(match[1], 10);
      const slug = match[2];
      const fullPath = path.join(dataDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: `${day}/${slug}`,
        level: day,
        metadata: data as QuestMetadata,
        content,
      };
    })
    .filter((quest): quest is Quest => quest !== null)
    .sort((a, b) => a.level - b.level);

  return quests;
}

/**
 * 特定のクエストを取得
 * @param day - デイ番号
 * @param slug - クエストスラッグ（例: "start"）
 * @returns クエスト情報
 */
export async function getQuestBySlug(
  day: number,
  slug: string
): Promise<Quest | null> {
  try {
    const fileName = `${day}.${slug}.md`;
    const fullPath = path.join(dataDirectory, fileName);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // マークダウンをHTMLに変換
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug: `${day}/${slug}`,
      level: day,
      metadata: data as QuestMetadata,
      content,
      contentHtml,
    };
  } catch (error) {
    console.error(`Error loading quest ${day}/${slug}:`, error);
    return null;
  }
}

/**
 * Day別にクエストをグループ化
 * @returns Dayごとのクエストマップ
 */
export function getQuestsGroupedByLevel(): Record<number, Quest[]> {
  const allQuests = getAllQuests();
  const grouped: Record<number, Quest[]> = {};

  allQuests.forEach((quest) => {
    if (!grouped[quest.level]) {
      grouped[quest.level] = [];
    }
    grouped[quest.level].push(quest);
  });

  return grouped;
}
