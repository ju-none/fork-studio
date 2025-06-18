import WSSContact from "./components/WSSContact";
import { ReactSVG } from "react-svg";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Helmet } from "react-helmet-async";
import { usePageTranslation } from "@/i18n";
import { Trans } from "react-i18next";

export default function WSSServices(){
  const t = usePageTranslation();

  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5,
    delay: 100,
    once: false,
  });
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    delay: 100,
    once: false,
  });
  const { ref: ref3, isVisible: isVisible3 } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    delay: 100,
    once: false,
  });
  const { ref: ref4, isVisible: isVisible4 } = useScrollAnimation<HTMLHeadingElement>({
    threshold: 0.5,
    delay: 100,
    once: false,
  });

  const rawOffer = t('web_dev.offer', { returnObjects: true });
  const offer = Array.isArray(rawOffer) ? rawOffer : [];


  return(
    <>

      <Helmet>
        <title>{t('helmet')}</title>
        <meta name="description" content="WeShre Studio offers expert UI/UX design, web development, brand identity creation, and SEO to help your business stand out and scale online." />
        <meta property="og:title" content="WeShre Studio: Our Services" />
        <meta property="og:image" content="https://studio.weshre.com/images/wss.png" />
      </Helmet>
        <main className="main-studio">
          <section className="s-grow">
            <div className="title">
              <h2><span className="animate-cascade-opacity">Design.</span>
              <span className="animate-cascade-opacity animate-cascade-opacity--1">Build.</span>
              <span className="animate-cascade-opacity animate-cascade-opacity--2">Launch.</span></h2>
              <h2 className="grow animate-cascade-opacity animate-cascade-opacity--3">Grow <ReactSVG src={`/svg/grow-arrow.svg`} /></h2>
            </div>
            <p data-key="title">{t('title')}</p>
          </section>

          <section className="s-whatwedo !p-0">
            <h3 className="s-whatwedo__title" data-key="design.title">{t('design.title')}</h3>
            <div ref={ref3} className="s-whatwedo__content">
              <div className={`title-rotate ${isVisible3 ? 'animate' : ''}`}>
                <h4 >Design&nbsp;UI&#8203;/UX</h4>
              </div>
              <div className="text" data-key="design.description">
                <p>{t('design.description')}</p>
              </div>
            </div>
          </section>

          <section className="s-webdev">
            <div className="s-webdev__grid">
              <div ref={ref} className={`title ${isVisible ? 'animate' : ''}`}>
                <h3 data-key="web_dev.title">{t('web_dev.title')}</h3>
              </div>
              <div></div>

              {offer.map((item, index) => (
                <div key={index} className="card">
                  <h4 data-key={`web_dev.offer.${index}.title`}>{item.title}</h4>
                  <p data-key={`web_dev.offer.${index}.description`}>{item.description}</p>
                </div>
              ))}

            </div>
          </section>

          <section className="s-whatwedo !p-0">
            <div ref={ref2} className="s-whatwedo__content s-whatwedo__content--invert ">
              <div className="text">
                <p data-key="identity.description">{t('identity.description')}</p>
                <br />
                <p
                  data-key="identity.partner"
                  dangerouslySetInnerHTML={{ __html: t("identity.partner") }}
                />
              </div>
              <div className={`title-rotate ${isVisible2 ? 'animate' : ''}`} >
                <h4>Brand&nbsp;Identity</h4>
              </div>
            </div>
          </section>

          <section className="s-seo !p-0">
            <h3 className={`${isVisible4 ? 'animate' : ''}`} ref={ref4}>
              SEO & Speed Optimisation
            </h3>
            <p className="max-w-[1400px] editalbe" data-key="seo.description">{t('seo.description')}</p>
          </section>

          <WSSContact />

        </main>
    </>
  )
}