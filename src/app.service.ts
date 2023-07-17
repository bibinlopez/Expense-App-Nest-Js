// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }

import { Injectable } from '@nestjs/common';
import { ReportType, data } from "src/data"
import { v4 as uuid } from "uuid"

interface Report { amount: number, source: string }

@Injectable()
export class AppService {
  getAllIncomeReports(type: ReportType) {
    const result = data.report.filter((report) => report.type === type);
    return { success: true, result, count: result.length }
  }

  getReportById(type: ReportType, id: string) {
    const result = data.report.filter((report) => {
      return report.type === type
    }).find(report => report.id === id)
    return result;
  }

  createReport(type: ReportType, { amount, source }: Report) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    }
    data.report.push(newReport)
    return { success: true, msg: 'created', newReport }
  }

  updateReport(type: ReportType, id: string, body: Report) {
    const reportToUpdate = data.report.filter((report) => {
      return report.type === type
    }).find(report => report.id === id)
    if (!reportToUpdate) return;
    const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id)

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date()
    }
    return { success: true, msg: 'updated', data: data.report[reportIndex] }
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex(report => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1)

    return;
  }

}
