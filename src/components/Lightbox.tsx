import { X, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartoons } from "@/contexts/CartoonContext";
import { Cartoon } from "@/data/cartoons";
import { useEffect, useState } from "react";

interface LightboxProps {
  cartoon: Cartoon;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function Lightbox({
  cartoon,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: LightboxProps) {
  const { toggleLike, isLiked, cartoons } = useCartoons();
  const [isAnimating, setIsAnimating] = useState(false);
  const liked = isLiked(cartoon.id);
  
  // Get current like count from context
  const currentCartoon = cartoons.find(c => c.id === cartoon.id);
  const likeCount = currentCartoon?.likes ?? cartoon.likes;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev && onPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  const handleLike = () => {
    setIsAnimating(true);
    toggleLike(cartoon.id);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-card hover:text-secondary transition-colors z-10"
        aria-label="Close"
      >
        <X size={32} />
      </button>

      {/* Navigation Arrows */}
      {hasPrev && onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-card hover:text-secondary transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={40} />
        </button>
      )}
      {hasNext && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-card hover:text-secondary transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={40} />
        </button>
      )}

      {/* Content */}
      <div
        className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={cartoon.image}
          alt={cartoon.title}
          className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
        />

        {/* Info Bar */}
        <div className="mt-4 w-full max-w-2xl bg-card rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl text-foreground">{cartoon.title}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                {cartoon.theme}
              </span>
              <time className="text-sm text-muted-foreground">
                {new Date(cartoon.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            {cartoon.description && (
              <p className="text-muted-foreground mt-2 text-sm">{cartoon.description}</p>
            )}
          </div>
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              liked
                ? "bg-destructive text-destructive-foreground"
                : "bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            }`}
          >
            <Heart
              size={20}
              className={`transition-all ${liked ? "fill-current" : ""} ${
                isAnimating ? "animate-pulse-heart" : ""
              }`}
            />
            <span className="font-semibold">{likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
