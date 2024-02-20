
import { Request, Response } from 'express-serve-static-core';


const errorManager = (req: Request, res: Response): void => {
    res.status(500).send("Internal Server Error");
};

export default errorManager;