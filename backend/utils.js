import jwt from 'jsonwebtoken';

export const generateToken = ({_id, name, email}) => {
    return jwt.sign({_id: _id, name: name, email: email}, process.env.JWT_PW, {expiresIn: '7d'});
}

export const isAuth = (req, res, next) => {
    const auth = req.headers.authorization;

    if(auth){
        const token = req.headers.authorization.split(" ")[1];
        
        jwt.verify(token, process.env.JWT_PW, (error, decode) => {
            if(error){
                res.status(401).send({message: error.message})
            }
            else{
                req.user = decode;
                next();
            }
        })
    }
    else{
        res.status(401).send({message: "Not authorized, no token"});
    }
}