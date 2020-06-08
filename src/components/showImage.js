import React from 'react'

const Image = ({url}) => {

    return(
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <img src={url} alt="image"/>
        </div>
    )
}

export default Image