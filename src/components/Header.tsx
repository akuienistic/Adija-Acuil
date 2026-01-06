import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Images, User, Mail, Bell, LogIn } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/gallery", label: "Gallery", icon: Images },
  { to: "/about", label: "About", icon: User },
  { to: "/contact", label: "Contact", icon: Mail },
  { to: "/subscribe", label: "Subscribe", icon: Bell },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading text-lg md:text-xl">A</span>
            </div>
            <div className="sm:hidden text-black-foreground font-heading text-lg">Adija Acuil Cartoons</div>
            <div className="hidden sm:block">
              <h1 className="font-heading text-lg md:text-xl text-primary leading-tight">Adija Acuil</h1>
              <p className="text-xs text-muted-foreground -mt-0.5">Cartoons for South Sudan</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? "text-primary after:w-full" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Sign In */}
          <Link to="/admin" className="hidden md:flex items-center gap-2 nav-link">
            <LogIn size={20} />
            Sign in
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="w-1/2 mx-auto flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                    location.pathname === link.to
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <link.icon size={20} />
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
