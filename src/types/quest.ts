// クエストの型定義
export interface QuestMetadata {
  createdAt: string;
  updatedAt: string;
  title: string;
  priority: string;
  emoji: string;
  tags: string[];
  completers: string[];
}

export interface Quest {
  slug: string;
  level: number;
  metadata: QuestMetadata;
  content: string;
  contentHtml?: string;
}
