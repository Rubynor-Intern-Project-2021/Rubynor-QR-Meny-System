import {animated} from "react-spring";

const OrderSmallScreen = (style, onClickDown, onClickUp, handleChange, amount, name, totalPrice) => {
    return (
        <animated.div style={style} className="px-8 py-1.5 my-0.5 flex bg-white justify-between z-10 relative">
            <div className="flex justify-between">
                <div className="text-gray-800 ">
                    <div className="flex ">
                        <button onClick={onClickDown} onChange={handleChange} className="text-green-400 ">
                            &mdash;
                        </button>
                        <p className="px-3"> {amount} </p>
                        <button onClick={onClickUp} onChange={handleChange} className="text-green-400 ">
                            &#xff0b;
                        </button>
                    </div>
                </div>
                <div className="pl-7 text-gray-500" >
                    {name}
                </div>
            </div>
            <div className="text-gray-700 ">
                {totalPrice},00 NOK
            </div>
        </animated.div>
    )
}
export default OrderSmallScreen();