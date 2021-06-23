import { FormControl, Select } from "@material-ui/core";

import './CustomSelect.scss'

function CustomSelect({text = 'Sort by', initialOption, options = [], handleChange = () => {} }) {
    return (
        <div className={'custom-select-container'}>
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
