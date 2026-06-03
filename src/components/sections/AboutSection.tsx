import ScrollReveal from '../ui/ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 lg:px-12 bg-wine-900 border-t border-wine-700/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pt-8 lg:pt-0">
            
            {/* Left Column: Heading and Image */}
            <div className="flex flex-col w-full h-full justify-start">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display text-gold-500 mb-10 uppercase tracking-[0.15em] font-normal text-left -mt-8 lg:-mt-16" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                <span className="text-cream-100 block text-2xl lg:text-3xl tracking-[0.3em] mb-2 opacity-80">About</span>
                Vinod Naraen
              </h2>
              
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden group flex items-center justify-center">
                {/* Edge Fading Gradients to ensure perfect background merge */}
                <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-wine-900 via-wine-900/50 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-wine-900 via-wine-900/50 to-transparent z-10 pointer-events-none" />
                {/* Reduced top gradient to make face visible */}
                <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-wine-900 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-wine-900 via-wine-900/80 to-transparent z-10 pointer-events-none" />
                
                <img 
                  src="/images/About.jpeg" 
                  alt="Vinod Naraen" 
                  className="w-full h-full object-cover object-center filter grayscale-[20%] sepia-[10%] brightness-[0.9] contrast-[1.1] transition-all duration-1000 group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-100 group-hover:scale-105"
                  style={{
                    maskImage: 'radial-gradient(ellipse at 50% 40%, black 55%, transparent 85%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 55%, transparent 85%)'
                  }}
                />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="flex flex-col space-y-8 text-cream-200 font-light leading-relaxed text-left lg:pt-0 font-body">
              <p className="opacity-90 leading-relaxed text-2xl md:text-3xl" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                He is a writer, publisher, journalist, lyricist, and artist who has always believed in exploring every passion.
              </p>
              
              <p className="text-gold-500 font-semibold tracking-widest uppercase text-sm md:text-base">
                He has never limited himself to one path.
              </p>
              
              <p className="opacity-80 text-lg md:text-xl leading-loose">
                In 2025, an impulsive decision to write a novel led him to writing multiple books and the beginning of his Author and publishing journey. He also creates music, illustrates comics, and uses storytelling as a way to connect with people.
              </p>
              
              <div className="py-6 relative pl-8 border-l border-gold-500/50">
                <p className="text-xl md:text-2xl italic text-cream-100 tracking-wide opacity-90" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                  "Living with Synesthesia shapes the way his creativity, blending sounds, emotions, words, and visuals into his work."
                </p>
              </div>
              
              <p className="opacity-80 text-lg md:text-xl leading-loose">
                Above all, he hopes to create stories and art that make people feel, think, and dream.
              </p>
            </div>
            
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
