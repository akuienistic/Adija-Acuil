import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut, Trash2, Image, Upload } from "lucide-react";
import { useCartoons } from "@/contexts/CartoonContext";
import { isAdminAuthenticated, setAdminAuth, themes } from "@/data/cartoons";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartoons, addCartoon, deleteCartoon } = useCartoons();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    theme: "Future",
    description: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    setAdminAuth(false);
    toast({ title: "Logged out successfully" });
    navigate("/admin");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({
        title: "Missing Title",
        description: "Please enter a title for the cartoon.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.image) {
      toast({
        title: "Missing Image",
        description: "Please upload an image for the cartoon.",
        variant: "destructive",
      });
      return;
    }

    addCartoon({
      title: formData.title,
      image: formData.image,
      theme: formData.theme,
      description: formData.description || undefined,
      date: new Date().toISOString().split("T")[0],
    });

    toast({
      title: "Cartoon Added!",
      description: "Your cartoon is now live in the gallery.",
    });

    setFormData({ title: "", theme: "Future", description: "", image: "" });
    setPreviewImage(null);
    setShowAddForm(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteCartoon(id);
      toast({
        title: "Cartoon Deleted",
        description: `"${title}" has been removed.`,
      });
    }
  };

  if (!isAdminAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your cartoon collection</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-hero flex items-center gap-2 text-base py-3"
            >
              <Plus size={20} />
              Add New Cartoon
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-3 bg-card text-muted-foreground rounded-xl border border-border hover:bg-muted transition-colors flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Add Cartoon Modal */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="p-6 border-b border-border">
                <h2 className="font-heading text-2xl text-primary">Add New Cartoon</h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cartoon Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="input-styled"
                    placeholder="e.g., Journey to Prosperity"
                    maxLength={100}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Image <span className="text-destructive">*</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-border rounded-xl p-6 hover:border-primary hover:bg-primary/5 transition-colors text-center"
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="max-h-40 mx-auto rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Upload size={32} />
                        <span>Click to upload image</span>
                      </div>
                    )}
                  </button>
                </div>

                {/* Theme */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Theme/Category
                  </label>
                  <select
                    value={formData.theme}
                    onChange={(e) =>
                      setFormData({ ...formData, theme: e.target.value })
                    }
                    className="input-styled"
                  >
                    {themes.slice(1).map((theme) => (
                      <option key={theme} value={theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description (optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="input-styled resize-none"
                    placeholder="A brief description of the cartoon..."
                    maxLength={500}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setPreviewImage(null);
                      setFormData({
                        title: "",
                        theme: "Future",
                        description: "",
                        image: "",
                      });
                    }}
                    className="flex-1 py-3 bg-muted text-muted-foreground rounded-xl font-semibold hover:bg-muted/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-hero py-3">
                    Publish Cartoon
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <p className="text-muted-foreground text-sm">Total Cartoons</p>
            <p className="font-heading text-3xl text-primary">{cartoons.length}</p>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <p className="text-muted-foreground text-sm">Total Reactions</p>
            <p className="font-heading text-3xl text-destructive">
              {cartoons.reduce((sum, c) => sum + c.likes, 0)}
            </p>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <p className="text-muted-foreground text-sm">Categories</p>
            <p className="font-heading text-3xl text-accent">
              {new Set(cartoons.map((c) => c.theme)).size}
            </p>
          </div>
        </div>

        {/* Cartoons List */}
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-heading text-xl text-primary">All Cartoons</h2>
          </div>
          <div className="divide-y divide-border">
            {cartoons.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Image size={48} className="mx-auto mb-4 opacity-50" />
                <p>No cartoons yet. Add your first one!</p>
              </div>
            ) : (
              cartoons.map((cartoon) => (
                <div
                  key={cartoon.id}
                  className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                >
                  <img
                    src={cartoon.image}
                    alt={cartoon.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {cartoon.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="px-2 py-0.5 bg-accent/10 text-accent rounded text-xs font-medium">
                        {cartoon.theme}
                      </span>
                      <span>{cartoon.likes} ❤️</span>
                      <span>{cartoon.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(cartoon.id, cartoon.title)}
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    aria-label="Delete cartoon"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
