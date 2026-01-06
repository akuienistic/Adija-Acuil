import { useState } from "react";
import { Mail, CheckCircle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Subscribe() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate subscription
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail("");

    toast({
      title: "Subscribed!",
      description: "You'll receive updates on new cartoons and stories.",
    });
  };

  if (isSubscribed) {
    return (
      <div className="min-h-screen py-12 md:py-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-accent-foreground" />
          </div>
          <h1 className="font-heading text-3xl text-primary mb-4">
            You're Subscribed!
          </h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Thank you for joining our community. You'll receive updates on new 
            cartoons, stories, and insights about South Sudan's journey.
          </p>
          <button
            onClick={() => setIsSubscribed(false)}
            className="text-primary font-semibold hover:underline"
          >
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {/* Hero Card */}
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center text-primary-foreground mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
              <Mail size={36} className="text-secondary-foreground" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl mb-4">
              Stay in the Loop
            </h1>
            <p className="text-primary-foreground/90 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              Subscribe to receive new cartoons, stories behind the art, and 
              updates on South Sudan's journey toward prosperity.
            </p>

            {/* Subscribe Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-4 rounded-xl bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                  maxLength={255}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-4 bg-secondary text-secondary-foreground font-heading rounded-xl hover:bg-secondary/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                      <span className="sr-only">Subscribing...</span>
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Privacy Note */}
          <div className="bg-muted rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-heading text-lg text-foreground mb-2">
                Your Privacy Matters
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We respect your privacy. Your email will only be used to send 
                you updates about new cartoons and related content. You can 
                unsubscribe at any time with one click. We never share your 
                information with third parties.
              </p>
            </div>
          </div>

          {/* What to Expect */}
          <div className="mt-10">
            <h2 className="font-heading text-2xl text-primary text-center mb-8">
              What You'll Receive
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: "New Cartoons",
                  description: "Be the first to see new visionary artwork.",
                },
                {
                  title: "Behind the Art",
                  description: "Stories and context behind each piece.",
                },
                {
                  title: "Updates",
                  description: "News on exhibitions and collaborations.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-heading text-primary text-xl">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
