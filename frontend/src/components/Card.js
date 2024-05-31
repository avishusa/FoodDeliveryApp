import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart,useCart } from './ContextReducer';
import './card.css'

export default function Card(props) {
    let dispatch=useDispatchCart();
    let data=useCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    let foodItem = props.foodItem;
    const [qty,setQty]=useState(1);
    const [size,setSize]=useState("");
    const priceRef = useRef();
    const [isButtonClicked, setIsButtonClicked] = useState(false);



    const handleAddToCart = async() => {
        let food=[]
        setIsButtonClicked(true);
        setTimeout(() => {
            setIsButtonClicked(false);
        }, 500);
        for (const item of data){
            if (item.id===props.foodItem._id){
                food=item;
                break;
            }
        }
        if (food.length !=0){
            if (food.size===size){
                await dispatch({type:'UPDATE',id:props.foodItem._id,price:finalPrice,qty:qty})
                return
            }else if(food.size!==size){
                await dispatch({type:'ADD',id:props.foodItem._id, name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
                return 
            }
            return
        }
        await dispatch({type:'ADD',id:props.foodItem._id, name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
        alert(`${props.foodItem.name} added to your cart !!`)

        
    }
    let finalPrice=qty*parseInt(options[size])
    useEffect(()=>{
        setSize(priceRef.current.value)
    })
    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img className="card-img-top" style={{ height: '120px', objectFit: "fill" }} src={foodItem.img} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{foodItem.name}</h5>
                    <div hidden={!localStorage.getItem("token")} className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>

                        <div className='d-inline h-100 fs-5'>
                            ${finalPrice}
                        </div>
                    </div>
                    <hr>
                    </hr>
                    <button hidden={!localStorage.getItem("token")} className={`btn btn-success justify-center ms-2 ${isButtonClicked ? 'button-click-animation':""}`} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
