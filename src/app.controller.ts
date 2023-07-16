import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common"
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
  postIncomeReport(@Body() body: { amount: number, source: string }) {
    console.log({ body });

    return { success: true, msg: 'created' }
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
