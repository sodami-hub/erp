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

export type ResponseType<T> = {
  ok: boolean;
  status: string;
  message: string;
  data: T;
};

export type GroupName = 'work_status' | 'work_type' | 'work_list';

export type commonCodeResp = {
  subCode: string;
  codeName: string;
};
export type CommonCodeByGroup = {
  ok: boolean;
  listByGroup: commonCodeResp[];
  message: string;
};

export type AllCommonCode = {
  ok: boolean;
  work_status: commonCodeResp[];
  work_type: commonCodeResp[];
  work_list: commonCodeResp[];
  errorMessage: string;
};
