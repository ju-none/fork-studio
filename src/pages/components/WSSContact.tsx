import { ReactSVG } from "react-svg";
import { useRef } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useContactForm } from "./useContactForm";
import { SuccessMessage } from "./ContactFormMessages";
import { Link } from "react-router-dom";
import { useComponentTranslation } from "@/i18n";

export default function WSSContact() {
  const t = useComponentTranslation('contact');

  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5,
    delay: 100
  });
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5,
    delay: 100
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    formData,
    isSubmitting,
    isSuccess,
    serverError,
    handleChange,
    handleSubmit,
    handleInvalid,
    handleInput: handleInputValidation
  } = useContactForm({
    accessKey: '481ae37f-4f16-4fad-a5bf-98ef3bc7f62d',
    onSuccess: () => {
      console.log('Message has been sent successfuly');
    },
    onError: (error) => {
      console.error('Error:', error);
    }
  });

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  return (
    <section id="contact" className="s-contact my-100 lg:my-200">
      <h3 ref={ref} className={`s-contact__title ${isVisible ? 'animate-from-bottom' : 'opacity-0'}`}
        data-key="Contact.discuss">
        {t('discuss')}
      </h3>
      <div className={`separator ${isVisible ? 'animate-from-bottom--px' : 'opacity-0'}`}></div>
      <div className="s-contact__content">
        <div className="s-contact__text">
          <p data-key="Contact.question">{t('question')}</p>
          <a href={t('links.email')} data-key="Contact.email">
            <ReactSVG src="/svg/big-arrow.svg" />
            {t('email')}
          </a>
        </div>

        <div className="s-contact__form">
          <h4>{t('form.title')}</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-row" ref={ref2}>
              <label htmlFor="name" className="sr-only">{t('form.name')}</label>
              <input
                type="text"
                placeholder={t('form.name')+"*"}
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onInvalid={(e) => handleInvalid(e as any, 'name')}
                onInput={handleInputValidation}
                className={`${isVisible2 ? 'animate-from-bottom' : 'opacity-0'}`}
                disabled={isSubmitting}
                required
                minLength={2}
              />
              <label htmlFor="email" className="sr-only">{t('form.email')}</label>
              <input
                type="email"
                placeholder={t('form.email')+"*"}
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onInvalid={(e) => handleInvalid(e as any, 'email')}
                onInput={handleInputValidation}
                className={`${isVisible2 ? 'animate-from-bottom' : 'opacity-0'}`}
                disabled={isSubmitting}
                required
              />
            </div>
            <label htmlFor="message" className="sr-only">{t('form.message')}</label>
            <textarea
              className={`${isVisible2 ? 'animate-from-bottom--px' : 'opacity-0'}`}
              name="message"
              id="message"
              placeholder= {t('form.message')+"*"}
              ref={textareaRef}
              value={formData.message}
              onChange={(e) => {
                handleChange('message', e.target.value);
                handleTextareaInput();
              }}
              onInvalid={(e) => handleInvalid(e as any, 'message')}
              onInput={(e) => {
                handleInputValidation(e);
                handleTextareaInput();
              }}
              rows={1}
              disabled={isSubmitting}
              required
              minLength={10}
            />
            <div className="relative flex gap-10 items-center mb-4">
              <label htmlFor="policy" className="sr-only">{t('form.privacy')}</label>
              <input
                type="checkbox"
                name="policy"
                id="policy"
                checked={formData.policy}
                onChange={(e) => handleChange('policy', e.target.checked)}
                disabled={isSubmitting}
              />
              <span className="text-12 sm:text-16 lg:text-[24px]">
                {t('form.privacy_text')} <Link to="/privacy/" target="_blank" className="link">{t('form.privacy_link')}</Link>
              </span>
              
            <SuccessMessage show={isSuccess} />
            {serverError && (
              <div className="animate-from-bottom absolute -bottom-30 right-0 ml-auto max-w-[270px] text-14 z-[3] bg-[#b2291189] backdrop-blur-sm p-15 rounded-[10px]">
                {serverError}
              </div>
            )}
            </div>
            
            <button type="submit"className="btn-studio ml-auto mt-70" disabled={isSubmitting}>
              <span>{isSubmitting ? t('form.sending') : t('form.submit')}</span>
              <ReactSVG src="/svg/double-chevron-right.svg" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}