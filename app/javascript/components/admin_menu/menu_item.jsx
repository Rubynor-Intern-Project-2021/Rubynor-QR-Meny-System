import React, {useState} from 'react'
import {FaArrowDown, FaArrowRight} from "react-icons/fa";

const MenuItem = ({menu, menuItems}) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [collapseButton, setCollapseButton] = useState(<FaArrowRight/>)

    const collapseField = () => {
        setIsCollapsed(!isCollapsed)
        if(isCollapsed)
            setCollapseButton(<FaArrowDown/>)
        else
            setCollapseButton(<FaArrowRight/>)
    }

    let body = (
        <tbody>
        { isCollapsed === false && menuItems.map((item, index) => (
            <tr key={index} className="h-10">
                <td className="pl-8">
                    { item.name }
                </td>
            </tr>)
        )}
        </tbody>
    )

    return (
        <table className="mb-4 table-fixed w-full text-white">
            <thead className="bg-gray-800">
            <tr className="h-20">
                <th className="text-left">
                    <div className="ml-8 inline-block w-9/12">
                        {menu.name}
                    </div>
                    <div>
                    </div>
                    <div className="inline-block float-right pr-10">
                        <button onClick={collapseField} className="collapsible w-5 h-5">{collapseButton}</button>
                    </div>
                </th>
            </tr>
            </thead>
            {body}
        </table>
    )
}

export default MenuItem;
