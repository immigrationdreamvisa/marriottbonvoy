import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { ImageWithFallback } from './ImageWithFallback';
import { BrandLogo } from './MarriottLogo';
import {
  ShoppingBag,
  Star,
  Check,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Heart,
  Truck,
  RotateCcw,
  Tag
} from 'lucide-react';

interface ShopProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  badge?: string;
}

export const BrandShopPage: React.FC = () => {
  const { selectedShopBrand, setSelectedShopBrand, goToHome } = useBooking();

  const brandTabs = [
    { id: 'courtyard', label: 'Shop Courtyard' },
    { id: 'the-ritz-carlton', label: 'Shop The Ritz-Carlton' },
    { id: 'edition', label: 'Shop EDITION' },
    { id: 'st-regis', label: 'Shop St. Regis' },
    { id: 'jw-marriott', label: 'Shop JW Marriott' },
    { id: 'w-hotels', label: 'Shop W Hotels' },
    { id: 'marriott', label: 'Shop Marriott' },
    { id: 'sheraton', label: 'Shop Sheraton' },
    { id: 'westin', label: 'Shop Westin' }
  ];

  const products: ShopProduct[] = [
    // Courtyard
    {
      id: 'cy-bed',
      name: 'The Courtyard Bed & Box Spring Set',
      brand: 'courtyard',
      category: 'Bed & Bedding',
      price: 1450,
      rating: 4.9,
      reviewsCount: 342,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=85',
      description: 'Engineered for restorative sleep with reinforced pocketed coils and plush quilting.',
      badge: 'Best Seller'
    },
    {
      id: 'cy-pillow',
      name: 'Courtyard Down Alternative Pillow Pair',
      brand: 'courtyard',
      category: 'Pillows',
      price: 85,
      rating: 4.8,
      reviewsCount: 512,
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=85',
      description: 'Hypoallergenic microfiber fill wrapped in 300-thread-count 100% cotton.'
    },
    {
      id: 'cy-mug',
      name: 'The Bistro Matte Ceramic Mug Set of 4',
      brand: 'courtyard',
      category: 'Dining & Living',
      price: 48,
      rating: 4.7,
      reviewsCount: 128,
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=85',
      description: 'Signature Bistro earthenware mugs designed for your morning brew.'
    },

    // Ritz-Carlton
    {
      id: 'rc-bed',
      name: 'The Ritz-Carlton Signature Bed by Stearns & Foster',
      brand: 'the-ritz-carlton',
      category: 'Bespoke Sleep',
      price: 3890,
      rating: 5.0,
      reviewsCount: 890,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85',
      description: 'Custom-crafted with hand-tufted silk-wool blend and advanced dual coil technology.',
      badge: 'Gold Standard'
    },
    {
      id: 'rc-robe',
      name: 'The Ritz-Carlton Diamond Jacquard Spa Robe',
      brand: 'the-ritz-carlton',
      category: 'Spa & Bath',
      price: 185,
      rating: 4.9,
      reviewsCount: 420,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
      description: 'Ultra-plush microfiber exterior with 100% combed cotton terry lining.',
      badge: 'Iconic Gift'
    },
    {
      id: 'rc-candle',
      name: 'Signature ESPA Sanctuary Scent Diffuser',
      brand: 'the-ritz-carlton',
      category: 'Home Fragrance',
      price: 95,
      rating: 4.9,
      reviewsCount: 265,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85',
      description: 'Notes of white tea, bergamot, ocean amber, and delicate jasmine.'
    },

    // EDITION
    {
      id: 'ed-lelabo',
      name: 'EDITION x Le Labo Black Tea Signature Fragrance',
      brand: 'edition',
      category: 'Fragrance',
      price: 135,
      rating: 5.0,
      reviewsCount: 680,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=85',
      description: 'Custom formulation with black tea leaves, cedarwood, amber, and Italian bergamot.',
      badge: 'Exclusive'
    },
    {
      id: 'ed-throw',
      name: 'EDITION Velvet & Faux Fur Throw Blanket',
      brand: 'edition',
      category: 'Living',
      price: 240,
      rating: 4.9,
      reviewsCount: 190,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=85',
      description: 'The iconic faux fur bed throw featured in every luxury EDITION guest suite.'
    },

    // St. Regis
    {
      id: 'sr-sheets',
      name: 'The St. Regis Frette 400-Thread-Count Sheet Set',
      brand: 'st-regis',
      category: 'Linens',
      price: 680,
      rating: 5.0,
      reviewsCount: 450,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=85',
      description: 'Woven in Italy exclusively by Frette using long-staple Egyptian cotton sateen.',
      badge: 'Bespoke'
    },
    {
      id: 'sr-sabre',
      name: 'St. Regis Champagne Sabrage Sword & Stand',
      brand: 'st-regis',
      category: 'Rituals',
      price: 320,
      rating: 4.9,
      reviewsCount: 115,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=85',
      description: 'Handcrafted ceremonial steel sabre honoring John Jacob Astor IV evening ritual.'
    },

    // JW Marriott
    {
      id: 'jw-garden',
      name: 'JW Garden Herbal Bath & Body Spa Ritual Set',
      brand: 'jw-marriott',
      category: 'Wellness',
      price: 120,
      rating: 4.9,
      reviewsCount: 310,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=85',
      description: 'Enriched with organic rosemary, sweet basil, mint, and calming lavender.',
      badge: 'Spa by JW'
    },
    {
      id: 'jw-bed',
      name: 'JW Marriott Luxury Pillowtop Mattress Set',
      brand: 'jw-marriott',
      category: 'Bespoke Sleep',
      price: 2450,
      rating: 4.9,
      reviewsCount: 520,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=85',
      description: 'Designed for deep, restorative sleep with body-contouring latex support.'
    },

    // W Hotels
    {
      id: 'w-bed',
      name: 'The W Hotels Signature Plush Bed',
      brand: 'w-hotels',
      category: 'Sleep',
      price: 2190,
      rating: 4.8,
      reviewsCount: 740,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=85',
      description: 'Bold comfort and superior motion isolation for tastemakers and night owls.',
      badge: 'Iconic'
    },
    {
      id: 'w-robe',
      name: 'W Hotels Hooded Black Plush Robe',
      brand: 'w-hotels',
      category: 'Loungewear',
      price: 165,
      rating: 4.9,
      reviewsCount: 380,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=85',
      description: 'Signature oversized hood with silky microfiber shell and fleece interior.'
    },

    // Westin
    {
      id: 'westin-heavenly',
      name: 'The World-Famous Westin Heavenly® Bed Set',
      brand: 'westin',
      category: 'Bespoke Sleep',
      price: 2295,
      rating: 5.0,
      reviewsCount: 1420,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
      description: 'The legendary mattress that revolutionized hotel sleep with custom pillowtop support.',
      badge: 'Legendary'
    },
    {
      id: 'westin-diffuser',
      name: 'Westin White Tea Home Fragrance Diffuser',
      brand: 'westin',
      category: 'Home Fragrance',
      price: 88,
      rating: 4.9,
      reviewsCount: 960,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85',
      description: 'The iconic Westin lobby scent with white tea, calming cedarwood, and vanilla.'
    },

    // Marriott
    {
      id: 'marriott-bed',
      name: 'The Marriott Signature Foam Mattress',
      brand: 'marriott',
      category: 'Bedding',
      price: 1890,
      rating: 4.9,
      reviewsCount: 1100,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=85',
      description: 'High-density memory foam core with temperature-regulating phase-change cover.',
      badge: 'Classic Favorite'
    },

    // Sheraton
    {
      id: 'sheraton-bed',
      name: 'The Sheraton Signature Sleep Experience',
      brand: 'sheraton',
      category: 'Bedding',
      price: 1750,
      rating: 4.8,
      reviewsCount: 650,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=85',
      description: 'Custom-designed plush top mattress built to deliver unmatched spinal support.'
    }
  ];

  const currentBrandKey = selectedShopBrand || 'courtyard';
  const filteredProducts = products.filter(p => p.brand === currentBrandKey);

  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAddToCart = (item: ShopProduct) => {
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 2500);
  };

  return (
    <div className="bg-[#faf9f6] text-stone-900 min-h-screen">
      
      {/* Hero Banner */}
      <section className="relative bg-[#1c1917] text-white py-14 sm:py-20 border-b border-stone-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-stone-200 text-xs font-semibold tracking-widest uppercase mb-4">
            <ShoppingBag className="w-3.5 h-3.5 text-[#ee5a24]" />
            <span>Official Marriott Bonvoy Boutiques</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-4">
            Bring the Luxury Hotel Experience Home
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Shop authentic beds, custom linens, iconic spa scents, and bespoke decor from your favorite hotel brands.
          </p>
        </div>
      </section>

      {/* Brand Store Tabs matching screenshot items */}
      <section className="sticky top-20 z-30 bg-white border-b border-stone-200 shadow-xs py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {brandTabs.map(tab => {
            const isSelected = currentBrandKey === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedShopBrand(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8a1538] text-white shadow-xs'
                    : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              {brandTabs.find(t => t.id === currentBrandKey)?.label || 'Shop Collection'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Verified official hotel merchandise · Worldwide white-glove delivery
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-stone-600 hidden sm:flex">
            <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-[#8a1538]" /> Free US Shipping</span>
            <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-[#8a1538]" /> 30-Day Returns</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  fallbackTitle={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#8a1538] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {product.badge}
                  </span>
                )}
                <div className="absolute top-3 right-3 bg-white/95 px-2 py-0.5 rounded-full text-[11px] font-bold text-stone-900 flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-[#c5a059] fill-[#c5a059]" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 group-hover:text-[#8a1538] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed line-clamp-2 mb-4">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-stone-900">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-stone-400 ml-1">USD</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                      addedItem === product.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-900 hover:bg-[#8a1538] text-white'
                    }`}
                  >
                    {addedItem === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};
