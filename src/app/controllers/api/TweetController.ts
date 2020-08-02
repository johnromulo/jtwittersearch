import { Request, Response } from 'express';
import { Controller, Req, Res, Get } from 'routing-controllers';

// import Errorhandle from '@lib/Errorhandle';
import Tweet from '@schemas/Tweet';
import { BaseControllerInterface } from '@controllers/api/BaseController';

@Controller()
export class UserController implements BaseControllerInterface {
  @Get('/tweet')
  async index(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { hashtag, initialDate, approv } = req.query;

    let where: any = {};
    where = Object.assign(where, hashtag && { hashtag });
    where = Object.assign(
      where,
      initialDate && {
        updatedAt: { $gte: new Date(parseInt(`${initialDate}`, 10)) },
      }
    );

    where = Object.assign(
      where,
      approv === 'P' && {
        approved: null,
      },
      approv === 'A' && {
        approved: true,
      },
      approv === 'N' && {
        approved: false,
      }
    );

    const tweets = await Tweet.find({ ...where }).sort('times');

    return res.json(tweets);
  }
}
