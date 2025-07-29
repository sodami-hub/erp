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

type CustomResponse = Record<string, unknown>;

export type ResponseType<T extends CustomResponse> = {
  ok: boolean;
  status: string;
  message: string;
  data: T;
};
