import { Request, Response, Router } from "express";

const loginRouter = Router();

loginRouter.get('/google', async (req: Request, res: Response) => {
  console.log(req);

  return res.json({funciona: 'legal'});
})

export default loginRouter;