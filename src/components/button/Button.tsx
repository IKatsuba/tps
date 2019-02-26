import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.scss';

export enum ButtonTypes {
  Primary = 'primary',
  Secondary = 'secondary'
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  label: ReactNode;
  styleType?: ButtonTypes;
  href?: typeof HTMLAnchorElement.prototype.href;
  target?: typeof HTMLAnchorElement.prototype.target;
}

export function Button({
                         href,
                         label,
                         styleType = ButtonTypes.Secondary,
                         className = '',
                         ...buttonProps
                       }: ButtonProps) {
  const Root = !!href ? 'a' : 'button';

  return (
    <Root className={`button ${styleType} ${className}`} href={href} {...buttonProps}>
      <span className="button-text">{label}</span>
    </Root>
  );
}
