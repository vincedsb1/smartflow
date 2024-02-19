"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gère les erreurs et renvoie une réponse avec le statut 500 et le message "Internal Server Error".
 * @param {Request} req - L'objet de requête HTTP.
 * @param {Response} res - L'objet de réponse HTTP.
 */
var errorManager = function (req, res) {
    res.status(500).send("Internal Server Error");
};
exports.default = errorManager;
