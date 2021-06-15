import { useState } from "react"

export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState)

    const reset = () => {
        console.log(initialState)
        setValues( initialState )
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    const updateState = (newState) => {
        setValues(newState)
    }

    return [ values, handleInputChange, reset, updateState ];
}