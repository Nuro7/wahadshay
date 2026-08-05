import { Button } from "./ui/Button";

const navLinks = ["Home", "About", "Menu", "Contact"];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-beige/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-2xl font-semibold text-plum">
          Wahad Shay
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm tracking-wide text-plum-dark/80 transition-colors hover:text-plum"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <Button className="hidden sm:inline-flex">Order Now</Button>
      </nav>
    </header>
  );
}
