import jwt from 'jsonwebtoken'


export const  authMiddleware = (req,res,next) =>{

        const authHeader= req.headers.authorization;
        if(!authHeader){
            res.status(401).json({
                msg:"Token missing"
            })
        }
        const token = authHeader.split(" ")[1];
        console.log(token);
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECERT)
            console.log(decoded);
            req.user = decoded;
            next()
        }
        catch(err){
            res.status(400).json({msg:"Invalid token"})
        }

    }