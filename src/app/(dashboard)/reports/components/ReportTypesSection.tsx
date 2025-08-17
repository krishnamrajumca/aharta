'use client'

import React from 'react'
import ReportTypeCard from './ReportTypeCard'

interface ReportType {
  id: number
  name: string
  description: string
  icon: any
  category: string
}

interface ReportTypesSectionProps {
  reportTypes: ReportType[]
  onReportTypeClick?: (reportType: ReportType) => void
}

export default function ReportTypesSection({ reportTypes, onReportTypeClick }: ReportTypesSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Types</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((reportType) => (
          <ReportTypeCard
            key={reportType.id}
            reportType={reportType}
            onClick={() => onReportTypeClick?.(reportType)}
          />
        ))}
      </div>
    </div>
  )
}
