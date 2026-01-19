function CartSummary({total, quantity}){
    return (
        <>
         <div className="max-w-xl md:min-w-100 h-auto flex flex-col gap-2 bg-white p-3 rounded-2xl mt-4">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    <div className="flex justify-between gap-4">
                        <span>Subtotal ({quantity} items)</span>
                        <span>${total}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Standard Shipping</span>
                        <span className="text-green-400">Free</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Estimated Tax</span>
                        <span>$0</span>
                    </div>
                    <div className="flex justify-between">
                        <span>AI consultation fee</span>
                        <span>$0</span>
                    </div><hr />
                    <div className="flex justify-between">
                        <span className="text-xl">Total</span>
                        <span className="text-xl">${total}</span>
                    </div>
                    <button className="p-2 bg-amber-300 rounded-2xl">Proceed to checkout</button>
                </div>
        </>
    )
}

export default CartSummary;