import React, {useState} from 'react';
import {IoIosArrowForward, IoIosArrowDown, IoIosAddCircleOutline} from "react-icons/io";
import {BiPencil, BiXCircle} from "react-icons/bi";
import {GoEye, GoEyeClosed, IoFastFoodOutline, RiForbid2Line } from "react-icons/all";
import {storeDeleteItem, storeModalMenuItem, storeModalMenu, showModal } from "../configureStore";


const MenuItem = ({menu, menuItems}) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [collapseButton, setCollapseButton] = useState(<IoIosArrowForward/>)

    storeModalMenuItem.subscribe(() => {
        console.log(storeModalMenuItem.getState())
    });

    storeModalMenu.subscribe(() => {
        console.log(storeModalMenu.getState())
    });

    storeDeleteItem.subscribe(() => {
        console.log(storeDeleteItem.getState())
    });

    const handleDelete = (id) => {
        storeDeleteItem.dispatch({
            type: 'DELETE_ITEM',
            payload: id
        });
    };

    function Link({label, href, icon, action}) {
        return (
            <a className="flex mr-3 cursor-pointer" href={href} onClick={action}>
                <div className="px-0.5">
                    {icon}
                </div>
                <div>
                    {label}
                </div>
            </a>
        )
    }


    const collapseField = () => {
        setIsCollapsed(!isCollapsed)
        {
            isCollapsed ?
                setCollapseButton(<IoIosArrowDown/>)
                :
                setCollapseButton(<IoIosArrowForward/>)
        }
    }

    let body = null;
    if (!isCollapsed) {
        body =
            <tbody>
            {menuItems.sort((item, nextItem)=>item.number-nextItem.number).map((item, index) =>
                (
                item.status !== 3 ?
                    <tr key={index} className="admin-content-row">
                        <td className="pl-2 md:pl-8 lg:pl-8">
                            <div className="w-1/12 flex float-left inline-block align-text-top pr-4 md:pr-10 lg:pr-10">
                                Nr. {item.number}
                            </div>
                            <div className="w-3/12 flex float-left inline-block align-text-top pr-4 md:pr-10 lg:pr-10">
                                {item.name}
                            </div>
                            <div className="w-4/12 inline-block">
                                {item.description}
                            </div>

                            <div className="md:flex float-right inline-block align-text-top pr-4 md:pr-10 lg:pr-10">
                                 {item.empty===0?
                                    <Link icon={<RiForbid2Line size={20}/>} 
                                          label="Vis tomt" href={Routes.admin_set_item_empty_status_path({item_id: item.id, status: 1})} />
                                    : <Link icon={<IoFastFoodOutline size={20}/>} 
                                            label="Vis vanlig" href={Routes.admin_set_item_empty_status_path({item_id: item.id, status: 0})} />}
                                |
                                {item.status === 2 ?
                                    <Link icon={<GoEye size={20}/>}
                                          label="Vis"
                                          href={Routes.admin_set_item_status_path({
                                              item_id: item.id,
                                              status: 1})}/>
                                    : <Link icon={<GoEyeClosed size={20}/>}
                                            label="Skjul"
                                            href={Routes.admin_set_item_status_path({
                                                item_id: item.id,
                                                status: 2})}/>
                                }
                                | <Link icon={<BiPencil size={20}/> }
                                        label="Rediger"
                                        href={Routes.edit_admin_menu_item_path(item)}/>
                                | <Link icon={<BiXCircle size={20}/> }
                                        label="Slett"
                                        action={() => { storeModalMenuItem.dispatch(showModal());
                                        handleDelete(item.id); }}/>
                            </div>
                        </td>
                    </tr> : null
                )
            )}

            <tr className="bg-gray-100 h-10">
                <td className="pl-1 md:pl-7 lg:pl-7">
                    <Link icon={<IoIosAddCircleOutline size={22}/>} label="Legg til"
                          href={Routes.new_admin_menu_item_path({menu_id: menu.id})}/>
                </td>
            </tr>
            </tbody>
    }


    return (
        <table className="mb-3 admin-title-row">
            <thead className="">
            <tr className="admin-tbl-border">
                <th className="text-left">
                    <div className="pl-2 md:pl-8 lg:pl-8 inline-block ">
                        {menu.name}
                    </div>
                    <div className="inline-block">
                    </div>
                    <div className="flex inline-block float-right pr-4 md:pr-8 lg:pr-8">

                        {menu.status === 2 ?
                            <Link icon={<GoEye size={20}/>}
                                  label="Vis"
                                  href={Routes.admin_set_menu_status_path({menu_id: menu.id, status: 1})}/>
                            : <Link icon={<GoEyeClosed size={20}/>} label="Skjul"
                                    href={Routes.admin_set_menu_status_path({menu_id: menu.id, status: 2})}/>}
                        | <Link icon={<BiPencil size={20}/>}
                                label="Rediger"
                                href={Routes.edit_admin_menu_path(menu)}/>
                        | <Link icon={<BiXCircle size={20}/>}
                                label="Slett"
                                action={() => { storeModalMenu.dispatch(showModal());
                                    handleDelete(menu.id); }}/>
                        | <button onClick={collapseField} className="collapsible px-1">{collapseButton}</button>
                    </div>
                </th>
            </tr>
            </thead>
            {body}
        </table>
    )
}

export default MenuItem;
