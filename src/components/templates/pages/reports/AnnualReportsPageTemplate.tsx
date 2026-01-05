import AnnualReportsContent from '@/components/organisms/reports/annualReports/Content'
import AnnualReportsHeader from '@/components/organisms/reports/annualReports/Header'

const AnnualReportsPageTemplate = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <AnnualReportsHeader />
      <AnnualReportsContent />
    </div>
  )
}

export default AnnualReportsPageTemplate