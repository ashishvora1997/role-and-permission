const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
        unique: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        // allowNull: true
      },
      // role_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   defaultValue: 4, // Default to Visitor
      // },
    },
    {
      // timestamps: false,
      // tableName: 'users',
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      // paranoid: true
    }
  );

  return User;
};
