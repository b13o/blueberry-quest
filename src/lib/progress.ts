import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { ProgressData, UserProgressData } from "@/types/quest";

const PROGRESS_FILE_PATH = join(process.cwd(), "_data", "progress.json");

/**
 * progress.json からユーザーの進捗を取得する
 * @param githubUsername - GitHubのユーザー名
 * @returns ユーザーの現在のDay（存在しない場合は0）
 */
export async function getUserProgress(githubUsername: string): Promise<number> {
  try {
    const fileContents = await readFile(PROGRESS_FILE_PATH, "utf8");
    const progressData: ProgressData = JSON.parse(fileContents);

    const userProgress = progressData.users.find(
      (user) => user.githubUsername === githubUsername
    );

    // ユーザーが見つかった場合は currentDay を返す、見つからない場合は 0（チュートリアル）を返す
    return userProgress ? userProgress.currentDay : 0;
  } catch (error) {
    // ファイルが存在しない、またはパースエラーの場合は 0 を返す
    console.error("Error reading progress file:", error);
    return 0;
  }
}

/**
 * ユーザーの進捗を更新する
 * @param githubUsername - GitHubのユーザー名
 * @param currentDay - 新しい currentDay の値
 */
export async function updateUserProgress(
  githubUsername: string,
  currentDay: number
): Promise<void> {
  try {
    let progressData: ProgressData;

    try {
      const fileContents = await readFile(PROGRESS_FILE_PATH, "utf8");
      progressData = JSON.parse(fileContents);
    } catch {
      // ファイルが存在しない場合は新規作成
      progressData = { users: [] };
    }

    const userIndex = progressData.users.findIndex(
      (user) => user.githubUsername === githubUsername
    );

    if (userIndex >= 0) {
      // 既存ユーザーの更新
      progressData.users[userIndex].currentDay = currentDay;
    } else {
      // 新規ユーザーの追加
      progressData.users.push({
        githubUsername,
        currentDay,
      });
    }

    await writeFile(
      PROGRESS_FILE_PATH,
      JSON.stringify(progressData, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Error updating progress file:", error);
    throw error;
  }
}

/**
 * 指定されたクエストがユーザーにとって解放されているかを判定
 * @param questDay - クエストのDay
 * @param userCurrentDay - ユーザーの現在のDay
 * @returns 解放されている場合は true
 */
export function isQuestUnlocked(
  questDay: number,
  userCurrentDay: number
): boolean {
  // ユーザーの現在のDay以下のクエストは解放されている
  return questDay <= userCurrentDay;
}
