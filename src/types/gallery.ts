export interface Gallery {
  id: string;
  thumbnail: string;
  galleryName: string;
  type: "Image" | "Video";
  createdAt: string;
  lastUpdated: string;
  isPublished: boolean;
}
