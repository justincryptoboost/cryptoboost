import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-primary/20 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
                <Zap className="h-6 w-6 text-black" />
              </div>
              <span className="text-xl font-bold text-primary glow-text">
                CryptoBoost
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Investissez clair, performez net. La plateforme crypto nouvelle génération 
              pour investisseurs débutants et intermédiaires.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">Plateforme</h3>
            <ul className="space-y-2">
              <li><Link to="/plans" className="text-gray-400 hover:text-primary transition-colors">Plans d'investissement</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">À propos</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/legal/terms" className="text-gray-400 hover:text-primary transition-colors">Conditions générales</Link></li>
              <li><Link to="/legal/privacy" className="text-gray-400 hover:text-primary transition-colors">Politique de confidentialité</Link></li>
              <li><Link to="/legal/cookies" className="text-gray-400 hover:text-primary transition-colors">Cookies</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 CryptoBoost. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-red-400 border border-red-400/30 rounded px-3 py-1">
              ⚠️ Investir comporte des risques de perte en capital
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
