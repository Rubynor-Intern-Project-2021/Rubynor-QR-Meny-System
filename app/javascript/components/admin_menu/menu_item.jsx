import React, {useState} from 'react'
import {IoIosArrowForward, IoIosArrowDown, IoIosCloseCircle, IoIosAddCircleOutline} from "react-icons/io";
import {BiPencil, BiXCircle} from "react-icons/bi";


const MenuItem = ({menu, menuItems}) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [collapseButton, setCollapseButton] = useState(<IoIosArrowForward/>)

    function Link({label, href, icon}) {
        return (
            <a className="flex mr-3" href={href}>
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
        {isCollapsed === false && menuItems.map((item, index) => (
                <tr className="bg-gray-100 border-b border-gray-200" key={index}>
                    <td className="align-text-top p-2">
                        {item.name}
                    </td>
                    <td className="text-left p-2">
                        {item.description}
                    </td>
                    <td className="flex pl-32 align-text-top p-2">
                        <Link icon={<BiPencil size={20}/>} label="Rediger" href={Routes.edit_admin_menu_item_path(item)}/>
                        <Link icon={<BiXCircle size={20}/>} label="Slett" href={Routes.admin_menu_item_path(item)}/>
                    </td>
                </tr>
            )
        )}
        {isCollapsed === false &&
        <tr className="bg-gray-100">
            <td className="p-2">
                <Link icon={<IoIosAddCircleOutline size={22}/>} label="Legg til"
                      href={Routes.new_admin_menu_item_path({menu_id: menu.id})}/>
            </td>
            <td>
            </td>
            <td>
            </td>
        </tr>
        }
        </tbody>
    )

    return (
        <table className="mb-2 table-fixed w-full bg-gray-200 text-gray-800 tracking-wide">
            <tr className="border-b-2 border-gray-300">
                <th className=" w-1/4 text-left pl-4 py-2">
                    {menu.name}
                </th>
                <th className="w-1/2">

                </th>
                <th className="flex w-1/4 pl-32 pt-2">
                    <Link icon={<BiPencil size={20}/>} label="Rediger" href={Routes.edit_admin_menu_path(menu)}/>
                    <Link icon={<BiXCircle size={20}/>} label="Slett" href={Routes.admin_menu_path(menu)}/>
                    <button onClick={collapseField} className="collapsible ">{collapseButton}</button>
                </th>
            </tr>
            {body}
        </table>
    )
}

export default MenuItem;
