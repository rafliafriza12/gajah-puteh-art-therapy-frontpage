import DashboardIcon from "@/components/atoms/icons/DashboardIcon";
import DocumentIcon from "@/components/atoms/icons/DocumentIcon";
import JobIcon from "@/components/atoms/icons/JobIcon";
import MediaIcon from "@/components/atoms/icons/MediaIcon";
import NotebookIcon from "@/components/atoms/icons/NotebookIcon";
import ReportIcon from "@/components/atoms/icons/ReportIcon";

export const sidebarMenu = [
  {
    name: "Dashboard",
    url: "/",
    icon: DashboardIcon,
    subMenu: [],
  },
  {
    name: "Pages",
    url: "/pages",
    icon: NotebookIcon,
    subMenu: [
      {
        name: "Home",
        url: "/pages/home",
      },
      {
        name: "About Us",
        url: "/pages/aboutUs",
      },
      {
        name: "Bussines & Operations",
        url: "/pages/bussinesAndOperations",
      },
      {
        name: "Investor Relations",
        url: "/pages/investorRelations",
      },
      {
        name: "Governance",
        url: "/pages/governance",
      },
      {
        name: "Sustainability",
        url: "/pages/sustainability",
      },
      {
        name: "Media",
        url: "/pages/media",
      },
      {
        name: "Careers",
        url: "/pages/careers",
      },
    ],
  },
  {
    name: "Reports",
    url: "/reports",
    icon: ReportIcon,
    subMenu: [
      {
        name: "Annual Report",
        url: "/reports/annualReport",
      },
      {
        name: "Sustainability Report",
        url: "/reports/sustainabilityReport",
      },
      {
        name: "Financial Statement",
        url: "/reports/financialStatement",
      },
      {
        name: "Credits & Analyst Report",
        url: "/reports/creditAndAnalystReport",
      },
    ]
  },
  {
    name: 'Media',
    url: '/media',
    icon: MediaIcon,
    subMenu: [
      {
        name: "Articles",
        url: "/media/articles",
      },
      {
        name: "Press Release",
        url: "/media/pressRelease",
      },
      {
        name: "Gallery",
        url: "/media/gallery",
      },
    ]
  },
  {
    name: 'Documents',
    url: '/documents',
    icon: DocumentIcon,
    subMenu: [
      {
        name: "Corporate Action",
        url: "/documents/corporateAction",
      },
      {
        name: "GMS & Events",
        url: "/documents/gmsEvents",
      },
      {
        name: "Disclosure",
        url: "/documents/disclosure",
      },
      {
        name: "Presentation & Insight",
        url: "/documents/presentationInsight",
      },
      {
        name: "Supporting Documents",
        url: "/documents/supportingDocuments",
      },
    ]
  },
  {
    name: 'Jobs',
    url: '/jobs',
    icon: JobIcon,
    subMenu: []
  }
];
