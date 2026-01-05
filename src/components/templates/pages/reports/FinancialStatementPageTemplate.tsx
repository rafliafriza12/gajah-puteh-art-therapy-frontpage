import FinancialStatementContent from "@/components/organisms/reports/financialStatements/Content"
import FinancialStatementHeader from "@/components/organisms/reports/financialStatements/Header"

const FinancialReportsPageTemplate = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <FinancialStatementHeader />
      <FinancialStatementContent />
    </div>
  )
}

export default FinancialReportsPageTemplate