import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Tool from '../app/models/Tool';
import Tag from '../app/models/Tag';
import User from '../app/models/User';

const models = [Tool, Tag, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
