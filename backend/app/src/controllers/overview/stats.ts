import { RequestHandler } from 'express';
import { Op, Sequelize } from 'sequelize';
import { invalidDateRangeResponse } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import InstagramApi from '../../models/instagram/api';
import InstagramComment from '../../models/instagram/comment';
import InstagramMedia from '../../models/instagram/media';
import InstagramTag from '../../models/instagram/tag';
import User from '../../models/user/user';

export const getOverviewStats: RequestHandler = async (req, res, next) => {};
