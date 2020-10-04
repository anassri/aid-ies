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
    location: {
      allowNull: false,
      type: DataTypes.STRING
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
      as: 'groups',
      foreignKey: 'userId',
      otherKey: 'campaignId',
      through: 'Favorite'
    });
   
    User.hasMany(models.Bid, { foreignKey: "userId" });

  };
  User.prototype.toSafeObject = function () {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      bio: this.bio,
      location: this.location,
      website: this.website,
      instagram: this.instagram,
      facebook: this.facebook,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
  User.prototype.isValid = () => true;
  return User;
};
