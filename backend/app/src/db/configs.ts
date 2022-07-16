import { Sequelize } from 'sequelize-typescript';
import models from '../models/models';

const port: number = parseInt(process.env.POSTGRES_PORT || '5432');

const connection = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  logging: false,
  models,
});

export default connection;
