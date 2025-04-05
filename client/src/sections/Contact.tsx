import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const { ref, controls } = useScrollReveal();
  const { toast } = useToast();
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-card/50 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            <span className="text-primary">&lt;</span>
            Contact Me
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from you!
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
            }}
          >
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.name ? 'border-destructive' : 'border-border'} text-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="Your name"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.email ? 'border-destructive' : 'border-border'} text-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="your.email@example.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.message ? 'border-destructive' : 'border-border'} text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
                  placeholder="Your message..."
                  {...register('message')}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>
              
              <button 
                type="submit"
                disabled={contactMutation.isPending} 
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {contactMutation.isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className='bx bx-send mr-2'></i> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
            }}
          >
            <div className="bg-background rounded-xl p-8 border border-border">
              <h3 className="text-xl font-heading font-medium mb-6">Let's Connect</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <i className='bx bx-envelope text-primary'></i>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:devmighty277@gmail.com" className="text-foreground hover:text-secondary">devmighty277@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <i className='bx bx-map text-primary'></i>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground">Remote Worldwide</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <i className='bx bx-time text-primary'></i>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <p className="text-foreground">Mon-Fri, 9am-5pm PST</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <p className="text-sm text-muted-foreground mb-4">Connect with me on social media</p>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/easandra" 
                    className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border hover:bg-primary/20 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <i className='bx bxl-github text-foreground'></i>
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border hover:bg-primary/20 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <i className='bx bxl-linkedin text-foreground'></i>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border hover:bg-primary/20 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <i className='bx bxl-twitter text-foreground'></i>
                  </a>
                  <a 
                    href="https://dribbble.com" 
                    className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border hover:bg-primary/20 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Dribbble"
                  >
                    <i className='bx bxl-dribbble text-foreground'></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
