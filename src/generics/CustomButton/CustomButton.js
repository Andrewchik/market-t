import { Button } from "@material-ui/core";

import './CustomButton.scss'

function CustomButton ({ text, onClick = {}, borderButton = false, disabled = false }) {
    return (
        <Button
            className={ borderButton ? 'border-custom-button' : 'custom-button'}
            onClick={onClick}
            disabled={disabled}
        >
            { text }
        </Button>
    )
}

export default CustomButton
