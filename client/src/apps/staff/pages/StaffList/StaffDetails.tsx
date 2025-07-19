import * as T from '../../types';
import {useEffect, useState} from 'react';
import {useAuth} from '../../../../share/auth/context';
import {useToggle} from '../../../../share/hooks';
import {AddCertModal, AddCertModalContents} from './AddCertModal';
import * as API from '../../api';

export const StaffDetails = ({staffDetail}: {staffDetail: T.GetStaffInfo}) => {
  const {jwt} = useAuth();

  const [addCertModalOpen, toggleAddCertModal] = useToggle(false);

  const [receiveCertificates, setReceiveCertificates] = useState<T.saveCertInfoRequest[]>(
    []
  );
  // staffDetail 이 변할 때마다 자격증 정보와 건강검진 통보서 정보 가져오기
  // 자격증정보에대한 api 구현
  useEffect(() => {
    (async (staffId: string) => {
      const certInfo = await API.loadStaffCertInfo(staffId);
      setReceiveCertificates(certInfo);
    })(staffDetail.staffId);
  }, [staffDetail]);

  const myCertificates = receiveCertificates?.map((value, index) => (
    <div
      key={index}
      className={
        'bg-gray-200 rounded w-full flex flex-col justify-center items-start m-2 p-2'
      }>
      <span>자격증 명(번호) : {value.certificateName}</span>
      <div className={'w-full flex flex-row justify-between items-center mt-2'}>
        <span>발급일 : {value.issueDate}</span>
        <span>발급기관 : {value.organization}</span>
      </div>
    </div>
  ));

  return (
    <div>
      <div className={'flex flex-row items-center justify-between m-1 p-1 bg-white'}>
        <h2 className={'text-2xl text-black bold'}>기본 정보</h2>
        <div className={''}>
          <button className={'btn btn-primary'}>희망이음 등록</button>
          <button className={'btn btn-primary'}>롱텀 등록</button>
          <button className={'btn btn-primary'}>업무상태변경신청</button>
        </div>
      </div>
      <div className={'bg-white m-1 px-1 pb-1'}>
        <table className={'table table-auto w-full text-black border-collapse'}>
          <tbody>
            <tr>
              <th>직원명</th>
              <td>{staffDetail.name}</td>
              <th>성별</th>
              <td>{staffDetail.gender}</td>
              <th>생년월일</th>
              <td>{staffDetail.birth}</td>
              <th>연락처(ID)</th>
              <td>{staffDetail.phone}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td colSpan={5}>{staffDetail.address}</td>
              <th>비밀번호</th>
              <td>****</td>
            </tr>
            <tr>
              <th>직종</th>
              <td colSpan={3}>{staffDetail.workType}</td>
              <th>이메일</th>
              <td colSpan={3}>{staffDetail.email}</td>
            </tr>
            <tr>
              <th>가능업무</th>
              <td colSpan={3}>{staffDetail.possibleWork}</td>
              <th>근무구분</th>
              <td>{staffDetail.contractStatus}</td>
              <th>근무상태</th>
              <td>{staffDetail.workStatus}</td>
            </tr>
            <tr>
              <th>입사일</th>
              <td>{staffDetail.joinDate}</td>
              <th>퇴사일</th>
              <td>{staffDetail.retireDate ?? '-'}</td>
              <th>부양가족</th>
              <td>{staffDetail.dependents ?? '0'}명</td>
              <th>W4C</th>
              <td>{staffDetail.w4c}</td>
            </tr>
            <tr>
              <th>휴직신청</th>
              <td></td>
              <th>가산,비가산</th>
              <td></td>
              <th>보험정보</th>
              <td colSpan={3}></td>
            </tr>
          </tbody>
        </table>
        <div className={'flex flex-row '}>
          <div className={'flex flex-col w-[50%] m-1 p-1'}>
            <div className={'flex flex-col w-full items-center justify-start text-black'}>
              <div className={'flex flex-row w-full items-center justify-start'}>
                <h2>자격증 정보</h2>
                <button
                  className={'btn btn-circle bg-white size-5 ml-2'}
                  onClick={() => toggleAddCertModal()}>
                  <span className={'material-icons text-xl text-black'}>add</span>
                </button>
              </div>
              {receiveCertificates && <>{myCertificates}</>}
            </div>
            <AddCertModal open={addCertModalOpen}>
              <AddCertModalContents
                modalToggle={toggleAddCertModal}
                id={staffDetail.staffId}
              />
            </AddCertModal>
          </div>
          <div className={'flex flex-col w-[50%] m-1 p-1'}>
            <div className={'flex flex-row items-center justify-start text-black'}>
              <h2>건강검진 통보서</h2>
              <button className={'btn btn-circle bg-white size-5 ml-2'}>
                <span className={'material-icons text-xl text-black'}>add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
