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

// type CustomResponse = Record<string, unknown>;

export type ResponseType<T> = {
  ok: boolean;
  status: string;
  message: string;
  data: T;
};

export type CommonCode = {
  ok: boolean;
  groupName: string;
  codeNames: string[];
};

export type AllCommonCode = {
  ok: boolean;
  work_status: string[];
  work_type: string[];
  work_list: string[];
  errorMessage: string;
};

export enum CommonCodeToCodeName {
  센터장 = 201,
  사회복지사,
  요양보호사,
  목욕관리자,
  간호사,
  요양 = 301,
  목욕,
  간호,
  치매관리,
  상담서비스,
  대기 = 401,
  근무,
  휴직,
  퇴사 = 405
}
