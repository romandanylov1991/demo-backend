import { Controller, Inject, Post, Body, ValidationPipe } from '@nestjs/common'
import * as Dto from '../dto'

import { ApplicationsService } from './applications.service'

@Controller('applications')
export class ApplicationsController {
  @Inject(ApplicationsService)
  private _service: ApplicationsService

  @Post()
  createApplication(@Body(ValidationPipe) body: Dto.CreateApplication) {
    return this._service.createApplication(body)
  }
}
