import { NextFunction, Request, Response } from "express";
import { getFeed } from "../models/feed.model";
import { getPagination } from "../utils/pagination.utils";
import { postgresPool } from "../config/db.config";

export const fetchFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPage } = req.query;
    // pagination params over here
    const page = Number(currentPage) || 1;
    const limit = 1;

    // total count of posts:
    const totalQuery = await postgresPool.query(`SELECT COUNT(*) FROM posts`);
    const total = Number(totalQuery.rows[0].count);

    // fetching feed
    const feed = await getFeed(page, limit);

    const pagination = getPagination(page, limit, total);

    // response:
    res.status(200).json({
      message: `Feed successfully fetched`,
      data: feed,
      pagination
    });
  } catch (err) {
    next(err);
  }
};
