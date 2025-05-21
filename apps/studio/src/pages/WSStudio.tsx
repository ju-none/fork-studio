import WSSContact from "./components/WSSContact";
import WSSTextLoop from "./animations/WSSTextLoop";
import { useScrollAnimation } from "@repo/hooks/useScrollAnimation";
import ImageSlider from "./components/ImageSlider";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { usePageTranslation } from "@/i18n";


export default function WSStudio(){

  const t = usePageTranslation();

  const isMobile = () => window.innerWidth < 1024;

  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5,
    delay: 100,
  });
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5, 
    delay: 100,
  });
  const { ref: ref3, isVisible: isVisible3 } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5, 
    delay: 100,
  });
  const { ref: ref4, isVisible: isVisible4 } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5, 
    delay: 100,
    // once:false,
  });
  const { ref: ref5, isVisible: isVisible5 } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5, 
    delay: isMobile() ? 100 : 400,
    //  once:false,
  });
  const { ref: ref6, isVisible: isVisible6 } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5, 
    delay: isMobile() ? 200 : 700,
    //  once:false,
  });
  const { ref: ref7, isVisible: isVisible7 } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5, 
    delay: isMobile() ? 300 : 1000,
    //  once:false,
  });


  return(
    <>
      <Helmet>
        <title>WeShre Studio - Welcome</title>
        <meta name="description" content="Page de présentation de WeShre Studio" />
        <meta property="og:title" content="Welcome to WeShre Studio" />
      </Helmet>
      <main className="main-studio">

        <section className="s-title">
          <h1>WeShre Studio.</h1>
          <p>[<WSSTextLoop 
                texts={["Think together", "Make it real", "We code : You grow"]}
                typingSpeed={100}
                erasingSpeed={35} 
                delayBetweenTexts={2000} 
                stopAtEnd={true} 
              />]
          </p>
          <div className="decor-blur"></div>
        </section>

        <section className="s-designit">
          <div className="title">
            <h2>Design&nbsp;it.Built&nbsp;it. Launch&nbsp;it.</h2>
          </div>
          <div className="text">
            <p>WeShre Studio is where ideas go digital.</p>
            <p>{t('description')}</p>
          </div>
        </section>

        <section className="s-philosophy !p-0">
          <div ref={ref} className={`s-philosophy__title ${isVisible ? 'animate-left-to-right' : 'opacity-0'}`}>
            <div className="blob-pink"></div>
            <div className="blob-palepink"></div>
            <div className="blob-red"></div>
            <h3>Our Philosophy</h3>
          </div>
          <div className={`s-philosophy__text ${isVisible ? 'animate-right-to-left' : 'opacity-0'} backdrop-blur-md`}>
            <p>{t('section.1')}</p>
          </div>
        </section>

        <section className="s-capacity !p-0">
            <figure ref={ref3} className={`xl:block hidden ${isVisible3 ? 'animate-left-to-right' : 'opacity-0'}`}>
              <img src="img/capacity-bg.png" alt="Computer in background"/>
            </figure>

            <div className="s-capacity__content">
              <div ref={ref2} className={`s-capacity__title ${isVisible2 ? 'animate-right-to-left' : 'opacity-0'}`}>
                <div className="blob-green"></div>
                <div className="blob-yellow"></div>
                <div className="blob-paleyellow"></div>
                <h3>Our<br></br>Capacities</h3>
              </div>
              <div className={`s-capacity__text ${isVisible2 ? 'animate-from-bottom' : 'opacity-0'}`}>
                <p>{t('section.2')}</p>
              </div>
            </div>

            <figure className="xl:hidden">
              <img src="img/capacity-bg.png" alt="Computer in background"/>
            </figure>
        </section>

        <section className="s-how">
          <h3>How we work.</h3>
          <p className="max-w-[975px] mb-[65px] lg:mb-100 !text-16 lg:!text-[26px]">We know how fast things move when you're building something big. Our process is designed to keep up, adapt, and deliver real value — fast</p>
          <div className="s-how__grid">

            <div className={`decor-h ${isVisible4 ? 'animate-cascade-scale' : 'opacity-0'}`}></div>
            <p ref={ref4} className={`!text-20 title font-normal title-1 ${isVisible4 ? 'animate-cascade-scale' : 'opacity-0'}`}>
              Think&nbsp;together</p>
            <div className={`decor-h ${isVisible5 ? 'animate-cascade-scale' : 'opacity-0'}`}></div>
            <p ref={ref5} className={`title font-medium title-2 ${isVisible5 ? 'animate-cascade-scale' : 'opacity-0'}`}>
              Design&nbsp;it</p>
            <div className={`decor-h ${isVisible6 ? 'animate-cascade-scale' : 'opacity-0'}`}></div>
            <p ref={ref6} className={`!text-30 title font-semibold title-3 ${isVisible6 ? 'animate-cascade-scale' : 'opacity-0'}`}>
              Built&nbsp;it</p>
            <div className={`decor-h ${isVisible7 ? 'animate-cascade-scale' : 'opacity-0'}`}></div>
            <p ref={ref7} className={`!text-50 title text-gradient title-4 ${isVisible7 ? 'animate-cascade-scalet' : 'opacity-0'}`}>
              Launch&nbsp;it</p>

            <p className={`text text-1 col-start-2 ${isVisible4 ? 'animate-cascade-scale' : 'opacity-0'}`}>
              <svg width="9" height="66" viewBox="0 0 9 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4.5" y1="57.1602" x2="4.5" y2="0.840015" stroke="#000000"/>
                <path d="M3.75489 56.8325C4.15238 56.3884 4.84762 56.3884 5.24511 56.8325L9 61.0275H0L3.75489 56.8325Z" fill="#000000"/>
                <path d="M5.24511 65.1675C4.84762 65.6116 4.15238 65.6116 3.75489 65.1675L0 60.9725H9L5.24511 65.1675Z" fill="#000000"/>
              </svg>

              We start with a discovery call/meeting to understand your vision, goals, and challenges. No fluff — just clarity.</p>
            <p className={`text text-2 col-start-4 ${isVisible5 ? 'animate-cascade-scale' : 'opacity-0'}`}>
            <svg width="9" height="124" viewBox="0 0 9 124" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4.5" y1="114" x2="4.5" stroke="#000000"/>
              <path d="M3.75489 113.993C4.15238 113.549 4.84762 113.549 5.24511 113.993L9 118.188H0L3.75489 113.993Z" fill="#000000"/>
              <path d="M5.24511 122.328C4.84762 122.772 4.15238 122.772 3.75489 122.328L0 118.133H9L5.24511 122.328Z" fill="#000000"/>
            </svg>

              We turn your ideas into wireframes and visual concepts, fast. You’ll get early prototypes to test and iterate before a single line of code is written.</p>

            <p className={`text text-3 col-start-6 ${isVisible6 ? 'animate-cascade-scale' : 'opacity-0'}`}>
            <svg width="9" height="183" viewBox="0 0 9 183" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4.5" y1="174.908" x2="4.5" y2="0.000259399" stroke="#000000"/>
              <path d="M3.79756 174.859C4.187 174.475 4.813 174.475 5.20244 174.859L9 178.607H0L3.79756 174.859Z" fill="#000000"/>
              <path d="M5.20244 182.307C4.813 182.691 4.187 182.691 3.79756 182.307L0 178.559H9L5.20244 182.307Z" fill="#000000"/>
            </svg>

              We build in focused, weekly sprints. You get progress updates, live previews, and flexibility to adjust priorities on the fly.</p>

            <p className={`text text-4 col-start-8 ${isVisible7 ? 'animate-cascade-scale' : 'opacity-0'}`}>
            <svg width="9" height="226" viewBox="0 0 9 226" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4.5" y1="216.008" x2="4.5" y2="0.000411987" stroke="#000000"/>
              <path d="M3.72691 216.032C4.12697 215.544 4.87303 215.544 5.27309 216.032L9 220.575H0L3.72691 216.032Z" fill="#000000"/>
              <path d="M5.27309 225.057C4.87303 225.545 4.12697 225.545 3.72691 225.057L0 220.515H9L5.27309 225.057Z" fill="#000000"/>
            </svg>

              Once everything is tested and polished, we handle deployment and support you through a smooth launch.</p>
          </div>
            <Link
              className="btn-studio w-fit mx-auto mb-80" to="services">
              <span>See our services</span>
              <ReactSVG src="svg/double-chevron-right.svg" />
            </Link>
          <h3 id="about-us">Meet the team.</h3>
        </section>

        <ImageSlider />
        <WSSContact />

      </main>
    </>
  )
}