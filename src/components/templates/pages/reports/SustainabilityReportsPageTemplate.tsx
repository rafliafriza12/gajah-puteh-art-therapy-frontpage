import SustainabilityReportsContent from "@/components/organisms/reports/sustainabilityReports/Content"
import SustainabilityReportsHeader from "@/components/organisms/reports/sustainabilityReports/Header"


const SustainabilityReportsPageTemplate = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <SustainabilityReportsHeader />
      <SustainabilityReportsContent />
    </div>
  )
}

export default SustainabilityReportsPageTemplate