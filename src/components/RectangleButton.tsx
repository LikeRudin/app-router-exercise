"use client";

import type { ButtonHTMLAttributes } from "react";

import { useFormStatus } from "react-dom";

interface IFormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const RectangleButton = ({ text, ...rest }: IFormButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      className="h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
      disabled={pending}
      {...rest}
    >
      {pending ? "로딩 중" : text}
    </button>
  );
};
export default RectangleButton;
