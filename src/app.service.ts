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
import { ReportResponseDto } from './dto/report.dto';

interface Report {
  amount: number,
  source: string
}


interface UpdateReport {
  amount?: number,
  source?: string
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    const result = data.report.filter((report) => report.type === type);
    return result
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const result = data.report.filter((report) => {
      return report.type === type
    }).find(report => report.id === id)
    return result;
  }

  createReport(type: ReportType, { amount, source }: Report): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    }
    data.report.push(newReport)
    return newReport
  }

  updateReport(type: ReportType, id: string, body: UpdateReport): ReportResponseDto {
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
    return data.report[reportIndex]
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex(report => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1)

    return;
  }

}
