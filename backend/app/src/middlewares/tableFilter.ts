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
 * Middleware for parsing filters and providing some locals for filters and
 * their conditions simply used in the where condition of model fetching
 * Usage: FacebookComment.findAll({ where: ...res.locals.getFilterCondition() })
 */
const tableFilter: RequestHandler = async (req, res, next) => {
  const filter: TableFilter | null = req.query.filter
    ? JSON.parse(req.query.filter!.toString())
    : null;

  res.locals.tableFilter = filter;
  res.locals.getFilterCondition = () => createFilterCondition(filter);

  return next();
};

export const getNumberEqualsFilter = (field: string, value: string) => {
  return {
    [field]: value,
  };
};

export const getStringContainsFilter = (field: string, value: string) => {
  return {
    [field]: Sequelize.where(
      Sequelize.fn('LOWER', Sequelize.col(field)),
      'LIKE',
      '%' + value + '%'
    ),
  };
};

/**
 * Creates a filter condition for models
 * @param filter Filter
 * @returns a dictionary to be used straight in the model condition
 */
export const createFilterCondition = (filter: TableFilter | null) => {
  // No filter
  if (!filter || !filter!.value) {
    return {};
  }

  // Number filter operator '='
  if (filter!.operatorValue === numberOperators.EQ) {
    return getNumberEqualsFilter(filter!.columnField, filter!.value);
  }

  // String filter operator 'contains' (case insensitive)
  if (filter!.operatorValue === stringOperators.CONTAINS) {
    return getStringContainsFilter(filter!.columnField, filter!.value);
  }
};

/**
 * Creates a renamed version of the provided table filter based on the provided renamedFields
 * @param renamedFields a double string array with the an element containing an array with the first
 * element representing the field to be renamed to and the second field representing the current field
 * @param filter
 * @returns
 */
export const renameTableFilterField = (
  filter: TableFilter | null,
  renamedFields: string[][]
): TableFilter | null => {
  if (!filter) return null;

  const fields = renamedFields.filter((f) => f[1] === filter.columnField);
  if (fields.length == 0) return filter;

  const field = fields[0];
  return {
    columnField: field[0],
    id: filter.id,
    operatorValue: filter.operatorValue,
    value: filter.value,
  };
};

/**
 * Removed table filter field by either returning the provided filter or null
 * @param filter provided filter
 * @param field field to be removed
 * @returns null if the provided field is the same as that of filter
 */
export const removeTableFilterField = (
  filter: TableFilter | null,
  field: string
) => {
  if (!filter || filter.columnField === field) return null;
  return filter;
};

export default tableFilter;
