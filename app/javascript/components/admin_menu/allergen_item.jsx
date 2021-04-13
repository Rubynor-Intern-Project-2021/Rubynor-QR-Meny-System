import React from 'react';
import {BiPencil, BiXCircle} from "react-icons/bi";
import {showModal, storeDeleteItem, storeModalAllergen} from "../configureStore";


const AllergenItem = ({allergen}) => {

    const handleDelete = (id) => {
        storeDeleteItem.dispatch({
            type: 'DELETE_ITEM',
            payload: id
        });
    };

    function Link({label, href, icon, action}) {
        return (
            <a className="flex mr-3" href={href} onClick={action}>
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
                    <Link icon={<BiPencil size={20}/>}
                          label="Rediger"
                          href={Routes.edit_admin_allergen_path(allergen)}/>
                    <Link icon={<BiXCircle size={20}/>}
                          label="Slett"
                          action={() => { storeModalAllergen.dispatch(showModal());
                            handleDelete(allergen.id); }}/>
                </div>
            </th>
        </tr>
        </thead>
    </table>
    )
}

export default AllergenItem;
