import { Link } from "react-router-dom";
import { ArrowRight, Facebook, Heart, Users } from "lucide-react";
import { useCartoons } from "@/contexts/CartoonContext";
import CartoonCard from "@/components/CartoonCard";
import Lightbox from "@/components/Lightbox";
import { useState } from "react";
import { Cartoon } from "@/data/cartoons";
export default function Index() {
  const {
    cartoons,
    getFeaturedCartoon
  } = useCartoons();
  const [selectedCartoon, setSelectedCartoon] = useState<Cartoon | null>(null);
  const featured = getFeaturedCartoon();
  const recentCartoons = cartoons.slice(0, 6);
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-secondary" />
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-accent" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-secondary" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-semibold mb-6">
                ✨ Visionary Cartoons
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6">
                Cartoons for the Future of{" "}
                <span className="text-secondary">South Sudan</span>
              </h1>
              <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                South Sudan between our hands. Join our long journey towards prosperity, unity, and peace through powerful visual storytelling.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link to="/gallery" className="btn-hero inline-flex items-center justify-center gap-2">
                  Explore Gallery
                  <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="btn-secondary-hero inline-flex items-center justify-center hover:bg-primary/90 hover:border-white/90">
                  About Adija
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <div className="p-2 bg-primary-foreground/10 rounded-full">
                    <Facebook size={18} />
                  </div>
                  <span className="text-sm font-medium">1K+ Followers</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <div className="p-2 bg-primary-foreground/10 rounded-full">
                    <Heart size={18} className="text-destructive" />
                  </div>
                  <span className="text-sm font-medium">{cartoons.reduce((sum, c) => sum + c.likes, 0)}+ Reactions</span>
                </div>
              </div>
            </div>

            {/* Featured Cartoon */}
            {featured && <div className="relative cursor-pointer group" onClick={() => setSelectedCartoon(featured)}>
                <div className="absolute -inset-4 bg-secondary/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-card rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300">
                  <img src={featured.image} alt={featured.title} className="w-full aspect-[4/3] object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6">
                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full mb-2">
                      Featured
                    </span>
                    <h3 className="font-heading text-xl text-card">{featured.title}</h3>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading mb-6">Our Vision</h2>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              Through the power of visual art, we illuminate the path to a brighter future for South Sudan. 
              Each cartoon tells a story of hope, challenges our thinking, and inspires action toward 
              <span className="text-accent font-semibold"> prosperity</span>, 
              <span className="text-primary font-semibold"> unity</span>, and 
              <span className="text-secondary font-semibold"> peace</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Cartoons */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <h2 className="section-heading">Latest Cartoons</h2>
            <Link to="/gallery" className="text-primary font-semibold hover:text-primary/80 transition-colors inline-flex items-center gap-1">
              View All
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recentCartoons.map(cartoon => <CartoonCard key={cartoon.id} cartoon={cartoon} onClick={() => setSelectedCartoon(cartoon)} />)}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">Stay Connected</h2>
            <p className="text-accent-foreground/90 text-lg mb-8">
              Subscribe to receive new cartoons and updates on the journey toward South Sudan's prosperity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/subscribe" className="btn-hero bg-card text-accent hover:bg-card/90 text-center">
                Subscribe Now  
              </Link>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn-secondary-hero border-accent-foreground text-accent">
                Follow on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedCartoon && <Lightbox cartoon={selectedCartoon} onClose={() => setSelectedCartoon(null)} onPrev={() => {
      const idx = cartoons.findIndex(c => c.id === selectedCartoon.id);
      if (idx > 0) setSelectedCartoon(cartoons[idx - 1]);
    }} onNext={() => {
      const idx = cartoons.findIndex(c => c.id === selectedCartoon.id);
      if (idx < cartoons.length - 1) setSelectedCartoon(cartoons[idx + 1]);
    }} hasPrev={cartoons.findIndex(c => c.id === selectedCartoon.id) > 0} hasNext={cartoons.findIndex(c => c.id === selectedCartoon.id) < cartoons.length - 1} />}
    </div>;
}