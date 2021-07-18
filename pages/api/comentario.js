import { SiteClient } from 'datocms-client';

export default async function recebedorRequests(request, response) {
    if (request.method == 'POST') {
        return await CreateComentario(request, response);
    }

    if (request.method == 'GET') {
        return GetComentarios(request, response);
    }
}

async function CreateComentario(request, response) {
    const client = new SiteClient(process.env.TOKEN_DATOCMS);

    const record = await client.items.create({
        itemType: "976903",
        ...request.body,
    });

    response.json(record);
}

async function GetComentarios(request, response) {
    const client = new SiteClient(process.env.TOKEN_DATOCMS);

    const records = await client.items.all({
        filter: {
            type: '976903',
            fields: {
                time: { eq: request.headers.time }
            }
        }
    });
    response.json(records);
}