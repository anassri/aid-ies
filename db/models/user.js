'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        len: [3, 255],
      }
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        len: [3, 255],
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        isEmail: true,
        len: [3, 255],
      }
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validates: {
        len: [60, 60],
      },
    },
    bio: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    website: {
      type: DataTypes.STRING,
    },
    instagram: {
      type: DataTypes.STRING,
    },
    facebook: {
      type: DataTypes.STRING,
    },
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Campaign, { foreignKey: 'userId' });
    User.belongsToMany(models.Campaign, {
      foreignKey: 'userId',
      otherKey: 'campaignId',
      through: 'Favorite'
    });
    User.belongsToMany(models.Campaign, {
      foreignKey: 'userId',
      otherKey: 'campaignId',
      through: 'bids'
    });
  };

  return User;
};
