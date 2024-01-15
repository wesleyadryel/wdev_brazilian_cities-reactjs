import React, { useState, ChangeEvent, InputHTMLAttributes } from "react";
import { valueProps } from "./types";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onValueUpdate?: (value: valueProps) => void
}

const InputComponent: React.FC<InputProps> = (props) => {
    const [input, setInput] = useState<valueProps>(undefined);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInput(e.target.value);
        if (props.onValueUpdate) {
            props.onValueUpdate(e?.target?.value)
        }
    };

    const { onValueUpdate, value, onChange, ...sanitizeProps } = props;
    return (
        <>
            <input
                {...sanitizeProps}
                onChange={handleInputChange}
                value={input || ''}
            />
        </>
    );
};

export default InputComponent;
