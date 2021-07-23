import { getUserExists } from '../../src/services/Communication';
import jwt from 'jsonwebtoken';

export default async function validate_user(request,response){
    const token = request.headers.authorization
    const haveAuthorization = Boolean(token)
    if(haveAuthorization){
        const decodedInfo = jwt.decode(token)
        const user = decodedInfo.githubUser;
        const dado = await getUserExists(user);

        response.json({ exists: dado });
        return;

    }

    response.status(404).json({
        message: 'Request missing Authorization'
    })
}
