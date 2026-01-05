export interface Article {
  id: string;
  thumbnail: string;
  articleName: string;
  status: "Published" | "Draft";
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  lastUpdated: string;
  isPublished: boolean;
}
