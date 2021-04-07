import React, {useState} from 'react';
import {IoIosArrowForward, IoIosArrowDown, IoIosAddCircleOutline} from "react-icons/io";
import {BiPencil, BiXCircle} from "react-icons/bi";
import axios from "axios";
import {GoEye, GoEyeClosed} from "react-icons/all";
//import Modal from './modal';


const MenuItem = ({menu, menuItems}) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [collapseButton, setCollapseButton] = useState(<IoIosArrowForward/>)
    const [show, setShow] = useState(false)


    function Link({label, href, icon, method}) {
        return (
            <a className="flex mr-3" href={href} >
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
        if (isCollapsed)
            setCollapseButton(<IoIosArrowDown/>)
        else
            setCollapseButton(<IoIosArrowForward/>)
    }

    let body = (
        <tbody>
        {isCollapsed === false && menuItems.map((item, index) =>
                (
                    item.status!==3?
                    <tr key={index} className="admin-content-row">
                        <td className="pl-2 md:pl-8 lg:pl-8">
                            <div className="w-2/6 flex float-left inline-block align-text-top pr-4 md:pr-10 lg:pr-10">
                                {item.name}
                            </div>
                            <div className="w-2/6 inline-block">
                                {item.description}
                            </div>
                            <div className="md:flex float-right inline-block align-text-top pr-4 md:pr-10 lg:pr-10">


                                {item.status==2?
                                    <Link icon={<GoEye size={20}/>} label="Vis" href={Routes.admin_set_item_status_path({item_id: item.id, status: 1})} method={0}/>
                                    : <Link icon={<GoEyeClosed size={20}/>} label="Skjul" href={Routes.admin_set_item_status_path({item_id: item.id, status: 2})} method={0}/>}
                                | <Link icon={<BiPencil size={20}/>} label="Rediger" href={Routes.edit_admin_menu_item_path(item)}  method={0}/>
                                | <Link icon={<BiXCircle size={20}/>} label="Slett" href={Routes.admin_set_item_status_path({item_id: item.id, status: 3})} method={0}/>
                            </div>
                        </td>
                    </tr>:""
                )
            )
        }
        {isCollapsed === false &&
        <tr className="bg-gray-100 h-10">
            <td className="pl-1 md:pl-7 lg:pl-7">
                <Link icon={<IoIosAddCircleOutline size={22}/>} label="Legg til"
                      href={Routes.new_admin_menu_item_path({menu_id: menu.id})}/>
            </td>
        </tr>
        }
        </tbody>
    )

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
                    <Link icon={<BiPencil size={20}/>} label="Rediger" href={Routes.edit_admin_menu_path(menu)}/>
                    <Link icon={<BiXCircle size={20}/>} label="Slett" href={Routes.admin_menu_path(menu)}/>
                    <button onClick={collapseField} className="collapsible ">{collapseButton}</button>
                </div>
            </th>
        </tr>
        </thead>
        {body}
    </table>
    )
}

export default MenuItem;
