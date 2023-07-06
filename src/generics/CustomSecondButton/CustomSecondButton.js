import { Button } from "@material-ui/core";

import './CustomSecondButton.scss'

function CustomSecondButton ({ text, onClick = {}, borderButton = false, disabled = false }) {
    return (
        <Button
            className={ borderButton ? 'border-custom-button-home' : 'custom-button-home'}
            onClick={onClick}
            disabled={disabled}
        >
            { text }
        </Button>
    )
}

export default CustomSecondButton
