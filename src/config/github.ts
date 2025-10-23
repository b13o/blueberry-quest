/**
 * GitHub リポジトリ設定
 *
 * 注意: 実際のリポジトリ情報に更新してください
 */
export const GITHUB_CONFIG = {
  owner: "b13o", // GitHubのユーザー名または組織名
  repo: "blueberry-quest", // リポジトリ名
  branch: "main", // デフォルトブランチ
} as const;

// const tutorialIssueBody = `## 概要

// Blueberry Quest の使い方に慣れるため、チュートリアルを完了してください！

// チュートリアルの流れは、下記の通りです：

// 1. 「🚀クエストに挑戦する」ボタンから、GitHub 上に遷移
// 2. イシューを作成
// 3. 作成したイシューに、「完了しました」というコメントを追加
// 4. プルリクエストが作成されるので、コメントを追加
// 5. 承認され、完了ページへのURLが発行されます
// 6. これで最初のクエストが完了です🎉`;

/**
 * GitHub URL生成ヘルパー
 */
export const getGitHubUrls = (slug: string, questTitle?: string) => {
  const baseUrl = `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`;

  // Issue テンプレートを使用したURL
  const issueTemplateUrl = `${baseUrl}/issues/new?template=quest-start.yml&title=[Quest]%20${encodeURIComponent(
    questTitle || ""
  )}&quest-slug=${encodeURIComponent(slug)}&quest-title=${encodeURIComponent(
    questTitle || ""
  )}`;

  return {
    // リポジトリ関連
    repository: baseUrl,
    issues: `${baseUrl}/issues`,
    pulls: `${baseUrl}/pulls`,
    discussions: `${baseUrl}/discussions`,

    // クエストファイル
    questFile: `${baseUrl}/blob/${GITHUB_CONFIG.branch}/_data/${slug}.md`,

    // Issue作成（クエスト開始）- テンプレート経由
    newIssue: issueTemplateUrl,

    // Issue作成（質問・ヘルプ）
    newQuestion: `${baseUrl}/discussions/new?category=q-a`,
  };
};

/**
 * テキストをURL用にエンコード
 */
export const encodeTextForUrl = (text: string) => {
  return encodeURIComponent(text);
};
