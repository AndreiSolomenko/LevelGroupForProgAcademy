import { Link } from "react-router-dom";

function Logo() {

    return (

        <div className="logo-block-center d-flex align-items-center">
            <Link className="logo" to={"/"} />
            <Link className="logo-color logo-txt text-decoration-none" to={"/"}>LEVEL GROUP</Link>
        </div>


    );
}

export default Logo;