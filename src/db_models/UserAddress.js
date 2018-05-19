export default (sequelize, DataTypes) => {
  const UserAddress = sequelize.define('UserAddress', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address_line_1: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    address_line_2: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    address_line_3: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    address_line_4: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    town: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    county: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    post_code: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    type_code: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  })

  UserAddress.associate = models => {
    UserAddress.belongsTo(models.User)
  }

  return UserAddress
}