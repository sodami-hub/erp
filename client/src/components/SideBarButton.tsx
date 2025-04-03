import {FC, DetailedHTMLProps, ButtonHTMLAttributes, PropsWithChildren} from "react";

export type ReactButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type ButtonProps = ReactButtonProps & {
  buttonName:string
  iconName:string
}

export const SideBarButton: FC<PropsWithChildren<ButtonProps>> = ({
  className: _className,
  buttonName,
  iconName,
  ...buttonProps
}) => {
  const className = ['btn','flex','justify-between','w-full','bg-gray','border','border-white','h-8','text-xs', _className].join(' ')
  return <button className={className} {...buttonProps}>{buttonName}<span className={'material-icons'}>{iconName}</span></button>
}