import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";


export type EditableSpanPropsType = {
    name: string
    callback: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const {name, callback} = props;
    const [field, setField] = useState<"span" | "input">("span");
    const [value, setValue] = useState(name);

    const onDoubleClickHandler = () => {
        setField("input");
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const onBlurHandler = () => {
        callback(value);
        setField("span");
    }

    return (
        <>
            {field === "input" ? <TextField
                variant={"standard"}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                value={value}
                autoFocus
            /> : <span onDoubleClick={onDoubleClickHandler}>{name}</span>}
        </>
    );
});