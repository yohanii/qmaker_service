import "./Header.css"
import { Link } from "react-router-dom"
import Qlogo from './Qlogo.svg';

export default function Header() {
    return (
        <>
            <Link to="/" className="Logo">
                <img src={Qlogo} alt="Qlogo" className="QlogoImage" />
                Q-maker
            </Link>
        </>
    )
}
