// クエストの型定義
export interface QuestMetadata {
  date: string;
  title: string;
  priority: string;
  emoji: string;
  tags: string[];
  completers: string[];
}

export interface Quest {
  id: string;
  level: number;
  metadata: QuestMetadata;
  content: string;
  contentHtml?: string;
}
