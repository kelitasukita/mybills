import { Request, Response, Router } from "express";

const loginRouter = Router();

loginRouter.get('/google', async (req: Request, res: Response) => {
  console.log(req.path);

  return res.json({ funciona: 'legal', query: req.query });
})

export default loginRouter;