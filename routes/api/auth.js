const jwt = require("jsonwebtoken");
const uuid = require('uuid').v4;
const { jwtConfig } = require('../../config/index');
const { User } = require('../../db/models');

const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) =>{
    const userDataForToken = user.toSafeObject();
    const jwtid = uuid();
    const token = jwt.sign(
        { data: userDataForToken },
        secret,
        { expiresIn: Number.parseInt(expiresIn, 10) }
    );
    return { jti: jwtid, token: token };
}

const restoreUser = (req, res, next) => {
    const { token } = req.cookies;
    
    if(!token) {
        return next({ status: 401, message: 'no token' });
    }
    
    return jwt.verify(token, secret, null, async (err, paylod) => {
        if(err){
            res.clearCookie('token');
            err.status = 401;
            return next(err);
        }
        
        const tokenId = payload.jti;
            try {
                req.user = await User.findByTokenId(tokenId);
        } catch (e) {
            res.clearCookie("token");
            return next({ status: 401, message: "user not found" });
        }

        if (!req.user.isValid()) {
            res.clearCookie("token");
            return next({ status: 401, message: 'session not found' });
        }

        next();
    })
}

const authenticated = [restoreUser];

module.exports = { getUserToken, authenticated };