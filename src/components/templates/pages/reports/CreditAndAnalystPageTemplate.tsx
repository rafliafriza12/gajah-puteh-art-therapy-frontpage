import CreditAndAnalystReportsContent from "@/components/organisms/reports/creditAndAnalystReports/Content"
import CreditAndAnalystReportsHeader from "@/components/organisms/reports/creditAndAnalystReports/Header"

const CreditAndAnalystReportsPageTemplate = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <CreditAndAnalystReportsHeader />
      <CreditAndAnalystReportsContent />
    </div>
  )
}

export default CreditAndAnalystReportsPageTemplate