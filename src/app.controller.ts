import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe
} from "@nestjs/common"
import { ReportType } from 'src/data';
import { AppService } from "./app.service";
import { CreateReportDto, UpdateReportDto } from "./dto/report.dto"

@Controller('report/:type')
export class AppController {

  constructor(
    private readonly appService: AppService
  ) { }

  @Get('')
  getAllIncomeReports(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getAllIncomeReports(reportType)
  }

  @Get(':id')
  getReportById(@
    Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string) {

    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.createReport(reportType, { amount, source })
  }

  @Put(':id')
  updateIncomeReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id') id: string,
    @Body() body: UpdateReportDto
  ) {
    console.log(body);

    const reportType =
      type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  deleteIncomeReport(
    @Param('id') id: string
  ) {
    return this.appService.deleteReport(id)
  }

}
