export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="container footer-minimal">
        <a className="brand footer-brand-link" href="#top" aria-label="MKKS Organics Home">
          <img
            className="brand-logo"
            src="/images/mkks-organics-logo.png"
            width="32"
            height="32"
            alt="MKKS Organics logo"
          />
          <span className="brand-copy">MKKS Organics</span>
        </a>
        <p className="footer-note">
          &copy; {year} MKKS Organics - Anaimalai Foothills, Pollachi - Tamil Nadu, India
        </p>
      </div>
    </footer>
  );
}
