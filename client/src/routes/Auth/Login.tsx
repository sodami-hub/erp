import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context';

/*
{
  organizationId: string;
  id: string;
  password: string;
}
 */
type LoginFormType = Record<'organizationId' | 'id' | 'password', string>;
const initialFormState = {organizationId: '', id: '', password: ''};

export default function Login() {
  const [{organizationId, id, password}, setForm] =
    useState<LoginFormType>(initialFormState);

  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}));
    },
    []
  );

  const navigate = useNavigate();
  const {login} = useAuth();
  const loginAccount = useCallback(() => {
    console.log(organizationId, id, password);
    login(organizationId, id, password, () => navigate('/index'));
  }, [id, password, organizationId, login]);

  // 저장된 로그인 데이터가 있으면 불러와서 form에 넣기
  useEffect(() => {}, []);

  return (
    <div className={'w-screen h-screen bg-white m-2 border-2 border-gray-800'}>
      <div className={'w-full h-10 border-b border-gray-800'}></div>
      <div
        className={'h-full w-full bg-gray-200 flex flex-col justify-center items-center'}>
        <div className={'bg-gray-500 text-3xl text-center w-1/5 h-1/4 mb-8'}>로고</div>

        <div className={'w-1/3 px-6 py-8 text-gray-400 bg-white rounded shadow-md'}>
          <h1 className={'mb-8 text-2xl text-center text-primary'}>Login</h1>
          <input
            type={'text'}
            className={'w-full p-3 mb-4 input input-primary'}
            name={'organizationId'}
            placeholder={'요양기관번호'}
            value={organizationId}
            onChange={changed('organizationId')}
          />
          <input
            type={'text'}
            className={'w-full p-3 mb-4 input input-primary'}
            name={'id'}
            placeholder={'아이디'}
            value={id}
            onChange={changed('id')}
          />
          <input
            type={'password'}
            className={'w-full p-3 mb-4 input input-primary'}
            name={'password'}
            placeholder={'비밀번호'}
            value={password}
            onChange={changed('password')}
          />
          <button
            type={'submit'}
            className={'w-1/2 ml-28 btn btn-primary'}
            onClick={loginAccount}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
