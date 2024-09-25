import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApplicationsModule } from './applications/applications.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ALLOY_HOST: Joi.string().required(),
        ALLOY_JOURNEY_TOKEN: Joi.string().required(),
        ALLOY_WORKFLOW_TOKEN: Joi.string().required(),
        ALLOY_WORKFLOW_SECRET: Joi.string().required()
      })
    }),
    ApplicationsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
