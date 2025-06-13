import {DetailedHTMLProps, HTMLAttributes} from 'react';

export type ReactDivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type ModalProps = ReactDivProps & {
  open?: boolean;
};

export type ModalContentProps = ReactDivProps & {
  onCloseIconClicked: () => void;
  closeIconClassName?: string;
};
