import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    number: '01',
    title: 'Author',
    descriptor: 'Crafting narratives that explore the human experience',
    anchor: 'bottom-left',
    image: '/images/author.png',
    objectPosition: 'center 15%',
    skipWonk: false,
  },
  {
    number: '02',
    title: 'Podcaster',
    descriptor: 'Intentional conversations — unfiltered, deep, alive',
    anchor: 'top-right',
    image: '/images/Podcaster.jpeg',
    objectPosition: 'center 10%',
    skipWonk: false,
  },
  {
    number: '03',
    title: 'Standup Comedian',
    descriptor: 'Truth through laughter — multilingual, sharp, human',
    anchor: 'bottom-left',
    image: '/images/Comedian.jpeg',
    objectPosition: 'center top',
    containerTop: '15vh',
    skipWonk: false,
  },
  {
    number: '04',
    title: 'Publisher',
    descriptor: 'Curating and elevating stories that deserve to be heard',
    anchor: 'top-right',
    image: '/images/Publisher.png',
    objectPosition: 'center 15%',
    skipWonk: false,
  },
  {
    number: '05',
    title: 'Lyricist &',
    titleLine2: 'Music Composer',
    descriptor: 'Translating raw emotions into melodies and verses',
    anchor: 'bottom-left',
    image: '/images/Lyricist.jpeg',
    objectPosition: 'center 15%',
    skipWonk: true,
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
      const panelEls = track.querySelectorAll('.expertise-panel');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none'
      });

      // Variable font WONK morphing — skip panels with special characters
      panelEls.forEach((panel, i) => {
        if (panels[i]?.skipWonk) return;
        const titleEl = panel.querySelector('.panel-title');
        if (!titleEl) return;
        gsap.fromTo(
          titleEl,
          { fontVariationSettings: '"opsz" 9, "WONK" 0' },
          {
            fontVariationSettings: '"opsz" 144, "WONK" 1',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: 'left center',
              end: 'right center',
              scrub: true,
            },
          }
        );
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
      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${panels.length * 100}vw` }}
      >
        {panels.map((panel, i) => {
          const isTopRight = panel.anchor === 'top-right';
          return (
            <div
              key={panel.number}
              className="expertise-panel relative flex-shrink-0 h-full border-r border-gold-500/15"
              style={{ width: '100vw' }}
            >
              {/* Ghost watermark number */}
              <span
                className="absolute inset-0 flex items-center justify-center font-display text-[40vw] leading-none select-none pointer-events-none text-wine-700/30 tracking-tighter"
                aria-hidden="true"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontVariationSettings: '"opsz" 144, "WONK" 0',
                  opacity: 0.12,
                }}
              >
                {panel.number}
              </span>

              {/* Background Image — CSS mask for seamless edge blending */}
              <div
                className={`absolute w-[90%] md:w-[60%] lg:w-[55%] h-[75vh] max-h-[850px] z-0 pointer-events-none ${
                  isTopRight ? 'bottom-0 left-0 md:bottom-0 md:left-0' : 'right-0 md:right-0'
                }`}
                style={{
                  top: !isTopRight ? (panel.containerTop || '0') : undefined,
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                  WebkitMaskComposite: 'destination-in',
                  maskComposite: 'intersect',
                }}
              >
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="w-full h-full object-cover grayscale-[20%] brightness-[0.85]"
                  style={{ objectPosition: panel.objectPosition }}
                />
              </div>

              {/* Panel content — asymmetric anchoring */}
              <div
                className={`absolute px-12 lg:px-20 py-20 max-w-3xl z-10 ${isTopRight
                    ? 'top-0 right-0 text-right'
                    : 'bottom-0 left-0 text-left'
                  }`}
              >
                {/* Role title — massive Fraunces */}
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

                {/* Italic descriptor — small caps feel */}
                <p
                  className="text-cream-300 font-light text-xl italic tracking-wide"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
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
