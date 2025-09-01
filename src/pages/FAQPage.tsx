import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'deposits' | 'withdrawals' | 'packs' | 'fees' | 'security' | 'general';
}

export const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const faqs: FAQItem[] = [
    // Dépôts
    {
      id: 'dep-1',
      question: 'Comment effectuer un dépôt sur ma plateforme ?',
      answer: 'Vous pouvez effectuer un dépôt via virement bancaire SEPA, carte bancaire ou transfert crypto. Rendez-vous dans votre espace client > Portefeuille > Dépôt. Les virements SEPA sont gratuits et traités sous 24-48h.',
      category: 'deposits'
    },
    {
      id: 'dep-2',
      question: 'Quel est le montant minimum pour un dépôt ?',
      answer: 'Le montant minimum pour un dépôt est de 50€. Il n\'y a pas de montant maximum, mais des vérifications KYC renforcées peuvent être requises pour les montants importants (+10 000€).',
      category: 'deposits'
    },
    // Retraits
    {
      id: 'wit-1',
      question: 'Combien de temps prend un retrait ?',
      answer: 'Les retraits par virement bancaire sont traités sous 24-48h ouvrables. Les retraits crypto sont généralement instantanés mais peuvent prendre jusqu\'à 2h en cas de forte demande.',
      category: 'withdrawals'
    },
    {
      id: 'wit-2',
      question: 'Y a-t-il des limites de retrait ?',
      answer: 'Les retraits sont limités à 10 000€ par jour et 50 000€ par mois pour les comptes standards. Ces limites peuvent être augmentées après vérification KYC complète.',
      category: 'withdrawals'
    },
    // Packs
    {
      id: 'pack-1',
      question: 'Comment fonctionnent les packs d\'investissement ?',
      answer: 'Nos packs sont des portefeuilles gérés automatiquement par notre IA. Vous choisissez un pack selon votre profil de risque et notre algorithme optimise les investissements pour maximiser vos rendements.',
      category: 'packs'
    },
    {
      id: 'pack-2',
      question: 'Puis-je changer de pack d\'investissement ?',
      answer: 'Oui, vous pouvez changer de pack à tout moment depuis votre dashboard. Le changement prend effet au prochain rééquilibrage (généralement sous 24h).',
      category: 'packs'
    },
    // Frais
    {
      id: 'fee-1',
      question: 'Quels sont les frais appliqués ?',
      answer: 'Nos frais sont transparents : 1% sur les dépôts par carte, 0% sur les virements SEPA, 0.5% sur les retraits, et 2% de frais de gestion annuels prélevés mensuellement.',
      category: 'fees'
    },
    {
      id: 'fee-2',
      question: 'Y a-t-il des frais cachés ?',
      answer: 'Non, nous garantissons une transparence totale. Tous nos frais sont clairement affichés avant chaque transaction. Aucun frais supplémentaire n\'est appliqué.',
      category: 'fees'
    },
    // Sécurité
    {
      id: 'sec-1',
      question: 'Comment mes fonds sont-ils sécurisés ?',
      answer: 'Nous utilisons un stockage à froid (cold storage) pour 95% des fonds, un chiffrement AES-256, et une authentification à deux facteurs obligatoire. Nous sommes également couverts par une assurance crypto.',
      category: 'security'
    },
    {
      id: 'sec-2',
      question: 'Que se passe-t-il si CryptoBoost fait faillite ?',
      answer: 'Vos fonds sont ségrégés de nos comptes d\'entreprise et protégés par notre assurance. En cas de problème, un processus de récupération automatique est en place pour vous restituer vos actifs.',
      category: 'security'
    },
    // Général
    {
      id: 'gen-1',
      question: 'CryptoBoost est-il réglementé ?',
      answer: 'Oui, nous sommes enregistrés auprès des autorités françaises (AMF) et respectons toutes les réglementations européennes en matière de services financiers digitaux.',
      category: 'general'
    },
    {
      id: 'gen-2',
      question: 'Proposez-vous un support client ?',
      answer: 'Oui, notre support client est disponible 24h/7j via chat, email et téléphone. Les utilisateurs Premium bénéficient d\'un support prioritaire avec un gestionnaire dédié.',
      category: 'general'
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les questions', count: faqs.length },
    { id: 'deposits', name: 'Dépôts', count: faqs.filter(f => f.category === 'deposits').length },
    { id: 'withdrawals', name: 'Retraits', count: faqs.filter(f => f.category === 'withdrawals').length },
    { id: 'packs', name: 'Packs', count: faqs.filter(f => f.category === 'packs').length },
    { id: 'fees', name: 'Frais', count: faqs.filter(f => f.category === 'fees').length },
    { id: 'security', name: 'Sécurité', count: faqs.filter(f => f.category === 'security').length },
    { id: 'general', name: 'Général', count: faqs.filter(f => f.category === 'general').length },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <Layout>
      <div className="py-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Questions <span className="text-primary glow-text">fréquentes</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Trouvez rapidement les réponses à vos questions sur CryptoBoost.
          </p>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Rechercher dans les questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-primary/30 text-white text-lg py-3"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-black'
                    : 'bg-black/30 text-gray-400 hover:bg-primary/20 hover:text-primary'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id} className="glass-effect border-primary/20">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">
                      {faq.question}
                    </h3>
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedItems.has(faq.id) && (
                    <div className="px-6 pb-6 border-t border-primary/20">
                      <p className="text-gray-300 leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                Aucune question trouvée pour "{searchTerm}"
              </div>
              <p className="text-gray-500 mt-2">
                Essayez avec d'autres mots-clés ou contactez notre support.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};