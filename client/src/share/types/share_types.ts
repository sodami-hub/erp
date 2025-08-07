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

export type CommonCodeType = {
  subCode: string;
  codeName: string;
};
export type CommonCodeByGroup = {
  ok: boolean;
  listByGroup: CommonCodeType[];
  message: string;
};

export type AllCommonCodeResp = {
  ok: boolean;
  work_status: CommonCodeType[];
  work_type: CommonCodeType[];
  work_list: CommonCodeType[];
  errorMessage: string;
};

export type CommonCodeListType = {
  work_status: CommonCodeType[];
  work_type: CommonCodeType[];
  work_list: CommonCodeType[];
};
