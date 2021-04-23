import { TiArrowBack } from 'react-icons/ti'
import React from 'react'

const BackButton = ({path}) => {
    return (
        <a href={path}><TiArrowBack /></a>
    )
}

export default BackButton;