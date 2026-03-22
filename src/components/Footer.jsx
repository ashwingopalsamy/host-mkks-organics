export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-stub">
      <p>© {year} MKKS Organics · Anaimalai Foothills, Pollachi · Tamil Nadu</p>
    </footer>
  );
}
