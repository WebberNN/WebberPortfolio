import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <motion.div 
        className="container mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <span className="font-mono text-9xl font-bold text-primary opacity-20">404</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Page Not Found</h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-x-4">
          <Link href="/">
            <a className="btn btn-primary">
              <i className="bx bx-home-alt mr-2"></i>
              Back to Home
            </a>
          </Link>
          
          <a 
            href="#contact" 
            className="btn btn-outline"
          >
            <i className="bx bx-envelope mr-2"></i>
            Contact Us
          </a>
        </div>
        
        <div className="mt-16">
          <div className="terminal-block inline-block text-left">
            <div className="flex items-center mb-2">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <p className="text-muted-foreground"><span className="text-secondary">$</span> path: not_found</p>
            <p className="text-muted-foreground"><span className="text-secondary">$</span> error: 404</p>
            <p className="text-muted-foreground"><span className="text-secondary">$</span> solution: redirect to <span className="text-primary">home</span></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
