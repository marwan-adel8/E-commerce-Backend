import { expressjwt } from "express-jwt";

function authJwt() {
    const secret = process.env.JWT_SECRET;
    return expressjwt({
        secret: secret,
        algorithms: ["HS256"],
        isRevoked:isRevoked



    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS']},
            "/api/v1/users/login",
            "/api/v1/users/register",
        ]
    })
}



    async function isRevoked(req, token) {
        if (!token.payload.isAdmin) {
            return true;
        }
        return false;
    }

export default authJwt;