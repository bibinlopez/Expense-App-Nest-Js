import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common"
import { v4 as uuid } from "uuid"
import { ReportType, data } from 'src/data';

@Controller('report/:type')
export class AppController {
  @Get('')
  getAllIncomeReports(@Param('type') type: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    const result = data.report.filter((report) => report.type === reportType);
    return { success: true, result, count: result.length }
  }

  @Get(':id')
  getAllIncomeById(@Param('type') type: string, @Param('id') id: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    const result = data.report.filter((report) => {
      return report.type === reportType
    }).find(report => report.id === id)
    return result;
  }

  @Post()
  postIncomeReport(@Body() { amount, source }: { amount: number, source: string }, @Param('type') type: string) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    }
    data.report.push(newReport)
    return { success: true, msg: 'created', newReport }
  }

  @Put(':id')
  updateIncomeReport() {
    return { success: true, msg: 'updated' }
  }

  @Delete(':id')
  deleteIncomeReport() {
    return { success: true, msg: 'deleted' }
  }

}
