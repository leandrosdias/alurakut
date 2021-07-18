import { SiteClient } from 'datocms-client';

export default async function recebedorRequests(request, response) {
    if (request.method == 'POST' && request.headers.action == 'Create') {
        return await CreateUser(request, response);
    }

    if (request.method == 'POST' && request.headers.action == 'AddTeam') {
        return AddTeam(request, response);
    }
}

async function AddTeam(request, response) {
    const client = new SiteClient(process.env.TOKEN_DATOCMS);

    const itemId = request.headers.userid;

    client.items
        .update(itemId, {
            times: request.headers.timesuser,
        })
        .then((item) => {
            response.json(item);
            return;
        })
        .catch((error) => {
            console.error(error);
        });

}

async function CreateUser(request, response) {
    const client = new SiteClient(process.env.TOKEN_DATOCMS);

    const user = await GetUser(request);

    if (user !== null) {
        response.json(user);
        return;
    }

    const record = await client.items.create({
        itemType: "976902",
        ...request.body,
    });

    response.json(record);
    return;

}

async function GetUser(request) {
    const client = new SiteClient(process.env.TOKEN_DATOCMS);

    const records = await client.items.all({
        filter: {
            type: '976902',
            fields: {
                username: { eq: request.headers.username }
            }
        }
    });

    if (records.length == 0) {
        return null;
    }

    const user = records[0];
    return user
}
