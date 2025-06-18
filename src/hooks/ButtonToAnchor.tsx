import React from 'react';
import { useScrollToAnchor } from "../hooks/useScrollToAnchor";

interface ButtonToAnchorProps {
  anchor: string;
  children: React.ReactNode;
  className?: string;
  closeMenu?: () => void;
  offset?: number;
  navigationType?: 'anchor' | 'element';
  [key: string]: any;
}

const ButtonToAnchor: React.FC<ButtonToAnchorProps> = ({
  anchor,
  children,
  className = '',
  closeMenu,
  offset = 0,
  navigationType = 'element',
  ...props
}) => {
  const { navigateToAnchor, scrollToElement } = useScrollToAnchor();

  const handleClick = () => {
    if (navigationType === 'anchor') {
      navigateToAnchor(anchor, { offset });
    } else {
      scrollToElement(anchor, { offset });
    }

    closeMenu?.();
  };

  return (
    <button 
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonToAnchor;