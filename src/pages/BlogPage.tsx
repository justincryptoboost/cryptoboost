import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '../lib/utils';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  published_at: string;
  author: string;
  tags: string[];
  reading_time: string;
}

export const BlogPage: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Bitcoin : Faut-il investir en 2024 ?',
      slug: 'bitcoin-investir-2024',
      excerpt: 'Analyse complète des perspectives du Bitcoin pour cette année, entre adoption institutionnelle et régulation croissante.',
      image_url: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
      published_at: '2024-01-15T10:00:00Z',
      author: 'Marie Dubois',
      tags: ['Bitcoin', 'Analyse', 'Investissement'],
      reading_time: '5 min'
    },
    {
      id: '2',
      title: 'Guide débutant : Comprendre les DeFi',
      slug: 'guide-debutant-defi',
      excerpt: 'Découvrez l\'univers de la finance décentralisée et ses opportunités pour les investisseurs particuliers.',
      image_url: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg',
      published_at: '2024-01-12T14:30:00Z',
      author: 'Thomas Martin',
      tags: ['DeFi', 'Guide', 'Débutant'],
      reading_time: '8 min'
    },
    {
      id: '3',
      title: 'Stratégies de diversification crypto',
      slug: 'strategies-diversification-crypto',
      excerpt: 'Comment construire un portefeuille crypto équilibré pour optimiser rendement et réduire les risques.',
      image_url: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg',
      published_at: '2024-01-10T09:15:00Z',
      author: 'Sophie Laurent',
      tags: ['Stratégie', 'Diversification', 'Portefeuille'],
      reading_time: '6 min'
    },
    {
      id: '4',
      title: 'NFT et métavers : Opportunité ou bulle ?',
      slug: 'nft-metavers-opportunite-bulle',
      excerpt: 'Point sur l\'évolution du marché des NFT et les perspectives d\'investissement dans le métavers.',
      image_url: 'https://images.pexels.com/photos/8370751/pexels-photo-8370751.jpeg',
      published_at: '2024-01-08T16:45:00Z',
      author: 'Alexandre Chen',
      tags: ['NFT', 'Métavers', 'Tendances'],
      reading_time: '7 min'
    },
    {
      id: '5',
      title: 'Sécurité crypto : Les bonnes pratiques',
      slug: 'securite-crypto-bonnes-pratiques',
      excerpt: 'Guide complet pour sécuriser vos investissements crypto et éviter les pièges les plus courants.',
      image_url: 'https://images.pexels.com/photos/9660530/pexels-photo-9660530.jpeg',
      published_at: '2024-01-05T11:20:00Z',
      author: 'Julien Moreau',
      tags: ['Sécurité', 'Bonnes pratiques', 'Guide'],
      reading_time: '10 min'
    },
    {
      id: '6',
      title: 'Ethereum 2.0 : Impact sur les investissements',
      slug: 'ethereum-2-impact-investissements',
      excerpt: 'Analyse de l\'évolution d\'Ethereum et son impact sur les stratégies d\'investissement long terme.',
      image_url: 'https://images.pexels.com/photos/8369678/pexels-photo-8369678.jpeg',
      published_at: '2024-01-03T13:10:00Z',
      author: 'Camille Rousseau',
      tags: ['Ethereum', 'ETH 2.0', 'Long terme'],
      reading_time: '9 min'
    }
  ];

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      'Bitcoin': 'bg-primary/20 text-primary border-primary/30',
      'Ethereum': 'bg-secondary/20 text-secondary border-secondary/30',
      'DeFi': 'bg-accent/20 text-accent border-accent/30',
      'NFT': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Sécurité': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Guide': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    };
    return colors[tag] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <Layout>
      <div className="py-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Blog <span className="text-primary glow-text">CryptoBoost</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Analyses, guides et conseils pour optimiser vos investissements crypto.
          </p>
        </section>

        {/* Featured Article */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={blogPosts[0].image_url} 
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-secondary/90 text-white font-semibold">
                    Article vedette
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {blogPosts[0].tags.map((tag) => (
                      <Badge key={tag} className={getTagColor(tag)}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white leading-tight">
                    {blogPosts[0].title}
                  </h2>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(blogPosts[0].published_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{blogPosts[0].reading_time} de lecture</span>
                      </div>
                    </div>
                    
                    <Button asChild variant="ghost" className="text-primary hover:bg-primary/10">
                      <Link to={`/blog/${blogPosts[0].slug}`}>
                        Lire l'article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Derniers <span className="text-accent glow-text">articles</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 overflow-hidden group">
                <div className="relative h-48">
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} className={getTagColor(tag)}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                    <div className="text-xs text-gray-400">
                      <div className="flex items-center space-x-1 mb-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.reading_time}</span>
                      </div>
                    </div>
                    
                    <Button asChild variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                      <Link to={`/blog/${post.slug}`}>
                        Lire
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};