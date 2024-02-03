import { Link } from "react-router-dom";
import { useLanguage } from './LanguageProvider';
import  LanguageSwitch from './LanguageSwitch'

function AllHeads() {

    const { language } = useLanguage();

    return (
        <div className="menu-block-center d-flex align-items-center">
            <Link className="text-decoration-none card-address menu-indent" to={"/buy"}>{language === 'en' ? 'Buy' : 'Купити'}</Link>
            <Link className="text-decoration-none card-address" to={"/rent"}>{language === 'en' ? 'Rent' : 'Орендувати'}</Link>
            <Link className="text-decoration-none card-address menu-indent" to={"/sell"}>{language === 'en' ? 'Sell || Rent Out' : 'Продати || Здати в оренду'}</Link>
            {/* <Link className="text-decoration-none card-address menu-indent" to={"/contacts"}>{language === 'en' ? 'About Us' : 'Про нас'}</Link> */}
            <LanguageSwitch />

        </div>
    );

}

export default AllHeads;