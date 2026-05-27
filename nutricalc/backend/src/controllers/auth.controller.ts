import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {

    async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            const userExists = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (userExists) {
                return res.status(400).json({
                    error: "Usuário já existe",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            return res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
            });

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao cadastrar usuário",
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                return res.status(400).json({
                    error: "Email ou senha inválidos",
                });
            }

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(400).json({
                    error: "Email ou senha inválidos",
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "7d",
                }
            );

            return res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token,
            });

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao realizar login",
            });
        }
    }
}