import WSSContact from "./components/WSSContact";
import { ReactSVG } from "react-svg";
import { useScrollAnimation } from "@repo/hooks/useScrollAnimation";
import { Helmet } from "react-helmet-async";
import { usePageTranslation } from "@/i18n";

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

  return(
    <>
      <Helmet>
        <title>WeShre Studio - Services</title>
        <meta name="description" content="Page de présentation des services de WeShre Studio" />
        <meta property="og:title" content="WeShre Studio Services" />
      </Helmet>
        <main className="main-studio">
          <section className="s-grow">
            <div className="title">
              <h2><span className="animate-cascade-opacity">Design.</span>
              <span className="animate-cascade-opacity animate-cascade-opacity--1">Build.</span>
              <span className="animate-cascade-opacity animate-cascade-opacity--2">Launch.</span></h2>
              <h2 className="grow animate-cascade-opacity animate-cascade-opacity--3">Grow <ReactSVG src={`/svg/grow-arrow.svg`} /></h2>
            </div>
            <p>{t('description')}</p>
          </section>

          <section className="s-whatwedo !p-0">
            <h3 className="s-whatwedo__title">What we do.</h3>
            <div ref={ref3} className="s-whatwedo__content">
              <div className={`title-rotate ${isVisible3 ? 'animate' : ''}`}>
                <h4 >Design&nbsp;UI&#8203;/UX</h4>
              </div>
              <div className="text">
                <p>We design clean, modern, and user-centered interfaces that don’t just look good — they work. Every design starts with a deep understanding of your audience and business goals. From user research to wireframes and fully responsive mockups, we create experiences that feel intuitive and deliver results. We follow accessibility best practices and can provide a full design system or style guide to support consistency as you grow.</p>
              </div>
            </div>
          </section>

          <section className="s-webdev">
            <div className="s-webdev__grid">
              <div ref={ref} className={`title ${isVisible ? 'animate' : ''}`}>
                <h3 className="">Web Development Services</h3>
              </div>
              <div></div>

              <div className="card">
                <h4>Bespoke Development Services</h4>
                <p>Bespoke website development means building a fully custom digital solution designed specifically for your business goals and user needs. Instead of relying on templates, we create scalable, high-performance websites from the ground up — delivering a seamless user experience that drives engagement, supports your growth, and sets you apart from the competition.</p>
              </div>

              <div className="card">
                <h4>eCommerce Solutions</h4>
                <p>Our e-commerce development services are focused on building fast, secure, and intuitive online stores that drive sales and delight your customers. We go beyond the basics by integrating advanced features like secure payment systems, smart inventory management, and personalized shopping experiences. The result is a seamless, high-converting platform designed to help your business grow online.</p>
              </div>

              <div className="card">
                <h4>Content Management System</h4>
                <p>Alongside your website, we build a dedicated admin interface that gives you full control over your content — no coding, no technical knowledge required. Whether you need to update text, publish blog posts, manage images, or edit product listings, our custom dashboard is designed to match exactly what you need. It’s clean, intuitive, and tailored to your workflow, so you can keep your site up to date without ever having to rely on a developer.</p>
              </div>

              <div className="card">
                <h4>API Integration</h4>
                <p>Our API integration and development services connect your website with the tools and platforms your business depends on — from payment gateways and inventory systems to CRMs and back-office software. We design and implement custom APIs that enable smooth, secure data exchange, ensuring your systems work together efficiently and your operations stay streamlined.</p>
              </div>

            </div>
          </section>

          <section className="s-whatwedo !p-0">
            <div ref={ref2} className="s-whatwedo__content s-whatwedo__content--invert ">
              <div className="text">
                <p>Your brand is your voice, your promise, and your first impression. We help you build an identity that stands out and connects. From logo design to full brand strategy, we create visual systems that reflect your mission, values, and audience. Whether you're just starting out or evolving your brand, we guide you through every stage — designing everything from your logo and color palette to pitch deck visuals and social media templates.</p>
                <p>We're proud to partner with Global Design, whose expertise in logo creation, object design, and video production enriches our creative offering. Together, we craft brand experiences that are not only visually compelling but also deeply aligned with your mission and goals.</p>
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
            <p className="max-w-[1400px]">Our SEO service is designed to optimize your website’s visibility on search engines like Google. Through a personalized strategy that includes technical audits, content optimization, link building, and local SEO, we help you attract qualified traffic and achieve sustainable improvements in your rankings. Regular monitoring, transparent results, and tailored support are at the heart of our approach—turning your online presence into a real growth driver.</p>
          </section>

          <WSSContact />

        </main>
    </>
  )
}