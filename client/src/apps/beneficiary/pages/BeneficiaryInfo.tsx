import {ChangeEvent, useEffect, useState} from 'react';
import {useToggle} from '../../../share/hooks';
import {RegisterModal, RegisterModalContents} from './RegisterModal';

export default function BeneficiaryInfo() {
  const [beneficiaryListStatus, setBeneficiaryListStatus] = useState<
    'all' | 'inSupply' | 'consulting' | 'expiration' | 'termination'
  >('all');

  useEffect(() => {
    const $buttons = document.getElementsByName('BeneficiaryStatusBtn');
    $buttons.forEach(
      node =>
        (node.className =
          node.id === beneficiaryListStatus
            ? node.className + ' underline underline-offset-4'
            : node.className.replace(' underline underline-offset-4', ''))
    );
  }, [beneficiaryListStatus]);

  const [beneficiaryInfoStatus, setBeneficiaryInfoStatus] = useState<
    'basic' | 'evaluation' | 'contract' | 'record'
  >('basic');

  useEffect(() => {
    const $buttons = document.getElementsByName('beneficiaryInfoStatusBtn');
    $buttons.forEach(
      node =>
        (node.className =
          node.id === beneficiaryInfoStatus
            ? node.className + ' underline underline-offset-4'
            : node.className.replace(' underline underline-offset-4', ''))
    );
  }, [beneficiaryInfoStatus]);

  const [searchValue, setSearchValue] = useState<string>('');
  const changedSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const [RegisterModalOpen, RegisterModalToggle] = useToggle();

  return (
    <section className={'flex flex-row w-full h-full'}>
      <div
        className={
          'flex flex-col justify-start items-center w-96 min-w-[310px] max-w-[310px] border-r-2 border-black bg-gray-200 h-[100%]'
        }>
        <div className={'w-[96%]'}>
          <div className={'flex flex-row items-center justify-between my-1'}>
            <button
              className={'m-0.5 btn btn-accent w-[45%]'}
              onClick={() => {
                RegisterModalToggle();
              }}>
              신규 수급자 등록
            </button>
            <RegisterModal open={RegisterModalOpen}>
              <div className={'bg-gray-200 w-[65%] rounded-lg relative min-w-[875px]'}>
                <RegisterModalContents onCloseIconClicked={RegisterModalToggle} />
              </div>
            </RegisterModal>
            <button
              className={'m-0.5 btn btn-primary w-[48%] bg-amber-800'}
              onClick={() => {}}>
              롱텀에서 불러오기
            </button>
          </div>
          <div className={'flex flex-row items-center justify-between w-full mb-1.5'}>
            <button
              id={'all'}
              name={'BeneficiaryStatusBtn'}
              className={'btn w-[56px] p-2 bg-blue-700 text-white text-xs'}
              onClick={() => {
                setBeneficiaryListStatus('all');
              }}>
              전체
            </button>
            <button
              id={'inSupply'}
              name={'BeneficiaryStatusBtn'}
              className={'btn w-[60px] p-1 bg-white text-black text-xs'}
              onClick={() => {
                setBeneficiaryListStatus('inSupply');
              }}>
              수급중
            </button>
            <button
              id={'consulting'}
              name={'BeneficiaryStatusBtn'}
              className={'btn w-[60px] p-1 bg-white text-black text-xs'}
              onClick={() => {
                setBeneficiaryListStatus('consulting');
              }}>
              상담중
            </button>
            <button
              id={'expiration'}
              name={'BeneficiaryStatusBtn'}
              className={'btn w-[56px] p-2 bg-white text-black text-xs'}
              onClick={() => {
                setBeneficiaryListStatus('expiration');
              }}>
              만료
            </button>
            <button
              id={'termination'}
              name={'BeneficiaryStatusBtn'}
              className={'btn w-[56px] p-2 bg-white text-black text-xs'}
              onClick={() => {
                setBeneficiaryListStatus('termination');
              }}>
              해지
            </button>
          </div>
          <div className={'flex flex-row w-full'}>
            <input
              type={'text'}
              className={'w-3/4 input text-white'}
              value={searchValue}
              onChange={changedSearchValue}
            />
            <button
              type={'submit'}
              className={'btn btn-primary w-1/4 ml-0.5'}
              onClick={() => {}}>
              검색
            </button>
          </div>
        </div>
        <div className={'mt-3.5 w-full'}>
          <h2 className={'text text-black'}>Beneficiary List</h2>
          {/*<BeneficiaryList status={beneficiaryListStatus} getStaffId={getBeneficiaryInfo} />*/}
        </div>
      </div>
      {beneficiaryInfoStatus && (
        <div className={'flex flex-col w-[95%] bg-gray-200'}>
          <div className={'flex flex-row items-center justify-between m-1 bg-gray-200'}>
            <div className={''}>
              <button
                name={'beneficiaryInfoStatusBtn'}
                id={'basic'}
                className={'btn btn-secondary'}
                onClick={() => {
                  setBeneficiaryInfoStatus('basic');
                }}>
                기본정보
              </button>
              <button
                name={'beneficiaryInfoStatusBtn'}
                id={'evaluation'}
                className={'btn btn-secondary'}
                onClick={() => {
                  setBeneficiaryInfoStatus('evaluation');
                }}>
                기초평가
              </button>
              <button
                name={'beneficiaryInfoStatusBtn'}
                id={'contract'}
                className={'btn btn-secondary'}
                onClick={() => {
                  setBeneficiaryInfoStatus('contract');
                }}>
                계약 관리
              </button>
              <button
                name={'beneficiaryInfoStatusBtn'}
                id={'record'}
                className={'btn btn-secondary'}
                onClick={() => {
                  setBeneficiaryInfoStatus('record');
                }}>
                업무 수행 일지
              </button>
            </div>
            <button className={'btn btn-primary'}>문서 목록</button>
          </div>
          {/*{BeneficiaryInfoStatus && beneficiaryDetail && (*/}
          {/*  <BeneficiaryDetailsView beneficiaryDetail={beneficiaryDetail} />*/}
          {/*)}*/}
        </div>
      )}
    </section>
  );
}
