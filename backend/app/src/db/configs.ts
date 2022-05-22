import { Sequelize } from 'sequelize-typescript';
import models from '../models/models';

const connection = new Sequelize({
  dialect: 'postgres',
  host: process.env.VIRTUAL_HOST,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  logging: false,
  models,
});

export default connection;
