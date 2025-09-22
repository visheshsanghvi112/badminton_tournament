import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Instagram, Linkedin } from "lucide-react";
import symbiosisLogo from "@/assets/symbiosis-logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* University Info */}
          <div className="col-span-1 md:col-span-2 animate-slide-in-left">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={symbiosisLogo} 
                alt="Symbiosis International University"
                className="h-12 w-12 animate-float"
              />
              <div>
                <div className="text-lg font-bold text-primary">
                  Symbiosis International
                </div>
                <div className="text-sm text-secondary-foreground/80">
                  (Deemed University)
                </div>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              A++ NAAC Grade | NIRF Ranking #24 Universities | QS World Ranking #31 Employer Reputation
            </p>
            <p className="text-sm text-secondary-foreground/80">
              Vasudhaiva Kutumbakam - The World is One Family
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-all duration-300 hover:scale-105 inline-block">
                  About Tournament
                </Link>
              </li>
              <li>
                <Link to="/sponsors" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-all duration-300 hover:scale-105 inline-block">
                  Sponsors
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-all duration-300 hover:scale-105 inline-block">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-all duration-300 hover:scale-105 inline-block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2 hover:text-primary transition-colors duration-300">
                <MapPin className="h-4 w-4 text-primary animate-float" />
                <span className="text-secondary-foreground/80">
                  Symbiosis Sports Complex, Pune
                </span>
              </li>
              <li className="flex items-center space-x-2 hover:text-primary transition-colors duration-300">
                <Mail className="h-4 w-4 text-primary animate-float" style={{ animationDelay: '0.5s' }} />
                <span className="text-secondary-foreground/80">
                  tournament@symbiosis.ac.in
                </span>
              </li>
              <li className="flex items-center space-x-2 hover:text-primary transition-colors duration-300">
                <Phone className="h-4 w-4 text-primary animate-float" style={{ animationDelay: '1s' }} />
                <span className="text-secondary-foreground/80">
                  +91 20 2528 1000
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-secondary-foreground/60">
            <p>
              © 2025 Symbiosis International (Deemed University). All rights reserved.
            </p>

            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              {/* Legal Links */}
              <div className="flex space-x-4">
                <Link to="/privacy" className="hover:text-secondary-foreground transition-all duration-300 hover:scale-105">
                  Privacy
                </Link>
                <Link to="/terms-of-service" className="hover:text-secondary-foreground transition-all duration-300 hover:scale-105">
                  Terms of Service
                </Link>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center space-x-3">
                <span className="text-secondary-foreground/40 text-xs">Follow us:</span>
                <a
                  href="https://instagram.com/symbiosisuniversity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://linkedin.com/school/symbiosis-international-university"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg"
                  aria-label="Connect with us on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;