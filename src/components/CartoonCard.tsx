import { Heart } from "lucide-react";
import { useCartoons } from "@/contexts/CartoonContext";
import { Cartoon } from "@/data/cartoons";
import { useState } from "react";

interface CartoonCardProps {
  cartoon: Cartoon;
  onClick: () => void;
}

export default function CartoonCard({ cartoon, onClick }: CartoonCardProps) {
  const { toggleLike, isLiked } = useCartoons();
  const [isAnimating, setIsAnimating] = useState(false);
  const liked = isLiked(cartoon.id);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    toggleLike(cartoon.id);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <article className="card-cartoon group cursor-pointer" onClick={onClick}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={cartoon.image}
          alt={cartoon.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Theme Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
          {cartoon.theme}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading text-lg text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {cartoon.title}
        </h3>
        {cartoon.description && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {cartoon.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <time className="text-xs text-muted-foreground">
            {new Date(cartoon.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <button
            onClick={handleLike}
            className={`heart-btn ${liked ? "heart-btn-active" : ""}`}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <Heart
              size={18}
              className={`transition-all ${liked ? "fill-destructive" : ""} ${
                isAnimating ? "animate-pulse-heart" : ""
              }`}
            />
            <span className="text-sm font-medium">{cartoon.likes}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
