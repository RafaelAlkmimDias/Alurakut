import { SiteClient } from 'datocms-client';

export default async function main(request, response){

    if(request.method === 'POST'){
        const TOKEN = '7463af63c06c2000e09299093f525d';
        const client = new SiteClient( TOKEN );
    
        const record = await client.items.create({
            itemType: '1002870',
            ...request.body
        });
    
        response.json({ record: record });
        return;
    }

    response.status(404).json({
        message: 'Get request not available'
    })

}