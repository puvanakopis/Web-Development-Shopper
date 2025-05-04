import React, { useEffect, useState } from 'react'
import './Popular.css'
// import poularProducts from '../Assets/Frontend_Assets/data'
import Item from '../Item/Item'

const Popular = () => {

    const [poularProducts, setPoularProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/popularinwomen')
            .then((response) => response.json())
            .then((data) => {
                setPoularProducts(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    

return (
    <div className='popular'>
        <div className="popular-items">
            <h1>POPULAR IN WOMEN</h1>

            <hr />

            <div className="popular-item">
                {poularProducts.map((item, i) => {
                    return <Item className='item' key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}

            </div>
        </div>
    </div>
)
}

export default Popular