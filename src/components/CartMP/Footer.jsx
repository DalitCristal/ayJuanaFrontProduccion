import horizontalLogo from "./img/horizontal_logo.png";

const Footer = () => {
  return (
    <footer className="footerPayment">
      <div className="footer_logo">
        <img
          id="horizontal_logo"
          alt="image of the logo"
          src={horizontalLogo}
        />
      </div>
      <div className="footer_text">
        <p>Developers Site:</p>
        <p>
          <a href="https://developers.mercadopago.com" target="_blank">
            https://developers.mercadopago.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
