import { Link } from "react-router-dom"
import "./Footer.css"
import insta from "./instagram.png"
import facebook from "./facebook0.png"
import twitter from "./twitter-logo.png"
export default function Footer() {
  return (
    <div className="footer">

        <p> &copy;EduElite</p>
        <ul>
        <Link to="https://www.google.com/"> <li><img src={insta} alt="instagram icon"/></li></Link>
        <Link to="https://www.google.com/"> <li><img src={facebook} alt="facebook icon"/></li></Link>
        <Link to="https://www.google.com/"> <li><img src={twitter} alt="instagram icon"/> </li></Link>
     
        </ul>
      
    </div>
  )
}
