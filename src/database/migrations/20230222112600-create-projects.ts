import { DataTypes, QueryInterface } from 'sequelize'

export const up = (queryInterface: QueryInterface) => {
  return queryInterface.createTable('Applications', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: { type: DataTypes.TEXT, allowNull: false },
    externalId: { type: DataTypes.TEXT, allowNull: false },

    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
    deletedAt: { type: DataTypes.DATE, allowNull: true }
  })
}

export const down = (queryInterface: QueryInterface, _sequelize: any) => {
  return queryInterface.dropTable('Applications')
}
