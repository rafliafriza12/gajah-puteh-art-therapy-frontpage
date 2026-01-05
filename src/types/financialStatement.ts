export interface FinancialStatement {
  id: string;
  reportName: string;
  reportYear: string;
  reportType: "Quarterly Reports" | "Half Year Reports" | "Yearly Reports" | "Financial Highlights";
  lastUpdated: string;
  isPublished: boolean;
}
