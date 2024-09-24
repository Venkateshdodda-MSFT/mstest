import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faLinkedin, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
    return(
        <footer className="bg-[#343a40] mt-[20rem] p-16 text-sm py-18 px-4 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto">
                <div className="text-left col-span-1 space-y-3">
                    <p>{new Date().getFullYear()} Spice Delight. All rights reserved.</p>
                    <a href="https://www.flaticon.com/free-icons/lunch" title="lunch icons">Lunch icons created by Freepik - Flaticon</a>
                    <p><Link to="/terms" className="hover:underline">Terms of Service</Link></p>
                    <p><Link to="privacy" className="hover:underline">Privacy Policy</Link></p>
                    <div className="flex flex-col space-y-2">
                        <p>Contact us at:</p>
                        <p>Email: contact@spicedelight.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
                { /** Social Media Links */ }
                <div className="col-span-1">
                    <div className="flex flex-col justify-center space-y-3 mt-4 text-xl">
                        <Link to="https://facebook.com"><FontAwesomeIcon icon={faFacebook} /></Link>
                        <Link to="https://linkedin.com"><FontAwesomeIcon icon={faLinkedin} /></Link>
                        <Link to="https://twitter.com"><FontAwesomeIcon icon={faTwitter} /></Link>
                        <Link to="https://instagram.com"><FontAwesomeIcon icon={faInstagram} /></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer