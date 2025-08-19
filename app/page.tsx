'use client'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from 'react';
import { MdDelete, MdEdit  } from "react-icons/md";

export default function Home() {
    const [fetchMenu, setFetchMenu] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [form, setForm] = useState(false)
    const [delId, setDelId] = useState(null)
    const [editId, setEditId] = useState(null)
    const [tagValue, setTagValue] = useState("1");
    const [itemsValue, setItemsValue] = useState({image_url: '', item_name: '', description: '', price: '', category_id: '', tag_id: ''});

    //Get Menu Items
    const fetchMenuItems = async ()=>{
        const res = await fetch('http://localhost:3000/api/menu')
        if(!res.ok){
            setError(true)
        }
        const { getMenu } = await res.json();

        setFetchMenu(getMenu)
        setLoading(false)
    }

    useEffect(()=>{
        fetchMenuItems()
    }, [])

    //Post Menu Items
    const showForm = ()=>{
        setForm(true)
    }

    const hideForm = ()=>{
        setForm(false)
    }

    const submitForm = async (e:any)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const body = Object.fromEntries(formData)
        const post = await fetch('http://localhost:3000/api/menu',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })

        if(!post.ok){
            alert('Fail to add menu item')
            return
        }
        fetchMenuItems()
        setForm(false)
    }


    //Delete Menu Items
    const showActionCard = (id:any)=>{
        setDelId(id)
    }
    const hideActionCard = ()=>{
        setDelId(null)
    }

    const deleteMenu = async (id:any)=>{
        const del = await fetch(`http://localhost:3000/api/${id}`,{
            method: 'DELETE',
        })

        if(!del.ok){
            alert('Failed to delete menu')
            return
        }
        fetchMenuItems()
        setDelId(null)
    }

    //Edit Menu Items
    const editMenu = (items:any)=>{
        setEditId(items.id)
        setItemsValue({image_url: items.image_url, item_name: items.item_name, description: items.description, price: items.price, category_id: items.category_id, tag_id: items.tag_id})
    }

    const cancel = ()=>{
        setEditId(null)
        setItemsValue({image_url: '', item_name: '', description: '', price: '', category_id: '', tag_id: ''})
    }

    const submitEdit = async (id:any)=>{

        const editMenu = await fetch(`http://localhost:3000/api/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(itemsValue)
        })
        
        if(!editMenu.ok){
            alert('Fail to edit menu')
            return
        }
        fetchMenuItems()
        setEditId(null)
        setItemsValue({image_url: '', item_name: '', description: '', price: '', category_id: '', tag_id: ''})
    }




    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>Error fetching data...</h1>

    return (
        <div className="w-[80%] mx-auto py-10 relative">
            <div className='flex justify-between items-center cursor-pointer'>
                <h1 className="text-2xl font-bold">Food Items</h1>
                <button onClick={showForm} className='bg-[#1e2938] rounded cursor-pointer py-2 px-4'>Add Items</button>
            </div>
            <div className='w-[50%] mx-auto mb-5'>
                <input className="w-full focus:outline-none border border-gray-500 rounded-full my-5 px-4 py-1" type="text" placeholder="Search menu items.." />
            </div>

            <Tabs>
                <TabList>   
                    <Tab>All</Tab>
                    <Tab>Appetizers</Tab>
                    <Tab>Main Course</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Beverages</Tab>
                </TabList>
                <TabPanel>
                    <div className="grid grid-cols-4 gap-5 mt-5">
                        {fetchMenu.length ? (fetchMenu.map((items)=>(
                            <>
                            {editId === items.id ? (
                            <div key={items.id} className="bg-[#111828] rounded-xl relative">
                                <div className="relative">
                                    <img src={items.image_url} className="w-full h-48 object-cover rounded-t-xl" />

                                    <select onChange={(e)=>setItemsValue({...itemsValue, tag_id: e.currentTarget.value })} className='bg-gray-500 focus:outline-none rounded-full border text-sm absolute top-2 right-2 px-4' >
                                        <option value="1">Vegetarian</option>
                                        <option value="2">Non-Vegetarian</option>
                                        <option value="3">Spicy</option>
                                        <option value="4">Sweet</option>
                                        <option value="5">Alcoholic</option>
                                        <option value="6">Non-Alcoholic</option>
                                        <option value="7">Hot</option>
                                        <option value="8">Cold</option>
                                    </select>

                                    <input className="focus:outline-none text-[#e74a3b] tet-xl font-bold text-right absolute right-5 mt-2" type='number' value={itemsValue.price} onChange={(e)=>setItemsValue({...itemsValue, price: e.currentTarget.value })} />

                                </div>
                                <div className="grid gap-2 px-4 py-10">
                                    <input className="focus:outline-none mt-2" type='text' value={itemsValue.image_url} onChange={(e)=>setItemsValue({...itemsValue, image_url: e.currentTarget.value })} />

                                    <textarea className="focus:outline-none text-xl overflow-hidden" value={itemsValue.item_name} onChange={(e)=>setItemsValue({...itemsValue, item_name: e.currentTarget.value })}></textarea>
                                    <label className='font-bold'>Category</label>

                                    <select className='focus:outline-none bg-gray-500 border border-gray-400 rounded p-2'name="category_id" onChange={(e)=>setItemsValue({...itemsValue, category_id: e.currentTarget.value })}>
                                        <option value="1">Beverages</option>
                                        <option value="2">Main Course</option>
                                        <option value="3">Desserts</option>
                                        <option value="4">Appetizers</option>
                                    </select>

                                    <textarea className='focus:outline-none mb-2 overflow-hidden' value={itemsValue.description} onChange={(e)=>setItemsValue({...itemsValue, description: e.currentTarget.value })}></textarea>
                                    
                                    <div className=' grid grid-cols-2 gap-4'>
                                        <button onClick={()=>submitEdit(items.id)} className='bg-green-500 rounded text-white font-bold p-2'>Add</button>
                                        <button onClick={cancel} className='bg-red-500 rounded text-white font-bold p-2'>Cancel</button>
                                    </div>
                                </div>
                            </div>
                            ) : (
                            <div key={items.id} className="bg-[#111828] rounded-xl relative">
                                <div className="relative">
                                    <img src={items.image_url} className="w-full h-48 object-cover rounded-t-xl" />
                                    <p className={`rounded-full border text-sm absolute top-2 right-2 px-4 ${(items.tagName == 'Sweet') || (items.tagName == 'Vegetarian') || (items.tagName == 'Non-Alcoholic') || (items.tagName == 'Non-Alcoholic') ? 'bg-green-500' : 'bg-red-500'}`}>{items.tagName}</p>
                                    <p className="text-[#e74a3b] tet-xl font-bold absolute right-5 mt-2">{items.price}</p>
                                </div>
                                <div className="grid gap-2 px-4 py-10">
                                    <h2 className="text-xl font-bold">{items.item_name}</h2>
                                    <p className='mb-2'>{items.description}</p>
                                </div>
                                <div className="absolute bottom-1 right-1 flex space-x-4 py-1">
                                    <MdEdit onClick={()=>editMenu(items)} className='text-xl text-gray-500 cursor-pointer'/>
                                    <MdDelete onClick={()=>showActionCard(items.id)} className='text-xl text-gray-500 cursor-pointer'/>
                                    {delId === items.id ? (
                                    <div className='bg-[#1e2938] border border-gray-500 rounded absolute z-10'>
                                        <button onClick={()=>deleteMenu(items.id)} className='w-full hover:bg-gray-500 p-1'>Confirm</button>
                                        <button onClick={hideActionCard} className='w-full hover:bg-gray-500 p-1'>Cancel</button>
                                    </div>
                                    ) : (<></>)}
                                </div>
                            </div>
                            )}
                            </>
                        ))):(<h1 className='text-white'>No Items...</h1>)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-4 gap-5 mt-5">
                        {(fetchMenu.filter(items=>items.categoryName == 'Appetizers')).length ? (fetchMenu.filter(items=>items.categoryName == 'Appetizers').map((items)=>(
                            <div key={items.id} className="bg-[#111828] rounded-xl relative">
                              
                                <div className="relative">
                                    <img src={items.image_url} className="w-full h-48 object-cover rounded-t-xl" />
                                    <p className={`rounded-full border text-sm absolute top-2 right-2 px-4 ${(items.tagName == 'Sweet') || (items.tagName == 'Vegetarian') || (items.tagName == 'Non-Alcoholic') ? 'bg-green-500' : 'bg-red-500'}`}>{items.tagName}</p>
                                    <p className="text-[#e74a3b] tet-xl font-bold absolute right-5 mt-2">{items.price}</p>
                                </div>
                                <div className="grid gap-2 px-4 py-10">
                                    <h2 className="text-xl font-bold">{items.item_name}</h2>
                                    <p className='mb-2'>{items.description}</p>
                                </div>
                                <div className="absolute bottom-1 right-1 flex space-x-4 py-1">
                                    <MdEdit className='text-xl text-gray-500 cursor-pointer'/>
                                    <MdDelete onClick={()=>showActionCard(items.id)} className='text-xl text-gray-500 cursor-pointer'/>
                                    {delId === items.id ? (
                                    <div className='bg-[#1e2938] border border-gray-500 rounded absolute z-10'>
                                        <button onClick={()=>deleteMenu(items.id)} className='w-full hover:bg-gray-500 p-1'>Confirm</button>
                                        <button onClick={hideActionCard} className='w-full hover:bg-gray-500 p-1'>Cancel</button>
                                    </div>
                                    ) : (<></>)}
                                </div>  
                            </div>
                        ))): (
                        <h1 className='text-white'>No Items...</h1>
                        )}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-4 gap-5 mt-5">
                        {(fetchMenu.filter(items=>items.categoryName == 'Main Course')).length ? (fetchMenu.filter(items=>items.categoryName == 'Main Course').map((items)=>(
                            <div key={items.id} className="bg-[#111828] rounded-xl relative">
                            
                                <div className="relative">
                                    <img src={items.image_url} className="w-full h-48 object-cover rounded-t-xl" />
                                    <p className={`rounded-full border text-sm absolute top-2 right-2 px-4 ${(items.tagName == 'Sweet') || (items.tagName == 'Vegetarian') || (items.tagName == 'Non-Alcoholic') ? 'bg-green-500' : 'bg-red-500'}`}>{items.tagName}</p>
                                    <p className="text-[#e74a3b] tet-xl font-bold absolute right-5 mt-2">{items.price}</p>
                                </div>
                                <div className="grid gap-2 px-4 py-10">
                                    <h2 className="text-xl font-bold">{items.item_name}</h2>
                                    <p className='mb-2'>{items.description}</p>
                                </div>
                                <div className="absolute bottom-1 right-1 flex space-x-4 py-1">
                                    <MdEdit className='text-xl text-gray-500 cursor-pointer'/>
                                    <MdDelete onClick={()=>showActionCard(items.id)} className='text-xl text-gray-500 cursor-pointer'/>
                                    {delId === items.id ? (
                                    <div className='bg-[#1e2938] border border-gray-500 rounded absolute z-10'>
                                        <button onClick={()=>deleteMenu(items.id)} className='w-full hover:bg-gray-500 p-1'>Confirm</button>
                                        <button onClick={hideActionCard} className='w-full hover:bg-gray-500 p-1'>Cancel</button>
                                    </div>
                                    ) : (<></>)}
                                </div>
                            </div>
                        ))): (
                        <h1 className='text-white'>No Items...</h1>
                        )}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-4 gap-5 mt-5">
                        {(fetchMenu.filter(items=>items.categoryName == 'Desserts')).length ? (fetchMenu.filter(items=>items.categoryName == 'Desserts').map((items)=>(
                            <div key={items.id} className="bg-[#111828] rounded-xl relative">
                            
                                <div className="relative">
                                    <img src={items.image_url} className="w-full h-48 object-cover rounded-t-xl" />
                                    <p className={`rounded-full border text-sm absolute top-2 right-2 px-4 ${(items.tagName == 'Sweet') || (items.tagName == 'Vegetarian') || (items.tagName == 'Non-Alcoholic') ? 'bg-green-500' : 'bg-red-500'}`}>{items.tagName}</p>
                                    <p className="text-[#e74a3b] tet-xl font-bold absolute right-5 mt-2">{items.price}</p>
                                </div>
                                <div className="grid gap-2 px-4 py-10">
                                    <h2 className="text-xl font-bold">{items.item_name}</h2>
                                    <p className='mb-2'>{items.description}</p>
                                </div>
                                <div className="absolute bottom-1 right-1 flex space-x-4 py-1">
                                    <MdEdit className='text-xl text-gray-500 cursor-pointer'/>
                                    <MdDelete onClick={()=>showActionCard(items.id)} className='text-xl text-gray-500 cursor-pointer'/>
                                    {delId === items.id ? (
                                    <div className='bg-[#1e2938] border border-gray-500 rounded absolute z-10'>
                                        <button onClick={()=>deleteMenu(items.id)} className='w-full hover:bg-gray-500 p-1'>Confirm</button>
                                        <button onClick={hideActionCard} className='w-full hover:bg-gray-500 p-1'>Cancel</button>
                                    </div>
                                    ) : (<></>)}
                                </div>
                            </div>
                        ))): (
                        <h1 className='text-white'>No Items...</h1>
                        )}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-4 gap-5 mt-5">
                        {(fetchMenu.filter(items=>items.categoryName == 'Beverages')).length ? (fetchMenu.filter(items=>items.categoryName == 'Beverages').map((items)=>(
                            <div key={items.id} className="bg-[#111828] rounded-xl relative">
                                
                                <div className="relative">
                                    <img src={items.image_url} className="w-full h-48 object-cover rounded-t-xl" />
                                    <p className={`rounded-full border text-sm absolute top-2 right-2 px-4 ${(items.tagName == 'Sweet') || (items.tagName == 'Vegetarian') || (items.tagName == 'Non-Alcoholic') ? 'bg-green-500' : 'bg-red-500'}`}>{items.tagName}</p>
                                    <p className="text-[#e74a3b] tet-xl font-bold absolute right-5 mt-2">{items.price}</p>
                                </div>
                                <div className="grid gap-2 px-4 py-10">
                                    <h2 className="text-xl font-bold">{items.item_name}</h2>
                                    <p className='mb-2'>{items.description}</p>
                                </div>
                                <div className="absolute bottom-1 right-1 flex space-x-4 py-1">
                                    <MdEdit className='text-xl text-gray-500 cursor-pointer'/>
                                    <MdDelete onClick={()=>showActionCard(items.id)} className='text-xl text-gray-500 cursor-pointer'/>
                                    {delId === items.id ? (
                                    <div className='bg-[#1e2938] border border-gray-500 rounded absolute z-10'>
                                        <button onClick={()=>deleteMenu(items.id)} className='w-full hover:bg-gray-500 p-1'>Confirm</button>
                                        <button onClick={hideActionCard} className='w-full hover:bg-gray-500 p-1'>Cancel</button>
                                    </div>
                                    ) : (<></>)}
                                </div>
                            </div>
                        ))): (
                        <h1 className='text-white'>No Items...</h1>
                        )}
                    </div>
                </TabPanel>
            </Tabs>

            {form && (
                <div className='w-[50%] absolute top-[5%] right-0'>
                    <form onSubmit={submitForm} className='bg-[#111828] rounded grid gap-5 p-5'>
                        <input className='focus:outline-none border border-gray-400 rounded p-2' type="text" name="image_url" placeholder="Image url" />
                        <input className='focus:outline-none border border-gray-400 rounded p-2' type="text" name="item_name" placeholder="Item name" />
                        <textarea className='focus:outline-none border border-gray-400 rounded p-2' rows={5} name="description" placeholder="Description"></textarea>
                        <input className='focus:outline-none border border-gray-400 rounded p-2' type="number" name="price" placeholder="Price" />

                        <label className='font-bold'>Category</label>
                        <select className='focus:outline-none border border-gray-400 rounded p-2' multiple name="category_id">
                            <option value="1">Beverages</option>
                            <option value="2">Main Course</option>
                            <option value="3">Desserts</option>
                            <option value="4">Appetizers</option>
                        </select>

                        <label className='font-bold'>Tags</label>
                        <select className='focus:outline-none border border-gray-400 rounded p-2' multiple name="tag_id">
                            <option value="1">Vegetarian</option>
                            <option value="2">Non-Vegetarian</option>
                            <option value="3">Spicy</option>
                            <option value="4">Sweet</option>
                            <option value="5">Alcoholic</option>
                            <option value="6">Non-Alcoholic</option>
                            <option value="7">Hot</option>
                            <option value="8">Cold</option>
                        </select>
                        <div className='grid grid-cols-2 gap-5 px-5'>
                            <button className='bg-[#00b94b] rounded font-bold py-2' type="submit">Add Item</button>
                            <button onClick={hideForm} className='bg-[#e74a3b] rounded font-bold py-2'>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
}
