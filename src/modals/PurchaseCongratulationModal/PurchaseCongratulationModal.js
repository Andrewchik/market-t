import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

import CustomButton from "../../generics/CustomButton/CustomButton";

import './PurchaseCongratulationModal.scss';

import SuccessIcon from '../../resources/images/Purchase_Success.webp';

export default function PurchaseCongratulationModal({ visible, onClose }) {
    const history = useHistory();

    const user = useSelector(({ auth }) => auth.auth);

    return (
        <Rodal
            visible={visible}
            onClose={onClose}
            showCloseButton={true}
            className="purchase-congratulation"
            animation="slideUp"
            duration={800}
            closeOnEsc={true}
        >
            <div className="purchase-congratulation-modal-wrapper">
                <img src={SuccessIcon} alt="" />
                <p>CONGRATULATIONS!</p>
                <p>Your purchase is complete!</p>
                <CustomButton
                    text={'My Items'}
                    onClick={() => {
                        onClose();
                        history.push(`/profile/${user.address}`);
                    }}
                />
            </div>
        </Rodal>
    );
}
