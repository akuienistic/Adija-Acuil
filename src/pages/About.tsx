import { Palette, Eye, Heart, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import adijaPortrait from "@/assets/adija-portrait.jpg";

export default function About() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="section-heading mb-6">About Adija Acuil</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A visionary cartoonist dedicated to shaping South Sudan's future through powerful visual storytelling.
          </p>
        </div>

        {/* Bio Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Photo */}
          <div className="relative">
            <div className="max-w-md mx-auto relative">
              <img 
                src={adijaPortrait} 
                alt="Adija Acuil - Cartoonist" 
                className="w-full aspect-square object-cover rounded-3xl shadow-hover"
              />
              {/* Overlay with name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6 rounded-b-3xl">
                <h2 className="font-heading text-2xl text-primary-foreground">Adija Acuil</h2>
                <p className="text-primary-foreground/80">Cartoonist & Visual Storyteller</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary rounded-full opacity-50 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent rounded-full opacity-50 blur-xl" />
          </div>

          {/* Bio Text */}
          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-primary mb-6">
              The Artist Behind the Vision
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Adija Acuil is a South Sudanese cartoonist whose work bridges the gap between art and advocacy. 
                With a unique visual language that speaks to the hearts of the South Sudanese diaspora and beyond, 
                Adija creates cartoons that challenge, inspire, and unite.
              </p>
              <p>
                Born from a deep love for South Sudan and its people, each cartoon is a reflection of the nation's 
                struggles and aspirations. From economic commentary to visions of peace and unity, Adija's work 
                captures the essence of a country on its long journey toward prosperity.
              </p>
              <p>
                "South Sudan between our hands" is more than a slogan—it's a call to action. Through visual 
                storytelling, Adija aims to spark conversations, inspire hope, and contribute to the narrative 
                of a brighter future.
              </p>
            </div>
          </div>
        </div>

        {/* Artistic Vision */}
        <section className="bg-muted rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="section-heading text-center mb-10">Artistic Vision</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Eye,
                title: "Vision",
                description: "To illuminate South Sudan's path through the power of visual art.",
              },
              {
                icon: Heart,
                title: "Passion",
                description: "Deep love for the nation and its resilient people drives every stroke.",
              },
              {
                icon: Palette,
                title: "Creativity",
                description: "Bold, thought-provoking imagery that sparks conversations.",
              },
              {
                icon: Globe,
                title: "Impact",
                description: "Reaching the diaspora, NGOs, educators, and media worldwide.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <item.icon size={32} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Themes */}
        <section className="mb-16">
          <h2 className="section-heading text-center mb-10">Themes Explored</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Future", "Prosperity", "Unity", "Microfinance", "Peace", "Development", "Hope", "Resilience"].map(
              (theme) => (
                <span
                  key={theme}
                  className="px-5 py-2 bg-card rounded-full text-primary font-semibold shadow-soft border border-border"
                >
                  {theme}
                </span>
              )
            )}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center py-10 px-6 bg-secondary/10 rounded-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-primary mb-4">
            Explore the Collection
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Discover the full collection of cartoons that tell the story of South Sudan's journey.
          </p>
          <Link to="/gallery" className="btn-hero inline-block">
            View Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
