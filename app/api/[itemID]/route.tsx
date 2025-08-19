import knex from "knex";
import knexConfig from "@/knexfile";

const kn = knex(knexConfig.development);

export async function DELETE(req:Response, {params}:any) {
    const { itemID } = await params;

    const delItem = await kn('food_items').where({ id: itemID }).del();
    return Response.json({message: 'Delete successful.'});
}

export async function PUT(req: Request, {params}: any) {
    const { itemID } = await params;
    const { category_id, tag_id, image_url, item_name, description, price } =await req.json();

    const [ editItem ] = await kn('food_items').where({ id: itemID }).update({ category_id, tag_id, image_url, item_name, description, price }).returning('*');
    return Response.json({message: 'Update successful.'}, editItem);
}