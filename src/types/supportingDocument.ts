export interface SupportingDocument {
  id: string;
  documentName: string;
  documentType: "Policies" | "Board Manuals" | "Code of Conduct" | "Articles of Association" | "Supporting Documents";
  lastUpdated: string;
  isPublished: boolean;
}
