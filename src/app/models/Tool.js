import Sequelize, { Model } from 'sequelize';

class Tool extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        link: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        scopes: {},
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Tag, {
      as: 'tags',
      through: 'tool_tags',
    });
  }
}

export default Tool;
