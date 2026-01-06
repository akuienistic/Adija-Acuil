import { Link } from "react-router-dom";
import { Facebook, Mail } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-heading text-xl">A</span>
              </div>
              <div>
                <h3 className="font-heading text-xl">Adija Acuil</h3>
                <p className="text-primary-foreground/70 text-sm">Visionary Cartoonist</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Cartoons for the future of South Sudan. Our long journey towards prosperity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/gallery" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Gallery
              </Link>
              <Link to="/about" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Contact
              </Link>
              <Link to="/subscribe" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Subscribe
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading text-lg mb-4">Connect</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Facebook size={20} />
                <span>Follow on Facebook</span>
              </a>
              <a
                href="mailto:contact@adijaacuil.com"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Mail size={20} />
                <span>contact@adijaacuil.com</span>
              </a>
            </div>
            <p className="mt-4 text-primary-foreground/60 text-sm">Followed by 1K+ on Facebook</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-primary-foreground/70">© {new Date().getFullYear()} Adija Acuil. All rights reserved.</p>
          <p className="flex items-center gap-1 text-primary-foreground/70">
            Designed & built by{" "}
            <a
              href="https://wa.me/251988499136"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary transition-colors font-semibold"
            >
              Simon A. Atem
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
