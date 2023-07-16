import { Controller, Get, Post, Put, Delete, Param } from "@nestjs/common"
import { ReportType, data } from 'src/data';

@Controller('report/:type')
export class AppController {
  @Get('')
  getAllIncomeReports(@Param('type') type: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENCE
    const result = data.report.filter((report) => report.type === reportType);
    return { success: true, result, count: result.length }
  }

  @Get(':id')
  getAllIncomeById(@Param('type') type: string, @Param('id') id: string) {
    console.log({ type, id });

    return {};
  }

  @Post()
  postIncomeReport() {
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
