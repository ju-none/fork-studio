import { useState, useCallback } from 'react';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  policy: boolean;
}

export interface UseContactFormConfig {
  onSuccess?: (data: ContactFormData) => void;
  onError?: (error: Error) => void;
  apiEndpoint?: string;
  accessKey?: string; 
}

export interface UseContactFormReturn {
  formData: ContactFormData;
  isSubmitting: boolean;
  isSuccess: boolean;
  serverError: string | null;
  handleChange: (field: keyof ContactFormData, value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleInvalid: (e: React.InvalidEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
  handleInput: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  resetForm: () => void;
}


export const useContactForm = (config: UseContactFormConfig): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    policy: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  const handleChange = useCallback((field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (serverError) {
      setServerError(null);
    }
  }, [serverError]);
  
  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      message: '',
      policy: false
    });
    setServerError(null);
    setIsSuccess(false);
  }, []);
  

  const handleInvalid = useCallback((
    e: React.InvalidEvent<HTMLInputElement | HTMLTextAreaElement>, 
    fieldName: string
  ) => {
    const target = e.target;
    
    switch (fieldName) {
      case 'name':
        if (target.validity.valueMissing) {
          target.setCustomValidity('Please enter your name');
        } else if (target.validity.tooShort) {
          target.setCustomValidity('Name must be at least 2 characters long');
        }
        break;
      case 'email':
        if (target.validity.valueMissing) {
          target.setCustomValidity('Please enter your email');
        } else if (target.validity.typeMismatch) {
          target.setCustomValidity('Please enter a valid email address');
        }
        break;
      case 'message':
        if (target.validity.valueMissing) {
          target.setCustomValidity('Please enter your message');
        } else if (target.validity.tooShort) {
          target.setCustomValidity('Message must be at least 10 characters long');
        }
        break;
    }
  }, []);
  

  const handleInput = useCallback((e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.setCustomValidity('');
  }, []);
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    

    if (!formData.policy) {
      setServerError('Please accept the privacy policy');
      return;
    }
    
    setIsSubmitting(true);
    setServerError(null);
    
    try {

      const endpoint = config.apiEndpoint || 'https://api.web3forms.com/submit';
      const payload = config.accessKey 
        ? {
            ...formData,
            access_key: config.accessKey,
            from_name: formData.name, 
            email: formData.email,
            message: formData.message
          }
        : formData;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Error sending message');
      }
      
      setIsSuccess(true);
      config.onSuccess?.(formData);
      
      setTimeout(() => {
        resetForm();
      }, 5000);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error sending message';
      setServerError(errorMessage);
      config.onError?.(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, config, resetForm]);
  
  return {
    formData,
    isSubmitting,
    isSuccess,
    serverError,
    handleChange,
    handleSubmit,
    handleInvalid,
    handleInput,
    resetForm
  };
};