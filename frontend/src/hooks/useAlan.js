import { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";

const COMMANDS = {
    ADD_PRODUCT: "add-product",
};

export default function useAlan() {
    const [alanInstance, setAlanInstance] = useState();
    const dispatch = useDispatch();

    function addProductToCart(product) {
        dispatch(addToCart(product._id, 1));
    }

    useEffect(() => {
        if (alanInstance != null) return;

        setAlanInstance(
            alanBtn({
                key: process.env.REACT_APP_ALAN_KEY,
                onCommand: (commandData) => {
                    const { command, payload } = commandData;

                    if (command === COMMANDS.ADD_PRODUCT) {
                        addProductToCart(payload);
                    }
                },
            })
        );
    }, [alanInstance, addProductToCart]);

    return null;
}
