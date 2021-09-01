import express, {Router, Response, Request} from 'express';

const healthCheckRouter:Router = express.Router();

healthCheckRouter.get('/metric', async (req:Request, res:Response) => {

    res.status(200).send("hellow world")
});

// export router
export = healthCheckRouter;
