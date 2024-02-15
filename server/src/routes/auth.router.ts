import express from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = express.Router();

const prefix = "/auth";

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión
 *     description: Permite a un usuario iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Authentication successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTcwODAxMjU5MH0.VbpxEP-uBHyoKHBbnmDpKQAoej9mz2yZk7Ye9Ss_baA"
 *       401:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       400:
 *         description: Error en la autenticación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error in authentication"
 */

authRouter.post(`${prefix}/login`, authMiddleware.login, authController.Login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtiene información del usuario actual
 *     description: Obtiene la información del usuario autenticado
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: true
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTcwODAxMzkwOX0.dwIzmLsdn-yze2XJLpgjjCKkvq2ntiUYnl_wnM81txA
 *     security:
 *       - Authorizarion: []
 *     responses:
 *       200:
 *         description: Información del usuario obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Validation ok!"
 *       401:
 *         description: Error en la autenticación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error in authentication"
 *       500:
 *         description: Error en la validación del token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error in validation"
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "JsonWebTokenError"
 *                     message:
 *                       type: string
 *                       example: "invalid signature"
 *
 *
 */

authRouter.get(`${prefix}/me`, authMiddleware.validateAdmin, authController.me);

export default authRouter;
