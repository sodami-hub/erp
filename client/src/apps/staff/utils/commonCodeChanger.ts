import * as T from '../types';

/*
export type AllCommonCode = {
  ok: boolean;
  work_status: string[];
  work_type: string[];
  work_list: string[];
  errorMessage: string;
};
 */

export const changeAllSubCodeToCodeName = (commonCode: T.AllCommonCode) => {
  let codeNameCommonCode: T.AllCommonCode = {
    ok: true,
    work_status: commonCode.work_status.map(
      value => T.CommonCodeToCodeName[parseInt(value)]
    ),
    work_type: commonCode.work_type.map(value => T.CommonCodeToCodeName[parseInt(value)]),
    work_list: commonCode.work_list.map(value => T.CommonCodeToCodeName[parseInt(value)]),
    errorMessage: ''
  };
  return codeNameCommonCode;
};
