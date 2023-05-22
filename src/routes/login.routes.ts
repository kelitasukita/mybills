import { Request, Response, Router } from "express";

import GoogleLoginController from '../controllers/Login/GoogleLoginController';

const loginRouter = Router();

loginRouter.get('/google', async (req: Request, res: Response) => {
  console.log(req.path);

  return res.json({ funciona: 'legal', query: req.query });
})

loginRouter.post('/google', GoogleLoginController.handle);

export default loginRouter;