import { Column, PrimaryKey, Model, Table } from 'sequelize-typescript'

interface ApplicationAttributes {
  id: string

  name: string
  externalId: string

  createdAt: Date
  updatedAt: Date
}

interface CreationAttributes extends Partial<ApplicationAttributes> {
  id: string

  name: string
  externalId: string
}

@Table({ tableName: 'Applications' })
export class ApplicationEntity extends Model<ApplicationAttributes, CreationAttributes> {
  @PrimaryKey
  @Column
  id: number

  @Column
  name: string

  @Column
  externalId: string
}
