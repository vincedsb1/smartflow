
import { Request, Response } from 'express-serve-static-core';

/**
 * Gère les erreurs et renvoie une réponse avec le statut 500 et le message "Internal Server Error".
 * @param {Request} req - L'objet de requête HTTP.
 * @param {Response} res - L'objet de réponse HTTP.
 */
const errorManager = (req: Request, res: Response): void => {
    res.status(500).send("Internal Server Error");
};

export default errorManager;