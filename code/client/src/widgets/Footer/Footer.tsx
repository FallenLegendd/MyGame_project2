import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-copyright">
          © {new Date().getFullYear()} DiscoPixel Inc. Все права защищены
        </div>
      </div>
    </footer>
  );
};

export default Footer;
