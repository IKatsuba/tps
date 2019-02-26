import React, { InputHTMLAttributes, ReactNode } from "react";
import './TextField.scss';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  postfix?: ReactNode;
}

export function TextField({ label, id, className = '', postfix, ...inputProps }: TextFieldProps) {
  return (
    <div className={`input-wrapper ${className}`}>
      <label className="secondary-text" htmlFor={id}>
        {label}
      </label>
      <div className="input">
        <input id={id} {...inputProps}/>
        {postfix ? <div className="input--postfix">{postfix}</div> : null}
      </div>
    </div>
  );
}
