export interface GmsEvent {
  id: string;
  documentName: string;
  eventType: "Upcoming General Meetings" | "Upcoming Public Expose";
  year: string;
  eventDate: string;
  lastUpdated: string;
  isPublished: boolean;
}
