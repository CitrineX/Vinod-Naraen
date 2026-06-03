import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent massive layout thrashing and lag when the mobile address bar hides/shows on scroll
ScrollTrigger.config({ ignoreMobileResize: true });

const panels = [
  {
    number: '01',
    title: 'Author',
    descriptor: 'Vinod Naraen began his author journey on September 1, 2025, with an impulsive decision to write a novel. He completed his first novel in just two and a half days, proving that passion and determination can create extraordinary results.',
    anchor: 'bottom-left',
    image: '/images/author.png',
    objectPosition: 'center 15%',
    skipWonk: false,
  },
  {
    number: '02',
    title: 'Publisher',
    descriptor: 'Believing that every writer deserves a platform, Vinod Naraen founded his own publishing company with the vision of encouraging emerging authors.',
    anchor: 'top-right',
    image: '/images/Publisher.png',
    objectPosition: 'center 15%',
    skipWonk: false,
  },
  {
    number: '03',
    title: 'Lyricist &',
    titleLine2: 'Music Composer',
    descriptor: 'A trained Carnatic singer, Vinod\'s love for music naturally evolved into songwriting and composition. As a lyricist and music composer, he enjoys transforming emotions, experiences, and ideas into melodies and meaningful lyrics.',
    anchor: 'bottom-left',
    image: '/images/Lyricist.jpeg',
    objectPosition: 'center 15%',
    skipWonk: true,
  },
  {
    number: '04',
    title: 'Podcaster',
    descriptor: 'Known for his energetic personality and enthusiasm for conversation, Vinod ventured into podcasting as a way to engage with people and explore a wide range of topics.',
    anchor: 'top-right',
    image: '/images/Podcaster.jpeg',
    objectPosition: 'center 10%',
    skipWonk: false,
  },
  {
    number: '05',
    title: 'Standup Comedian',
    descriptor: 'Vinod also started Stand-Up Comedy as a passion and enjoys it — bringing truth through laughter, multilingual, sharp, and deeply human.',
    anchor: 'bottom-left',
    image: '/images/Comedian.jpeg',
    objectPosition: 'center top',
    containerTop: '15vh',
    skipWonk: false,
  },
];

export default function ExpertiseSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add('all', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.15,
          start: 'top top',
          end: () => `+=${track.offsetWidth * ((panels.length - 1) / panels.length)}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.to(track, {
        xPercent: -(100 - (100 / panels.length)),
        ease: 'none',
        force3D: true,
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative bg-wine-900 border-t border-wine-700/30 overflow-hidden h-screen"
    >
      {/* Horizontal track — backface-visibility ensures dedicated GPU layer */}
      <div
        ref={trackRef}
        className="flex h-full"
        style={{
          width: `${panels.length * 100}vw`,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {panels.map((panel, i) => {
          const isTopRight = panel.anchor === 'top-right';
          return (
            <div
              key={panel.number}
              className="expertise-panel relative flex-shrink-0 h-full border-r border-gold-500/15"
              style={{ width: '100vw' }}
            >
              {/* Ghost watermark number — hidden on mobile to save RAM, visible on tablet+ */}
              <span
                className="absolute inset-0 items-center justify-center font-display text-[40vw] leading-none select-none pointer-events-none text-wine-700/30 tracking-tighter hidden md:flex"
                aria-hidden="true"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontVariationSettings: '"opsz" 144, "WONK" 0',
                  opacity: 0.12,
                }}
              >
                {panel.number}
              </span>

              {/* Background Image — Optimized with a single radial mask to perfectly smudge all 4 edges */}
              <div
                className={`absolute w-[90%] md:w-[60%] lg:w-[55%] h-[75vh] max-h-[850px] z-0 pointer-events-none ${isTopRight ? 'bottom-0 left-0 md:bottom-0 md:left-0' : 'right-0 md:right-0'
                  }`}
                style={{ 
                  top: !isTopRight ? (panel.containerTop || '0') : undefined,
                  WebkitMaskImage: 'radial-gradient(ellipse closest-side at center, black 30%, transparent 100%)',
                  maskImage: 'radial-gradient(ellipse closest-side at center, black 30%, transparent 100%)',
                }}
              >
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: panel.objectPosition }}
                  decoding="async"
                />
              </div>

              {/* Panel content — asymmetric anchoring */}
              <div
                className={`absolute px-12 lg:px-20 py-24 md:py-20 max-w-3xl z-10 ${isTopRight
                  ? 'top-0 right-0 text-right'
                  : 'bottom-0 left-0 text-left'
                  }`}
              >
                {/* Role title */}
                <h2
                  className="panel-title text-[15vw] md:text-[10vw] lg:text-[8rem] leading-[0.85] tracking-tight text-cream-100 mb-6"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: panel.skipWonk ? '"opsz" 144, "WONK" 1' : '"opsz" 9, "WONK" 0',
                  }}
                >
                  {panel.title}
                  {panel.titleLine2 && (
                    <>
                      <br />
                      {panel.titleLine2}
                    </>
                  )}
                </h2>

                {/* Gold thin rule */}
                <div
                  className={`h-[1px] bg-gold-500/40 w-24 mb-6 ${isTopRight ? 'ml-auto' : ''
                    }`}
                />

                {/* Descriptor */}
                <p
                  className="text-cream-300 font-light text-base md:text-lg leading-relaxed max-w-xl opacity-80"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {panel.descriptor}
                </p>

                {/* Number in corner — small mono */}
                <span className="absolute top-8 left-12 lg:left-20 text-gold-500/40 font-mono text-xs tracking-[0.3em]">
                  {panel.number} / 0{panels.length}
                </span>
              </div>

              {/* Vertical gold rule at right edge */}
              {i < panels.length - 1 && (
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
