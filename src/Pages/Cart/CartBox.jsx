import { Link } from "react-router-dom";

function CartBox({ product ,handleIncrease, handleDecrease, handleRemoveFromCart}) {
    // console.log(product)
    return (
        <>
            <div className="w-full h-auto p-2 bg-white flex rounded-2xl justify-between">

                <div className="flex">
                    <img className="w-[25%] md:w-[15%] h-auto mr-2.5 rounded-xl shadow-2xl" src={product.
                        productId.
                        image} alt="" />
                    <div>
                        <h3 className="text-sm md:text-md"><b>{product.
                            productId.name}</b></h3>
                        <p className="text-sm mb-3">{product.productId.description}</p>
                        <button className="p-1 bg-red-300 rounded text-sm hover:cursor-pointer" onClick={()=>handleRemoveFromCart(product._id)}>Remove</button>
                    </div>
                    
                </div>
                <span className="flex flex-col justify-between items-center">
                    <h4>${product.productId.price}</h4>
                    <div className="px-3 py-1 rounded-xl flex justify-between gap-4 bg-green-200">
                        <button className="text-md font-bold hover:cursor-pointer" onClick={()=>{
                            if(product.quantity>=0){
                              return handleIncrease(product.productId._id)
                            }
                            }}>+</button>
                        <span>{product.quantity}</span>
                        <button className="text-md font-bold hover:cursor-pointer" onClick={()=>handleDecrease(product.productId._id)}>-</button>
                    </div>
                </span>
            </div>
        </>
    )
}

export default CartBox;