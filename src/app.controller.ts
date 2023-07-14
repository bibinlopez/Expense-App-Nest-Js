import { Controller, Get, Post, Put, Delete } from "@nestjs/common"

@Controller()
export class AppController {
  @Get('')
  getAllIncomeReports() {
    return [];
  }


  @Get(':id')
  getAllIncomeById() {
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
