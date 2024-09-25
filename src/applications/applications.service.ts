import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v4 } from 'uuid'
import * as Dto from '../dto'

@Injectable()
export class ApplicationsService {
  private alloyAPIHost: string
  private alloyJourneyToken: string
  private alloyWorkflowToken: string
  private alloyWorkflowSecret: string

  constructor(private configService: ConfigService) {
    this.alloyAPIHost = this.configService.get<string>('ALLOY_HOST')
    this.alloyJourneyToken = this.configService.get<string>('ALLOY_JOURNEY_TOKEN')
    this.alloyWorkflowToken = this.configService.get<string>('ALLOY_WORKFLOW_TOKEN')
    this.alloyWorkflowSecret = this.configService.get<string>('ALLOY_WORKFLOW_SECRET')
  }

  async createApplication(applicationDto: Dto.CreateApplication) {
    const entityId = v4()

    const body = {
      entities: [
        {
          external_entity_id: entityId.replace(/-/g, ''),
          phone_number: applicationDto.phoneNumber,
          name_first: applicationDto.firstName,
          name_last: applicationDto.lastName,
          email_address: applicationDto.email,
          birth_date: applicationDto.birthDate,
          document_ssn: applicationDto.ssn,
          addresses: applicationDto.addresses.map((address) => ({
            postal_code: address.zipCode,
            type: address.type,
            country_code: address.country,
            state: address.state,
            city: address.city,
            line_1: address.address1,
            line_2: address.address2 || ''
          })),
          income: applicationDto.income,
          branch_name: 'persons',
          entity_type: 'person'
        }
      ]
    }

    const response = await fetch(`${this.alloyAPIHost}/journeys/${this.alloyJourneyToken}/applications`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${this.alloyWorkflowToken}:${this.alloyWorkflowSecret}`).toString('base64')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'alloy-journey-application-sync': 'true',
        'alloy-sandbox': 'true'
      },
      body: JSON.stringify(body)
    })

    const result = await response.json()

    return {
      status: result.status.toLowerCase(),
      journeyApplicationStatus: result.journey_application_status.toLowerCase(),
      journeyApplicationToken: result.journey_application_token,
      journeyToken: this.alloyJourneyToken
    }
  }
}
