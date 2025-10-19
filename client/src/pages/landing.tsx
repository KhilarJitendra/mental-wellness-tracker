import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, TrendingUp, Sparkles, Shield, Calendar, Heart } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Calming_forest_hero_image_7c22b4f8.png";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight"
          >
            Your Safe Space for Reflection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Track your mental wellness journey with daily journaling, mood insights, and AI-powered reflections
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link href="/dashboard">
              <Button size="lg" className="text-base px-8 py-6" data-testid="button-start-journey">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/journal">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20" 
                data-testid="button-view-entries"
              >
                View Entries
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              Everything you need for your wellness journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A thoughtfully designed space to reflect, understand, and grow
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="border-2 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                  >
                    <BookOpen className="w-6 h-6 text-primary" />
                  </motion.div>
                  <CardTitle className="text-xl">Distraction-Free Writing</CardTitle>
                  <CardDescription className="text-base">
                    Express yourself freely in a calming, focused environment designed for introspection
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-2 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4"
                  >
                    <TrendingUp className="w-6 h-6 text-secondary" />
                  </motion.div>
                  <CardTitle className="text-xl">Mood Tracking & Insights</CardTitle>
                  <CardDescription className="text-base">
                    Visualize your emotional patterns over time and discover meaningful trends
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-2 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                  >
                    <Sparkles className="w-6 h-6 text-primary" />
                  </motion.div>
                  <CardTitle className="text-xl">AI-Powered Reflections</CardTitle>
                  <CardDescription className="text-base">
                    Receive personalized prompts and insights based on your journaling journey
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Analytics Showcase */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-6">
                Understand your patterns
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Beautiful visualizations help you see how you're progressing, identify what lifts your mood, and celebrate your consistency.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Streak tracking</h3>
                    <p className="text-muted-foreground">Build a consistent journaling habit</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Mood trends</h3>
                    <p className="text-muted-foreground">Watch your emotional wellness over time</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Heart className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Pattern recognition</h3>
                    <p className="text-muted-foreground">Discover what affects your wellbeing</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-card rounded-3xl shadow-xl p-8 border"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Your Progress</h3>
                  <span className="text-sm text-muted-foreground">Last 30 days</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Streak</CardDescription>
                      <CardTitle className="text-3xl">12</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Entries</CardDescription>
                      <CardTitle className="text-3xl">28</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Avg Mood</CardDescription>
                      <CardTitle className="text-3xl">4.2</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
                <div className="h-48 bg-muted/50 rounded-xl flex items-center justify-center">
                  <span className="text-muted-foreground">Mood trend chart</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
          >
            <Shield className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-6">
            Your privacy matters
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your journal entries are private and secure. We believe in creating a safe space for your thoughts where you can be completely honest with yourself.
          </p>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-primary/5">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-6">
            Begin your wellness journey today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands who have discovered the power of daily reflection
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-base px-8 py-6" data-testid="button-get-started">
              Get Started Free
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 MindfulPages. Your safe space for reflection.</p>
        </div>
      </footer>
    </div>
  );
}
