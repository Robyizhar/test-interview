import React from 'react'

const Button = ({property, icon, onAction}) => {
    return (
        <button onClick={onAction} type="button" className={property}><i className={icon}></i></button>
    )
}

export default Button