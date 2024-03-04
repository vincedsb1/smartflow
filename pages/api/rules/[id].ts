import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const ruleId = Number(req.query.id);

    if (req.method === "GET") {
        try {
            const rule = await prisma.rule.findUnique({ where: { id: ruleId } });
            if (rule === null) {
                res.status(404).end();
            } else {
                res.json(rule);
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            }
        }
    } else if (req.method === "PUT") {
        try {
            const updatedRule = await prisma.rule.update({
                where: { id: ruleId },
                data: req.body,
            });
            res.json(updatedRule);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            }
        }
        // Handle PUT request to update a rule
    } else if (req.method === "DELETE") {
        
        // Handle DELETE request to delete a rule
    } else {
        res.status(405).end();
    }
}
