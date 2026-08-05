export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = ["Home", "Menu", "Specials", "Franchise", "Contact"];

  return (
    <footer className="bg-plum-dark border-t border-white/5 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand Text */}
        <div className="text-center md:text-left space-y-2">
          <a href="#home" className="font-display text-xl font-black uppercase tracking-wider text-white">
            Wahad <span className="text-yellow">Shay</span>
          </a>
          <p className="text-grey text-xs">
            Artisan bread &amp; premium tea salon. A World of Flavor in One Place.
          </p>
        </div>

        {/* Footer Navigation */}
        <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
          {footerLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="font-body text-xs font-semibold tracking-wider text-white/60 hover:text-yellow transition-colors duration-300 uppercase"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <div className="text-center md:text-right">
          <p className="text-grey text-[10px] md:text-xs font-numbers font-medium tracking-wider">
            &copy; {currentYear} WAHAD SHAY. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}
export default Footer;
