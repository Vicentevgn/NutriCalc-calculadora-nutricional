import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
    id: string;
}

export interface AuthRequest extends Request {
    userId?: string;
}

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: "Token não informado",
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as TokenPayload;

        req.userId = decoded.id;

        next();
    } catch {
        return res.status(401).json({
            error: "Token inválido",
        });
    }
}