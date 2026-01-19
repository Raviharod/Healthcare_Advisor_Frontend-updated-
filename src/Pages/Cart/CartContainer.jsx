import { useEffect, useState } from "react";
import axios from "axios";
import CartBox from "./CartBox";
import CartSummary from "./CartSummary";


const VITE_GET_CART_DETAILS = import.meta.env.VITE_GET_CART_DETAILS;
const VITE_INCREASE_PRODUCT_QUANTITY = import.meta.env.VITE_INCREASE_PRODUCT_QUANTITY;
const VITE_DECREASE_PRODUCT_QUANTITY = import.meta.env.VITE_DECREASE_PRODUCT_QUANTITY;
const VITE_REMOVE_FROM_CART = import.meta.env.VITE_REMOVE_FROM_CART;

function CartContainer() {
    const [cartProducts, setCartProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(null);
    const [update, setUpdate] = useState(true);


    useEffect(() => {
        async function getCartDetails() {
            try {
                const response = await axios.get(VITE_GET_CART_DETAILS, {
                    withCredentials: true
                });
                console.log(response.data.cartDetails)
                setCartProducts(response.data.cartDetails)
                setTotalAmount(response.data.cartDetails.reduce((total, product) => total + ((product.productId.price) * (product.quantity)), 0));
                // console.log("total price", totalAmount)
            } catch (err) {
                console.log(err)
            }
        }
        getCartDetails();
    }, [update]);

    const handleIncrease = async (id) => {
        // console.log("qantity increases", id);
        try {
            const response = await axios.post(VITE_INCREASE_PRODUCT_QUANTITY, { productId: id }, { withCredentials: true });
            setUpdate((prev)=>prev?false:true);
        } catch (err) {
            console.log("error increasing qauntity ", err);
        }
    }
    const handleDecrease = async (id) => {
        // console.log("qantity decrease", id);
        try {
            const response = await axios.post(VITE_DECREASE_PRODUCT_QUANTITY, { productId: id }, { withCredentials: true });
            setUpdate((prev)=>prev?false:true);
        } catch (err) {
            console.log("error decreasing qauntity ", err);
            
        }
    }

    const handleRemoveFromCart = async (id)=>{
        // console.log("removing item", id)
        try{
            const response = await axios.post(VITE_REMOVE_FROM_CART, {productId:id}, {withCredentials:true});
            setUpdate((prev)=>prev?false:true);
        }catch(err){
           console.log("error while removing item from the cart", err);
        }

    }

    return (
        <>
            {/* cart heading */}
            <div className="w-full h-auto px-8 py-4">
                <h2 className="text-3xl">Your Health Cart</h2>
                <p>You have {cartProducts.length} items in your cart ready to deliever</p>
            </div>

            <div className="w-full h-auto flex flex-wrap  px-10 py-4 justify-around">
                <div className="max-w-2xl flex flex-col gap-3">
                    {
                        cartProducts.length == 0 ? <div>Your cart is empty! Add some products to see your cart</div> : (cartProducts.map(product => {
                            return <CartBox key={product._id} product={product} handleIncrease={handleIncrease} handleDecrease={handleDecrease} handleRemoveFromCart={handleRemoveFromCart}></CartBox>
                        }))
                    }
                </div>
                <CartSummary total={totalAmount} quantity={cartProducts.length}></CartSummary>
            </div>
        </>
    )
}

export default CartContainer;