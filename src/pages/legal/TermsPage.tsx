import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <Layout showTicker={false}>
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="text-primary hover:bg-primary/10 mb-6">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Link>
            </Button>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Conditions générales d'utilisation
            </h1>
            <p className="text-gray-400">
              Dernière mise à jour : 1er janvier 2024
            </p>
          </div>

          <Card className="glass-effect border-primary/20">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">1. Objet</h2>
                <p className="text-gray-300 leading-relaxed">
                  Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation 
                  de la plateforme CryptoBoost, service de gestion d'investissements en cryptomonnaies 
                  proposé par CryptoBoost SAS.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">2. Définitions</h2>
                <div className="space-y-3 text-gray-300">
                  <p><strong>Plateforme :</strong> Le site web et l'application CryptoBoost accessible à l'adresse cryptoboost.com</p>
                  <p><strong>Utilisateur :</strong> Toute personne physique ou morale utilisant la Plateforme</p>
                  <p><strong>Services :</strong> L'ensemble des fonctionnalités proposées par CryptoBoost</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">3. Accès et inscription</h2>
                <div className="space-y-3 text-gray-300 leading-relaxed">
                  <p>
                    L'accès à la Plateforme nécessite une inscription préalable. En vous inscrivant, 
                    vous garantissez que :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Vous êtes majeur et capable juridiquement</li>
                    <li>Les informations fournies sont exactes et à jour</li>
                    <li>Vous acceptez de respecter les présentes CGU</li>
                    <li>Vous comprenez les risques liés aux investissements en cryptomonnaies</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">4. Services proposés</h2>
                <div className="space-y-3 text-gray-300 leading-relaxed">
                  <p>CryptoBoost propose les services suivants :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Gestion automatisée de portefeuilles crypto</li>
                    <li>Packs d'investissement diversifiés</li>
                    <li>Suivi en temps réel des performances</li>
                    <li>Support client spécialisé</li>
                    <li>Outils d'analyse et de reporting</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">5. Risques et avertissements</h2>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                  <p className="text-red-400 font-semibold mb-2">AVERTISSEMENT IMPORTANT</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Les investissements en cryptomonnaies sont hautement spéculatifs et volatils. 
                    Vous pourriez perdre tout ou partie de votre investissement. Les performances 
                    passées ne garantissent pas les résultats futurs.
                  </p>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  En utilisant nos services, vous reconnaissez avoir pris connaissance de ces risques 
                  et acceptez d'investir uniquement des montants que vous pouvez vous permettre de perdre.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">6. Frais et tarification</h2>
                <div className="space-y-3 text-gray-300 leading-relaxed">
                  <p>Nos frais sont les suivants :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Dépôt par carte bancaire : 1%</li>
                    <li>Dépôt par virement SEPA : Gratuit</li>
                    <li>Retrait : 0.5%</li>
                    <li>Frais de gestion : 2% par an (prélevés mensuellement)</li>
                    <li>Échange entre cryptos : 0.3%</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">7. Responsabilité</h2>
                <p className="text-gray-300 leading-relaxed">
                  CryptoBoost s'engage à fournir ses services avec diligence mais ne peut 
                  garantir la performance des investissements. Notre responsabilité est limitée 
                  aux montants des frais perçus et ne saurait excéder les sommes versées par l'Utilisateur.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">8. Protection des données</h2>
                <p className="text-gray-300 leading-relaxed">
                  Vos données personnelles sont traitées conformément à notre 
                  <Link to="/legal/privacy" className="text-primary hover:underline ml-1">
                    politique de confidentialité
                  </Link>. 
                  Nous respectons le RGPD et garantissons la sécurité de vos informations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">9. Modifications</h2>
                <p className="text-gray-300 leading-relaxed">
                  CryptoBoost se réserve le droit de modifier les présentes CGU à tout moment. 
                  Les modifications entrent en vigueur dès leur publication sur la Plateforme. 
                  Il vous appartient de consulter régulièrement les CGU.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">10. Droit applicable</h2>
                <p className="text-gray-300 leading-relaxed">
                  Les présentes CGU sont soumises au droit français. En cas de litige, 
                  les tribunaux français seront seuls compétents.
                </p>
              </section>

              <div className="text-center pt-8 border-t border-primary/20">
                <p className="text-gray-400 text-sm">
                  Pour toute question concernant ces conditions, contactez-nous à 
                  <a href="mailto:legal@cryptoboost.com" className="text-primary hover:underline ml-1">
                    legal@cryptoboost.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
