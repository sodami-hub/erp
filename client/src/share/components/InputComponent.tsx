import * as T from '../types'
import {InputHTMLAttributes} from "react";

type InputProps = T.InputComponentType & InputHTMLAttributes<HTMLInputElement>

export const InputComponent = (props: InputProps) => {
  return (
      <input {...props} />
  );
};