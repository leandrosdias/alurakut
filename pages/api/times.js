import { SiteClient } from 'datocms-client';

export default async function recebedorRequests(request, response) {
    if (request.method == 'POST' && request.headers.action == 'Create') {
        return await CreateNewTime(request, response);
    }

    if (request.method == 'GET') {
        if (request.headers.timename !== null) {
            return GetTime(request, response);
        }
        return GetTimes(response);
    }
}

async function GetTime(request, response) {
    const client = new SiteClient(process.env.TOKEN_DATOCMS);

    if (request.headers.id !== null && request.headers.id !== undefined) {
        const results = await client.items.all({
            filter: {
                type: '972993',
                fields: {
                    id: { eq: request.headers.id }
                }
            }
        });

        if (results.length === 0) {
            return null;
        }

        return response.json(results[0])
    }

    const records = await client.items.all({
        filter: {
            type: '972993',
            fields: {
                nome: { eq: request.headers.timename }
            }
        }
    });

    if (records.length === 0) {
        return null;
    }

    return response.json(records[0])
}

async function GetTimes(response) {
    const client = new SiteClient(process.env.TOKEN_DATOCMS);

    const record = await client.items.all({
        filter: {
            type: '972993'
        }
    });

    response.json(record);
}

async function CreateNewTime(request, response) {
    const client = new SiteClient(process.env.TOKEN_DATOCMS);

    const record = await client.items.create({
        itemType: "972993",
        ...request.body,
    });

    response.json({
        dados: 'Algum dado qualquer',
        registroCriado: record
    });
}
