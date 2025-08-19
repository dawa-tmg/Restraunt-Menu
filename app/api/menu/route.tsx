import knex from "knex";
import knexConfig from "@/knexfile";

const kn = knex(knexConfig.development);

export async function GET() {
    const food_items = await kn('food_items').select('*');
    const categories = await kn('categories').select('*');
    const tags = await kn('tags').select('*');

    const getMenu = food_items.map((items)=>{
        const category = categories.find((category)=> category.id === items.category_id);
        const tag = tags.find((tag)=> tag.id === items.tag_id);
        return {
            ...items,
            categoryName: category.category_name,
            tagName: tag.tag_name
        }
    })

    return Response.json({ getMenu });
}

export async function POST(req: Request){
    const { category_id, tag_id, image_url, item_name, description, price } = await req.json();

    if(!category_id || !tag_id || !item_name || !description || !price){
        return Response.json({error: 'All fields are required.'})
    }

    const [ addMenu ] = await kn('food_items').insert({ category_id, tag_id, image_url, item_name, description, price }).returning('*');
    return Response.json({message: 'Post successful'}, addMenu)
}