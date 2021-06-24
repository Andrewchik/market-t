import React, { useState } from "react";

import {
    Button,
    Switch,
    TextField,
    FormControl,
    MenuItem,
    Select
} from "@material-ui/core";

import './CreateCollectible.scss';

import ImagePlaceholder from "../../resources/images/image-placeholder.svg.png";
import ProfileIcon from '../../resources/images/profile-icon.jpg'

import CustomButton from "../../generics/CustomButton/CustomButton";

function CreateCollectible() {
    const [putOnSaleChecked, handlePutOnSaleChange] = useState(true);
    const [instantSalePrice, handleChangeInstantSalePrice] = useState(false);
    const [currency, setCurrency] = useState('FLOW');

    return (
        <div className={'create-collectible-wrapper'}>
            <div className={'create-collectible-content-wrapper'}>
                <h1>Create Collectible</h1>
                <div className={'create-collectible-content'}>
                    <div className={'create-collectible-content-left'}>
                        <div className={'upload-file'}>
                            <h3>Upload File</h3>
                            <img src={ImagePlaceholder} alt="" />
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Choose File
                                <input
                                    type="file"
                                    hidden
                                />
                            </Button>
                            <p>WEBP, PNG, GIF, FBX, max 20MB</p>
                        </div>
                        <div className={'collectible-switch'}>
                            <div className={'collectible-switch-info'}>
                                <p>Put on sale</p>
                                <p>Bidding will be instantly available</p>
                            </div>
                            <Switch
                                checked={putOnSaleChecked}
                                onChange={() => handlePutOnSaleChange(!putOnSaleChecked)}
                                name="putOnSaleChecked"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                className={ putOnSaleChecked ? 'switch-checked' : '' }
                            />
                        </div>
                        <div className={'collectible-switch'}>
                            <div className={'collectible-switch-info'}>
                                <p>Instant sale price</p>
                                <p>Asset can be bought out with that price</p>
                            </div>
                            <Switch
                                checked={instantSalePrice}
                                onChange={() => handleChangeInstantSalePrice(!instantSalePrice)}
                                name="handleChangeInstantSalePrice"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                className={ instantSalePrice ? 'switch-checked' : '' }
                            />
                        </div>
                        <div className={'collectible-price'}>
                            <div className={'collectible-price-actions'}>
                                <TextField
                                    id="outlined-price-input"
                                    type="text"
                                    autoComplete="Please enter price"
                                    placeholder="Please enter price"
                                    variant="outlined"
                                />
                                <FormControl variant="outlined">
                                    <Select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value={'FLOW'}>FLOW</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <p>Market fee 2.5%</p>
                            <p>You will receive 0.00 FLOW</p>
                        </div>
                        <div className={'collectible-name'}>
                            <p>Name</p>
                            <TextField
                                id="outlined-price-input"
                                type="text"
                                autoComplete="Please enter name"
                                placeholder="Please enter name"
                                variant="outlined"
                            />
                        </div>
                        <div className={'collectible-description'}>
                            <p>Description</p>
                            <TextField
                                id="outlined-price-input"
                                type="text"
                                autoComplete="Please enter description"
                                placeholder="Please enter description"
                                variant="outlined"
                                multiline
                            />
                        </div>
                        <div className={'collectible-additional-settings'}>
                            <div className={'collectible-additional-settings-inputs'}>
                                <div className={'collectible-additional-settings-input'}>
                                    <p>Author's fees</p>
                                    <TextField
                                        id="outlined-price-input"
                                        type="text"
                                        autoComplete="Please enter author's fees"
                                        placeholder="Please enter author's fees"
                                        variant="outlined"
                                    />
                                </div>
                                <div className={'collectible-additional-settings-input'}>
                                    <p>Number of copies</p>
                                    <TextField
                                        id="outlined-price-input"
                                        type="text"
                                        autoComplete="placeholder"
                                        placeholder="placeholder"
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                            <div className={'collectible-additional-settings-inputs'}>
                                <div className={'collectible-additional-settings-input'}>
                                    <p>Properties</p>
                                    <TextField
                                        id="outlined-price-input"
                                        type="text"
                                        autoComplete="e.g. Size"
                                        placeholder="e.g. Size"
                                        variant="outlined"
                                    />
                                </div>
                                <div className={'collectible-additional-settings-input'}>
                                    <p />
                                    <TextField
                                        id="outlined-price-input"
                                        type="text"
                                        autoComplete="e.g. Size"
                                        placeholder="e.g. Size"
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                            <div className={'collectible-additional-settings-inputs'}>
                                <div className={'collectible-additional-settings-input'}>
                                    <TextField
                                        id="outlined-price-input"
                                        type="text"
                                        autoComplete="e.g. Size"
                                        placeholder="e.g. Size"
                                        variant="outlined"
                                    />
                                </div>
                                <div className={'collectible-additional-settings-input'}>
                                    <TextField
                                        id="outlined-price-input"
                                        type="text"
                                        autoComplete="e.g. Size"
                                        placeholder="e.g. Size"
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={'collectible-create'}>
                            <CustomButton
                                text={'Create'}
                                onClick={ () => {} }
                            />
                        </div>
                    </div>
                    <div className={'create-collectible-content-right'}>
                        <h3>Preview</h3>
                        <div className={'listed-item-image'}>
                            <img src={ProfileIcon} alt="profile" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCollectible;
