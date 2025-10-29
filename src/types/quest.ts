// クエストの型定義
export interface QuestMetadata {
  createdAt: string;
  updatedAt: string;
  title: string;
  priority: string;
  emoji: string;
  tags: string[];
}

export interface Quest {
  slug: string;
  level: number;
  metadata: QuestMetadata;
  content: string;
  contentHtml?: string;
}

// ユーザーの進捗情報の型定義
export interface UserProgressData {
  githubUsername: string;
  currentDay: number;
}

export interface ProgressData {
  users: UserProgressData[];
}
