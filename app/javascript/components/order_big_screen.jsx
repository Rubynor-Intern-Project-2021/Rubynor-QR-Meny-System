import {animated} from "react-spring";

const OrderBigScreen = ({style, onClickDown, onClickUp, handleChange, amount, name, totalPrice})=> {
    return (
        <div className="flex justify-between z-10 relative">
            <div className="pl-8 py-1.5">

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
                    <div className="pl-7 text-gray-500">
                        {name}
                    </div>
                </div>
            </div>
            <div>
                <animated.div style={style} className="pr-8 py-1.5 text-gray-700 bg-white">
                    {totalPrice},00 NOK
                </animated.div>
            </div>
        </div>
    )
}

export default OrderBigScreen;