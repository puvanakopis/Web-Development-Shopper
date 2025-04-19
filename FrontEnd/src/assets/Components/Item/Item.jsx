import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
    return (
        <div className='item'>
            <img src={props.image} alt="" />

            <p>{props.name}</p>

            <div className="item-prices">
                <div className="item-prices-new">
                    ${props.new_price}
                </div>
                <div className="item-prices-old">
                    ${props.old_price}
                </div> 
            </div>


            <Link className='view' to={`/product/${props.id}`} onClick={window.scrollTo(0,0)}>View</Link>
        </div>
    )
}

export default Item