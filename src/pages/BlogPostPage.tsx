import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, ArrowLeft, AlertTriangle, User } from 'lucide-react';
import { formatDate } from '../lib/utils';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Mock blog post data
  const post = {
    id: '1',
    title: 'Bitcoin : Faut-il investir en 2024 ?',
    slug: 'bitcoin-investir-2024',
    excerpt: 'Analyse complète des perspectives du Bitcoin pour cette année.',
    content: `
# Introduction

Le Bitcoin continue de fasciner et d'interroger les investisseurs en 2024. Alors que la cryptomonnaie la plus connue au monde traverse différentes phases de volatilité, il est essentiel d'analyser les facteurs qui pourraient influencer son évolution cette année.

## L'adoption institutionnelle s'accélère

L'une des tendances les plus marquantes de ces dernières années est l'adoption croissante du Bitcoin par les institutions financières traditionnelles. De nombreuses banques d'investissement, fonds de pension et entreprises publiques ont intégré le Bitcoin dans leurs portefeuilles.

### Les ETF Bitcoin aux États-Unis

L'approbation des ETF Bitcoin spot aux États-Unis a marqué un tournant historique. Cette décision facilite grandement l'accès au Bitcoin pour les investisseurs traditionnels et pourrait stimuler une nouvelle vague d'adoption.

## Facteurs techniques et fondamentaux

Plusieurs éléments techniques méritent une attention particulière :

- **Le halving de 2024** : Cet événement, qui réduit de moitié la récompense des mineurs, pourrait avoir un impact significatif sur l'offre de Bitcoin
- **L'évolution du réseau Lightning** : Cette solution de seconde couche améliore considérablement la scalabilité du Bitcoin
- **L'efficacité énergétique** : Les améliorations continues du minage rendent le réseau plus durable

## Risques à considérer

### Volatilité persistante

Le Bitcoin reste un actif extrêmement volatile. Les investisseurs doivent être préparés à des variations de prix importantes, parfois sur de courtes périodes.

### Environnement réglementaire

L'évolution de la réglementation mondiale concernant les cryptomonnaies peut avoir un impact significatif sur le prix du Bitcoin. Il est important de suivre les développements législatifs dans les principales juridictions.

## Stratégies d'investissement recommandées

### Dollar Cost Averaging (DCA)

Cette stratégie consiste à investir un montant fixe de manière régulière, indépendamment du prix. Elle permet de lisser les variations de prix sur le long terme.

### Allocation progressive

Plutôt que d'investir une somme importante d'un coup, il peut être judicieux d'augmenter progressivement son exposition au Bitcoin.

## Conclusion

Le Bitcoin présente des opportunités intéressantes en 2024, mais il reste un investissement risqué qui ne convient pas à tous les profils. Une approche prudente et bien réfléchie est essentielle.
    `,
    image_url: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
    published_at: '2024-01-15T10:00:00Z',
    author: 'Marie Dubois',
    tags: ['Bitcoin', 'Analyse', 'Investissement'],
    reading_time: '5 min'
  };

  return (
    <Layout>
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="text-primary hover:bg-primary/10">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
              <img 
                src={post.image_url} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} className="bg-primary/20 text-primary border-primary/30">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.published_at)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.reading_time} de lecture</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Warning */}
          <Card className="glass-effect border-red-400/30 bg-red-400/5 mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-400 mb-2">Avertissement sur les risques</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Les investissements en cryptomonnaies sont hautement spéculatifs et volatils. 
                    Vous pourriez perdre tout ou partie de votre investissement. Ne jamais investir 
                    plus que ce que vous pouvez vous permettre de perdre. Cet article est à des 
                    fins éducatives uniquement et ne constitue pas un conseil en investissement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Article Content */}
          <Card className="glass-effect border-primary/20">
            <CardContent className="p-8">
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed space-y-6">
                  <h2 className="text-2xl font-bold text-white">Introduction</h2>
                  <p>
                    Le Bitcoin continue de fasciner et d'interroger les investisseurs en 2024. 
                    Alors que la cryptomonnaie la plus connue au monde traverse différentes phases 
                    de volatilité, il est essentiel d'analyser les facteurs qui pourraient 
                    influencer son évolution cette année.
                  </p>

                  <h2 className="text-2xl font-bold text-white">L'adoption institutionnelle s'accélère</h2>
                  <p>
                    L'une des tendances les plus marquantes de ces dernières années est l'adoption 
                    croissante du Bitcoin par les institutions financières traditionnelles. De 
                    nombreuses banques d'investissement, fonds de pension et entreprises publiques 
                    ont intégré le Bitcoin dans leurs portefeuilles.
                  </p>

                  <h3 className="text-xl font-bold text-primary">Les ETF Bitcoin aux États-Unis</h3>
                  <p>
                    L'approbation des ETF Bitcoin spot aux États-Unis a marqué un tournant historique. 
                    Cette décision facilite grandement l'accès au Bitcoin pour les investisseurs 
                    traditionnels et pourrait stimuler une nouvelle vague d'adoption.
                  </p>

                  <h2 className="text-2xl font-bold text-white">Facteurs techniques et fondamentaux</h2>
                  <p>Plusieurs éléments techniques méritent une attention particulière :</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li><strong>Le halving de 2024</strong> : Cet événement, qui réduit de moitié la récompense des mineurs, pourrait avoir un impact significatif sur l'offre de Bitcoin</li>
                    <li><strong>L'évolution du réseau Lightning</strong> : Cette solution de seconde couche améliore considérablement la scalabilité du Bitcoin</li>
                    <li><strong>L'efficacité énergétique</strong> : Les améliorations continues du minage rendent le réseau plus durable</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-white">Conclusion</h2>
                  <p>
                    Le Bitcoin présente des opportunités intéressantes en 2024, mais il reste 
                    un investissement risqué qui ne convient pas à tous les profils. Une approche 
                    prudente et bien réfléchie est essentielle.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <section className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Articles recommandés</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Guide débutant : Comprendre les DeFi',
                  slug: 'guide-debutant-defi',
                  image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg'
                },
                {
                  title: 'Stratégies de diversification crypto',
                  slug: 'strategies-diversification-crypto',
                  image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg'
                }
              ].map((article, index) => (
                <Card key={index} className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden group">
                  <div className="flex">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4 flex-1">
                      <h4 className="font-semibold text-white group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>
                      <Button asChild variant="ghost" size="sm" className="mt-2 p-0 h-auto text-primary hover:bg-transparent">
                        <Link to={`/blog/${article.slug}`}>
                          Lire l'article
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};
