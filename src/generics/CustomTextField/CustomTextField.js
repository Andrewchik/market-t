import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";

import './CustomTextField.scss';

function CustomTextField({ placeholder, value, onChange, img }) {
    return (
        <div className={'custom-text-field'}>
            <TextField
                id="outlined-price-input"
                type="text"
                autoComplete={ placeholder }
                placeholder={ placeholder }
                variant="outlined"
                value={value}
                onChange={onChange}
                InputProps={{
                    startAdornment: img
                        ? (
                            <InputAdornment position="start">
                                <img src={img} alt="" />
                            </InputAdornment>
                        )
                        : <div />
                }}
            />
        </div>
    );
}

export default CustomTextField;
