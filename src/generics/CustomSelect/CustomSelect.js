import { FormControl, Select } from "@material-ui/core";

import './CustomSelect.scss'


function CustomSelect({
    text = 'Sort by',
    initialOption,
    options = [],
    handleChange = () => {},
    showUnboxButton = false,
    items,
    itemImxToShow,
    blockchainSelected,
    waxItemsToShow
}) {

    // const handleUnboxPackClick = () => {
    //     window.open("https://flow.darkcountry.io/unpacker/land", '_blank', 'noopener,noreferrer');
    // };

    return (
        <div className={'custom-select-container'}>
            {/*{ showUnboxButton &&*/}
            {/*    <CustomSecondButton*/}
            {/*        text={'Unbox Pack'}*/}
            {/*        onClick={handleUnboxPackClick}*/}
            {/*    />*/}
            {/*}*/}
            {blockchainSelected === 'Flow' &&
                <p>{items?.length} results</p>
            }

            {blockchainSelected === 'Immutable' &&
                <p>{itemImxToShow?.length} results</p>
            }

            {blockchainSelected === 'WAX' &&
                <p>{waxItemsToShow?.length} results</p>
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
