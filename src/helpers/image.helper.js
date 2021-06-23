import RanchoPackImage from '../resources/images/Rancho.png';
import GovernorsPackImage from '../resources/images/Governor.png';
import MayorsPackImage from '../resources/images/Mayor.png';
import BonusPackImage from '../resources/images/Bonus.png';

const RANCHO_PACK_IPFS = 'QmSutY5tSAKqfTRaRsPANfQpYUKMhCD1ckx9eEntLaUMJm';
const GOVERNORS_PACK_IPFS = 'QmcKzaguZ55uF6imMW91S34GMCy7dfcTiz1PAVpHRtCFjY';
const MAYORS_PACK_IPFS = 'QmSShZnvQQGB6JPM22rquo3rG7Xk8yj3dXqcsX621UndMS';
const BONUS_PACK_IPFS = 'QmfDHAaVCTaYkBPkn8pa9uHLajruhkDaid3CKuy885UmkU';

export const getDarkCountryImage = (ipfs) => {
    if (ipfs === RANCHO_PACK_IPFS)
        return RanchoPackImage;

    if (ipfs === GOVERNORS_PACK_IPFS)
        return GovernorsPackImage;

    if (ipfs === MAYORS_PACK_IPFS)
        return MayorsPackImage;

    if (ipfs === BONUS_PACK_IPFS)
        return BonusPackImage;

    return `https://ipfs.io/ipfs/${ipfs}`;
};
