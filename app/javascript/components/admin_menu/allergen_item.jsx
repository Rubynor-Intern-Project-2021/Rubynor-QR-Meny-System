import React, {useState} from 'react';
import {IoIosArrowForward, IoIosArrowDown, IoIosAddCircleOutline} from "react-icons/io";
import {BiPencil, BiXCircle} from "react-icons/bi";
//import Modal from './modal';


const AllergenItem = ({allergen}) => {
    const [show, setShow] = useState(false)


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

    return (

    <table className="mb-3 admin-title-row">
        <thead className="">
        <tr className="admin-tbl-border">
            <th className="text-left">
                <div className="pl-2 md:pl-8 lg:pl-8 inline-block ">
                    {allergen.short_name} - {allergen.name}
                </div>
                <div className="inline-block">
                </div>
                <div className="flex inline-block float-right pr-4 md:pr-8 lg:pr-8">
                    <Link icon={<BiPencil size={20}/>} label="Rediger" href={Routes.edit_admin_allergen_path(allergen)}/>
                    <Link icon={<BiXCircle size={20}/>} label="Slett" href={Routes.admin_allergen_slett_path({a_id: allergen.id})}/>
                </div>
            </th>
        </tr>
        </thead>
    </table>
    )
}

export default AllergenItem;
