import { TiArrowBack } from 'react-icons/ti'
import React from 'react'

const BackButton = ({path, size}) => {
    return (
        <a href={path}><TiArrowBack size={size}/></a>
    )
}

export default BackButton;
