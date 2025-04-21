const bcrypt = require('bcrypt');
const { sequelize } = require('../config/dbConnection');

// Import model factories
const RoleModel = require('./role.modal');
const UserModel = require('./user.modal');
const TaskModel = require('./task.modal');

// Init models
const Role = RoleModel(sequelize);
const User = UserModel(sequelize);
const Task = TaskModel(sequelize);


// Define associations
// Role.hasMany(User, { foreignKey: 'role_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// User.belongsTo(Role, { foreignKey: 'role_id' });

User.belongsToMany(Role, {
  through: 'user_roles',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  hooks: true,
});
Role.belongsToMany(User, {
  through: 'user_roles',
  foreignKey: 'role_id',
  onDelete: 'CASCADE',
  hooks: true,
});

User.hasMany(Task, {
  foreignKey: "user_id",
  as: "tasks",
  onDelete: 'CASCADE',
});
Task.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: 'CASCADE',
});

// Sync and seed roles + Super Admin user
const connectDb = async () => {
  await sequelize.sync({ force: false, alter: false });

  const roleNames = ['SUPER_ADMIN', 'COMPANY_ADMIN', 'USER', 'VISITOR'];
  const rolesMap = {};

  for (const name of roleNames) {
    const [role] = await Role.findOrCreate({
      where: { name },
      defaults: { name }
    });
    rolesMap[name] = role;
  }

  const existingUser = await User.findOne({ where: { email: 'ashish@gmail.com' } });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('Password12!', 10);
    const user = await User.create({
      name: 'Ashish',
      email: 'ashish@gmail.com',
      password: hashedPassword,
      gender: 'Male',
      // role_id: rolesMap['SUPER_ADMIN'].id
    });
    await user.setRoles([rolesMap['SUPER_ADMIN']]);
    console.log('✅ Default Super Admin user created.');
  } else {
    console.log('ℹ️ Super Admin user already exists.');
  }
};

module.exports = {
  sequelize,
  User,
  Role,
  Task,
  connectDb
};
