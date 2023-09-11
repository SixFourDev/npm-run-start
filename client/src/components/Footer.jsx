import "../App.css";

import { Link } from "react-router-dom";

import github from "../../../assets/GitHub.svg";
import linkedin from "../../../assets/LinkedIn.svg";

export default function Footer() {
  return (
    <footer>
      <div id="footer-logo">
        <h2>NPM Run Start</h2>
      </div>

      <div id="contributors">
        <h3>Connect with the Contributors</h3>
      </div>

      <div className="names">
        <h5 id="shane">Shane Browning</h5>

        <h5 id="kevin">Kevin Lewis</h5>

        <h5 id="newman">Newman Porter</h5>

        <h5 id="felix">Felix Thompson</h5>
      </div>

      {/* If we decide to link to a contact form in footer... */}
      <div className="contact">
        <Link
          to="Contact"
          className="footer-link"
          alt="Links to the 'Contact' page."
        >
          <h5>Questions? Comments? Concerns? Click here to contact us.</h5>
        </Link>
      </div>
    </footer>
  );
}
