const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  phone: Sequelize.STRING,
}, {
  // Add timestamps for automatic creation/update tracking (optional)
  timestamps: true,
});

// Force table creation (optional, uncomment to create the table on app launch)
// User.sync({ force: true })
  // .then(() => {
  //   console.log('User table created successfully');
  // })
  // .catch(err => {
  //   console.error('Error creating User table:', err);
  // });

module.exports = User;