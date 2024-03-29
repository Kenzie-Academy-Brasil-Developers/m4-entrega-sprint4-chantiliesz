import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config"

const ensureAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({
            message: 'invalid token'
        })
    }

    token = token.split(' ')[1]

    jwt.verify(token, String(process.env.SECRET_KEY), (error, decoded: any) => {
        if (error) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        req.user = {
            id: decoded.sub,
            isAdmin: decoded.isAdm,
            isActive: decoded.isActive
        }
        return next()
    })
    
}

export default ensureAuthMiddleware;

