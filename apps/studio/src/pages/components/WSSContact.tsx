import { ReactSVG } from "react-svg";
import { useRef } from "react";
import { useScrollAnimation } from "@repo/hooks/useScrollAnimation";
import { useContactForm } from "./useContactForm";
import { SuccessMessage } from "./ContactFormMessages";
import { Link } from "react-router-dom";

export default function WSSContact() {
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
      <h3 ref={ref} className={`${isVisible ? 'animate-from-bottom' : 'opacity-0'}`}>
        Let's discuss your project
      </h3>
      <div className={`separator ${isVisible ? 'animate-from-bottom--px' : 'opacity-0'}`}></div>
      <div className="s-contact__content">
        <div className="s-contact__text">
          <p>
            If you have a question, need support, or just want to say hello, feel free to drop us an email below.
            But if you're reaching out about a new project, go ahead and fill out the form and we'll get back to you with details on how we can bring your idea to life.
          </p>
          <a href="mailto:studio@weshre.com">
            <ReactSVG src="/svg/big-arrow.svg" />
            studio@weshre.com
          </a>
        </div>

        <div className="s-contact__form">
          <h4>Get in touch</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-row" ref={ref2}>
              <input
                type="text"
                placeholder="Your name*"
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
              <input
                type="email"
                placeholder="Your email*"
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
            <textarea
              className={`${isVisible2 ? 'animate-from-bottom--px' : 'opacity-0'}`}
              name="message"
              id="message"
              placeholder="Your message*"
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
              <input
                type="checkbox"
                name="policy"
                id="policy"
                checked={formData.policy}
                onChange={(e) => handleChange('policy', e.target.checked)}
                disabled={isSubmitting}
              />
              <span className="text-12 sm:text-16 lg:text-[24px]">
                I accept the <Link to="/privacy/" target="_blank" className="link">privacy policy</Link>
              </span>
              
            <SuccessMessage show={isSuccess} />
            {serverError && (
              <div className="animate-from-bottom absolute -bottom-30 right-0 ml-auto max-w-[270px] text-14 z-[3] bg-[#b2291189] backdrop-blur-sm p-15 rounded-[10px]">
                {serverError}
              </div>
            )}
            </div>
            
            <button type="submit"className="btn-studio ml-auto mt-70" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Sending...' : 'Submit'}</span>
              <ReactSVG src="/svg/double-chevron-right.svg" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}