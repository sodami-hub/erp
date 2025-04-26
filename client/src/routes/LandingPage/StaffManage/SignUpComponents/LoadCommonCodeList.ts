import {get} from '../../../../server';

export type CommonCode = {
  authList: string[];
  workTypeList: string[];
  workList: string[];
  workStatusList: string[];
};

export const loadCommonCodeList = async (jwt?: object) => {
  const resp = await get('/commonCodeList', jwt);
  const result: CommonCode = await resp.json();
  if (!result) {
    throw new Error('Failed to load common code list');
  }
  console.log('loadCommonCodeList', result);
  return result;
};
