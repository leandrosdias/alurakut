import { SiteClient } from 'datocms-client';

export default async function recebedorRequests(request, response) {
    if (request.method == 'POST' && request.headers.action == 'Create') {
        return await CreateNewTime(request, response);
    }

    if (request.method == 'POST' && request.headers.action == 'Get') {
        return GetTimes(response);
    }
}

async function GetTimes(response) {
    const client = new SiteClient(process.env.TOKEN_DATOCMS);

    const record = await client.items.all({
    });

    response.json({
        dados: 'Algum dado qualquer',
        registroCriado: record.map((item) => {
            return {
                id: item.id,
                nome: item.nome,
                image: item.image,
                url: item.url
            }
        })
    });
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
