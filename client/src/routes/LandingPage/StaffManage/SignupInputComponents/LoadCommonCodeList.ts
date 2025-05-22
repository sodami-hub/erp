import {get} from '../../../../server';

export type CommonCode = {
  ok: boolean;
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
  } else if (!result.ok) {
    // throw new Error('인증토큰이 유효하지 않습니다. 다시 로그인 해주세요.');
    // 새로고침 하고 jwt 토큰 다시 가져오는 시간이 걸림....
  }
  console.log('loadCommonCodeList', result);
  return result;
};
