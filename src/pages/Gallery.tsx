import { useState } from "react";
import { useCartoons } from "@/contexts/CartoonContext";
import CartoonCard from "@/components/CartoonCard";
import Lightbox from "@/components/Lightbox";
import { themes, Theme, Cartoon } from "@/data/cartoons";

export default function Gallery() {
  const { cartoons } = useCartoons();
  const [activeTheme, setActiveTheme] = useState<Theme>("All");
  const [selectedCartoon, setSelectedCartoon] = useState<Cartoon | null>(null);

  const filteredCartoons =
    activeTheme === "All"
      ? cartoons
      : cartoons.filter((c) => c.theme === activeTheme);

  const currentIndex = selectedCartoon
    ? filteredCartoons.findIndex((c) => c.id === selectedCartoon.id)
    : -1;

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="section-heading mb-4">Cartoon Gallery</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore visionary cartoons that illuminate South Sudan's path toward unity, prosperity, and peace.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              className={`filter-btn ${
                activeTheme === theme ? "filter-btn-active" : "filter-btn-inactive"
              }`}
            >
              {theme}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredCartoons.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCartoons.map((cartoon) => (
              <CartoonCard
                key={cartoon.id}
                cartoon={cartoon}
                onClick={() => setSelectedCartoon(cartoon)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No cartoons found for "{activeTheme}" theme.
            </p>
          </div>
        )}

        {/* Results Count */}
        <div className="text-center mt-10 text-muted-foreground">
          Showing {filteredCartoons.length} of {cartoons.length} cartoons
        </div>
      </div>

      {/* Lightbox */}
      {selectedCartoon && (
        <Lightbox
          cartoon={selectedCartoon}
          onClose={() => setSelectedCartoon(null)}
          onPrev={() => {
            if (currentIndex > 0) {
              setSelectedCartoon(filteredCartoons[currentIndex - 1]);
            }
          }}
          onNext={() => {
            if (currentIndex < filteredCartoons.length - 1) {
              setSelectedCartoon(filteredCartoons[currentIndex + 1]);
            }
          }}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < filteredCartoons.length - 1}
        />
      )}
    </div>
  );
}
