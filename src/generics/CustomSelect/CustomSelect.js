import { FormControl, Select } from "@material-ui/core";

import './CustomSelect.scss'

import CustomButton from "../CustomButton/CustomButton";

function CustomSelect({
    text = 'Sort by',
    initialOption,
    options = [],
    handleChange = () => {},
    showUnboxButton = false
}) {

    const handleUnboxPackClick = () => {
        window.open("https://flow.darkcountry.io/unpacker/land", '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={'custom-select-container'}>
            { showUnboxButton &&
                <CustomButton
                    text={'Unbox Pack'}
                    onClick={handleUnboxPackClick}
                />
            }

            <FormControl variant="outlined">
                <Select
                    native
                    value={initialOption}
                    onChange={(e) => handleChange(e.target.value)}
                >
                    <option value="" disabled>{ text }</option>
                    {options.map(option =>
                        <option value={option} key={option}>{ option }</option>
                    )}
                </Select>
            </FormControl>
        </div>
    );
}

export default CustomSelect
