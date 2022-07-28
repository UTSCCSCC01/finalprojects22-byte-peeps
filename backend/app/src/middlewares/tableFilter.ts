import { RequestHandler } from 'express';
const { Op, Sequelize } = require('sequelize');

export type TableFilter = {
  columnField: string;
  id: number;
  operatorValue: stringOperators | numberOperators;
  value?: string;
};

export enum stringOperators {
  CONTAINS = 'contains',
}

export enum numberOperators {
  EQ = '=',
}

/**
 * Middleware for parsing filters and providing a function to be
 * simply used in the where condition of model fetching
 * Usage: FacebookComment.findAll({ where: ...res.locals.getFilterCondition() })
 */
const tableFilter: RequestHandler = async (req, res, next) => {
  const filter: TableFilter | null = req.query.filter
    ? JSON.parse(req.query.filter!.toString())
    : null;

  res.locals.getFilterCondition = () => {
    // No filter
    if (!filter || !filter!.value) {
      return {};
    }

    // Number filter operator '='
    if (filter!.operatorValue === numberOperators.EQ) {
      return {
        [filter!.columnField]: filter?.value,
      };
    }

    // String filter operator 'contains' (case insensitive)
    if (filter!.operatorValue === stringOperators.CONTAINS) {
      return {
        [filter!.columnField]: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col(filter!.columnField)),
          'LIKE',
          '%' + filter!.value + '%'
        ),
      };
    }
  };
  return next();
};

export default tableFilter;
