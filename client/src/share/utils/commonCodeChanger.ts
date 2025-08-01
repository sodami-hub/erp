import * as T from '../types';

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

export const changeCodeNameToSubCode = (codeNames: string[]): string[] => {
  return codeNames.map(
    value =>
      Object.keys(T.CommonCodeToCodeName).find(
        key => T.CommonCodeToCodeName[parseInt(key)] === value
      ) ?? ''
  );
};

export const changeSubCodeToCodeName = (subCode: string | undefined): string => {
  if (!subCode) return '';
  return subCode
    .split(',')
    .map(value => T.CommonCodeToCodeName[parseInt(value)])
    .join(',');
};
