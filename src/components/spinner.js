import  React from 'react';

const Spinner = () => {
    return(
        <div className='spinner-me'>
            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Spinner
