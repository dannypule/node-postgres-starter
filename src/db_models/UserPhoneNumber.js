export default (sequelize, DataTypes) => {
  const UserPhoneNumber = sequelize.define('UserPhoneNumber', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    type_code: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
      defaultValue: 'ACTIVE',
    },
  });

  UserPhoneNumber.associate = models => {
    UserPhoneNumber.belongsTo(models.User);
  };

  return UserPhoneNumber;
};
