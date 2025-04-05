import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="py-10 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-heading font-bold text-white flex items-center">
              <span className="text-primary">&lt;</span>
              Dev
              <span className="text-secondary">Portfolio</span>
              <span className="text-primary">/&gt;</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Crafting digital experiences with code
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Alex Johnson. All rights reserved.
            </p>
            <div className="mt-3 flex space-x-4">
              <a 
                href="https://github.com" 
                className="text-muted-foreground hover:text-secondary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className='bx bxl-github'></i>
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-muted-foreground hover:text-secondary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className='bx bxl-linkedin'></i>
              </a>
              <a 
                href="https://twitter.com" 
                className="text-muted-foreground hover:text-secondary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className='bx bxl-twitter'></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
