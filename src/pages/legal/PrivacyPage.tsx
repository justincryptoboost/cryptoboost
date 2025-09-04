import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
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
              Politique de confidentialité
            </h1>
            <p className="text-gray-400">
              Dernière mise à jour : 1er janvier 2024
            </p>
          </div>

          <Card className="glass-effect border-primary/20">
            <CardContent className="p-8 space-y-8">
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">1. Collecte des données</h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Nous collectons les données suivantes lors de votre utilisation de CryptoBoost :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Données d'identification : nom, prénom, adresse email</li>
                  <li>Données de connexion : adresse IP, logs de connexion</li>
                  <li>Données financières : historique des transactions, soldes</li>
                  <li>Données de navigation : pages visitées, durée de session</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">2. Utilisation des données</h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Vos données sont utilisées pour :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Fournir et améliorer nos services</li>
                  <li>Traiter vos transactions et investissements</li>
                  <li>Assurer la sécurité de votre compte</li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                  <li>Vous envoyer des communications importantes</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">3. Protection des données</h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Nous mettons en œuvre des mesures de sécurité strictes :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Chiffrement AES-256 de toutes les données sensibles</li>
                  <li>Authentification à deux facteurs obligatoire</li>
                  <li>Stockage sécurisé dans des centres de données certifiés</li>
                  <li>Accès restreint au personnel autorisé uniquement</li>
                  <li>Audits de sécurité réguliers par des tiers</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Database className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">4. Partage des données</h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Nous ne vendons jamais vos données personnelles. Nous pouvons les partager 
                  uniquement dans les cas suivants :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Avec votre consentement explicite</li>
                  <li>Avec nos prestataires de services sous contrat de confidentialité</li>
                  <li>Pour respecter une obligation légale ou réglementaire</li>
                  <li>Pour protéger nos droits ou ceux de nos utilisateurs</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">5. Vos droits RGPD</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Droit d'accès à vos données personnelles</li>
                  <li>Droit de rectification des données inexactes</li>
                  <li>Droit à l'effacement dans certains cas</li>
                  <li>Droit à la portabilité de vos données</li>
                  <li>Droit d'opposition au traitement</li>
                  <li>Droit de limitation du traitement</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Pour exercer ces droits, contactez-nous à 
                  <a href="mailto:privacy@cryptoboost.com" className="text-primary hover:underline ml-1">
                    privacy@cryptoboost.com
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">6. Cookies</h2>
                <p className="text-gray-300 leading-relaxed">
                  Notre utilisation des cookies est détaillée dans notre 
                  <Link to="/legal/cookies" className="text-primary hover:underline ml-1">
                    politique de cookies
                  </Link>. 
                  Nous utilisons uniquement les cookies nécessaires au fonctionnement 
                  de la plateforme et ceux pour lesquels vous avez donné votre consentement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">7. Conservation des données</h2>
                <p className="text-gray-300 leading-relaxed">
                  Nous conservons vos données personnelles pendant la durée nécessaire 
                  aux finalités pour lesquelles elles ont été collectées, et conformément 
                  aux obligations légales de conservation (5 ans minimum pour les données 
                  financières).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">8. Contact</h2>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Délégué à la protection des données :</strong><br />
                    Email : dpo@cryptoboost.com<br />
                    Adresse : 123 Avenue des Champs-Élysées, 75008 Paris, France
                  </p>
                </div>
              </section>

              <div className="text-center pt-8 border-t border-primary/20">
                <p className="text-gray-400 text-sm">
                  Cette politique peut être modifiée. Les changements significatifs vous seront notifiés.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
