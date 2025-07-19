# erp

## ERD
https://www.erdcloud.com/d/ceT6uPmCdTx6LMRr2

## Tech Stack
- **Frontend**: React, TypeScript, Redux, Axios
- **Backend**: Java, Spring Boot, JPA, mysql

## Project Structure
```
📦client[application]
 ┣ 📂public
 ┗ 📂src
   ┣ 📂 components   # 공통 컴포넌츠
   ┣ 📂 context      # 컨텍스트. 현재는 사용자 정보(로그인, 권한, jwt 등) (AuthContext.tsx)
   ┣ 📂 hooks        # 사용자 커스텀 훅
   ┣ 📂 routes       # 라우터
   ┣ 📂 server       # 서버 통신 관련
   ┣ 📂 store        # 리덕스
   ┣ 📂 types        # 타입 정의
   ┗ 📂 utils        # 유틸리티 함수
   
# 서버 사이드는 굵직한 기능별로 모듈로 나눴습니다.
📦server
 ┃
 ┣ 📂beneficiary-management              # 수급자 관리/관련 API
 ┃ ┗ 📂com.erp.beneficiarymanagement
 ┃   ┗ 📂beneficiary_management
 ┃
 ┣ 📂common-util                         # 공통 유틸리티 API
 ┃ ┗ 📂com.erp.commonutil
 ┃   ┣ 📂config
 ┃   ┣ 📂jwt
 ┃   ┗ 📂util
 ┃
 ┗ 📂staff-management                    # 직원 관리/관련 API
   ┗ 📂com.erp.staffmanagement
     ┗ 📂staff_management
```

## DB
### 테이블 생성 SQL
#### 직원 관련 테이블
```mysql
create table institutions (
    institution_id varchar(20) primary key, # 대표번호 뒤 4자리 + 사업자 번호 앞 3자리
    institution_name varchar(255) not null,
    business_id varchar(20),
    rep_name varchar(20),
    rep_phone varchar(20),
    rep_email varchar(50),
    rep_fax varchar(20),
    address varchar(255),
    website varchar(100),
    created_at timestamp default current_timestamp,
    creator_id varchar(20),
    updated_at timestamp default current_timestamp on update current_timestamp,
    updater_id varchar(20)
);

create table staffs (
    staff_id int primary key auto_increment,
    institution_id varchar(20) not null, # 대표번호 뒤 4자리 + 사업자 번호 앞 3자리 <외래키>
    name varchar(20) not null,
    gender varchar(3), # 남/여
    birth date, # date type -> YYYY-MM-DD
    phone varchar(20), # 로그인 id 로 사용
    password varchar(20), # 로그인 비밀번호 - 전화번호 뒤 4자리
    email varchar(50),
    address varchar(255),
    join_date date,
    contract_status varchar(10), # 계약직 / 정규직
    retire_date date,
    dependents varchar(2), # 부양가족 수 0~9
    w4c varchar(20), # W4C 등록번호
    auth_id varchar(20), # 공통코드 -> 권한(auth) 그룹
    possible_work varchar(20), # 공통코드 -> 업무 목록(work_list) 그룹
    work_type varchar(20), # 공통코드 -> 직종(work_type) 그룹
    work_status varchar(20), # 공통코드 -> 근무 상태(work_status) 그룹
    created_at timestamp default current_timestamp,
    creator_id varchar(20),
    updated_at timestamp default current_timestamp on update current_timestamp,
    updater_id varchar(20)
);


create table common_codes (
    group_name varchar(20) not null, # 공통코드 그룹 이름
    sub_code varchar(20) not null, # 각 그룹의 서브 코드 번호
    code_name varchar(50) not null, # 서브 코드의 이름
    created_at timestamp default current_timestamp,
    creator_id varchar(20),
    updated_at timestamp default current_timestamp on update current_timestamp,
    updater_id varchar(20),
    primary key (group_name, sub_code) # 복합키 설정
);

# 부양가족 관련 첨부 문서 //
create table documents (
    document_id int primary key auto_increment,
    staff_id int not null, # 직원 고유번호
    original_name varchar(50) not null, # 원본 문서 이름
    save_name varchar(255) not null, # 저장된 문서 이름
    created_at timestamp default current_timestamp,
    creator_id varchar(20),
    updated_at timestamp default current_timestamp on update current_timestamp,
    updater_id varchar(20)
);

# 자격증 관련 정보 및 문서 정보
create table certificates (
    certificate_id int primary key auto_increment,
    staff_id int not null, # 직원 고유번호
    certificate_name varchar(50) not null, # 자격증 이름
    organization varchar(50) not null, # 발급 기관
    issue_date date, # 발급일
    original_name varchar(50), # 원본 문서 이름
    save_name varchar(255), # 저장된 문서 이름
    created_at timestamp default current_timestamp,
    creator_id varchar(20),
    updated_at timestamp default current_timestamp on update current_timestamp,
    updater_id varchar(20)
);
```

### 테이블 생성 SQL
#### 직원 관련 테이블 (2025.07.05)
```postgresql
-- 기관 테이블
CREATE TABLE users.institutions (
    institution_id VARCHAR(10) PRIMARY KEY, -- 대표번호 뒤 4자리 + 사업자 번호 앞 3자리
    institution_name VARCHAR(255) NOT NULL,
    business_id VARCHAR(20),
    rep_name VARCHAR(20),
    rep_phone VARCHAR(20),
    rep_email VARCHAR(50),
    rep_fax VARCHAR(20),
    address VARCHAR(255),
    website VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creator_id VARCHAR(20),
    updated_at TIMESTAMP,
    updater_id VARCHAR(20)
);

COMMENT ON COLUMN users.institutions.institution_id IS '요양기관번호';
COMMENT ON COLUMN users.institutions.institution_name IS '요양기관이름';
COMMENT ON COLUMN users.institutions.business_id IS '사업자번호';
COMMENT ON COLUMN users.institutions.rep_name IS '대표자';
COMMENT ON COLUMN users.institutions.rep_phone IS '대표번호';
COMMENT ON COLUMN users.institutions.rep_email IS '대표이메일';
COMMENT ON COLUMN users.institutions.rep_fax IS '대표팩스';
COMMENT ON COLUMN users.institutions.address IS '주소';
COMMENT ON COLUMN users.institutions.website IS '홈페이지';
COMMENT ON COLUMN users.institutions.created_at IS '생성일시';
COMMENT ON COLUMN users.institutions.creator_id IS '생성자';
COMMENT ON COLUMN users.institutions.updated_at IS '수정일시';
COMMENT ON COLUMN users.institutions.updater_id IS '수정자';

-- 직원 테이블
CREATE TABLE users.staffs (
    staff_id SERIAL PRIMARY KEY, -- 자동 증가
    institution_id VARCHAR(10) NOT NULL ,
    name VARCHAR(20) NOT NULL,
    gender VARCHAR(3), -- 남/여
    birth DATE,
    phone VARCHAR(20), -- 로그인 ID
    password VARCHAR(60), -- 로그인 비밀번호 (전화번호 뒤 4자리)
    email VARCHAR(50),
    address VARCHAR(255),
    join_date DATE,
    contract_status VARCHAR(10), -- 계약직 / 정규직
    retire_date DATE,
    dependents VARCHAR(2), -- 부양가족 수 (0~9)
    w4c VARCHAR(20), -- W4C 등록번호
    auth_id VARCHAR(20), -- 공통코드 (권한 그룹)
    possible_work VARCHAR(20), -- 공통코드 (업무 목록 그룹)
    work_type VARCHAR(20), -- 공통코드 (직종 그룹)
    work_status VARCHAR(20), -- 공통코드 (근무 상태 그룹)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creator_id VARCHAR(20),
    updated_at TIMESTAMP,
    updater_id VARCHAR(20)
);

COMMENT ON COLUMN users.staffs.staff_id IS '직원번호';
COMMENT ON COLUMN users.staffs.institution_id IS '요양기관번호';
COMMENT ON COLUMN users.staffs.name IS '이름';
COMMENT ON COLUMN users.staffs.gender IS '성별';
COMMENT ON COLUMN users.staffs.birth IS '생년월일';
COMMENT ON COLUMN users.staffs.phone IS '전화번호(로그인 ID)';
COMMENT ON COLUMN users.staffs.password IS '비밀번호';
COMMENT ON COLUMN users.staffs.email IS '이메일';
COMMENT ON COLUMN users.staffs.address IS '주소';
COMMENT ON COLUMN users.staffs.join_date IS '입사일';
COMMENT ON COLUMN users.staffs.contract_status IS '근무구분(0:계약직, 1:정규직)';
COMMENT ON COLUMN users.staffs.retire_date IS '퇴사일';
COMMENT ON COLUMN users.staffs.dependents IS '부양가족';
COMMENT ON COLUMN users.staffs.w4c IS 'w4x';
COMMENT ON COLUMN users.staffs.auth_id IS '권한';
COMMENT ON COLUMN users.staffs.possible_work IS '가능업무';
COMMENT ON COLUMN users.staffs.work_type IS '직종';
COMMENT ON COLUMN users.staffs.work_status IS '근무상태';
COMMENT ON COLUMN users.staffs.created_at IS '생성일시';
COMMENT ON COLUMN users.staffs.creator_id IS '생성자';
COMMENT ON COLUMN users.staffs.updated_at IS '수정일시';
COMMENT ON COLUMN users.staffs.updater_id IS '수정자';


-- 공통 코드 테이블
CREATE TABLE users.common_codes (
    group_name VARCHAR(20) NOT NULL, -- 공통코드 그룹 이름
    sub_code VARCHAR(20) NOT NULL, -- 그룹 내 서브코드
    code_name VARCHAR(50) NOT NULL, -- 서브코드명
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creator_id VARCHAR(20),
    updated_at TIMESTAMP,
    updater_id VARCHAR(20),
    PRIMARY KEY (group_name, sub_code)
);

COMMENT ON COLUMN users.common_codes.group_name IS '그룹이름';
COMMENT ON COLUMN users.common_codes.sub_code IS '서브코드';
COMMENT ON COLUMN users.common_codes.code_name IS '코드이름';
COMMENT ON COLUMN users.common_codes.created_at IS '생성일시';
COMMENT ON COLUMN users.common_codes.creator_id IS '생성자';
COMMENT ON COLUMN users.common_codes.updated_at IS '수정일시';
COMMENT ON COLUMN users.common_codes.updater_id IS '수정자';


-- 부양가족 관련 문서 테이블
CREATE TABLE users.documents (
    document_id SERIAL PRIMARY KEY,
    staff_id INT NOT NULL,
    original_name VARCHAR(50) NOT NULL,
    save_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creator_id VARCHAR(20),
    updated_at TIMESTAMP ,
    updater_id VARCHAR(20)
);

COMMENT ON COLUMN users.documents.document_id IS '직원번호';
COMMENT ON COLUMN users.documents.staff_id IS '직원번호';
COMMENT ON COLUMN users.documents.original_name IS '직원번호';
COMMENT ON COLUMN users.documents.save_name IS '직원번호';
COMMENT ON COLUMN users.documents.created_at IS '직원번호';
COMMENT ON COLUMN users.documents.creator_id IS '직원번호';
COMMENT ON COLUMN users.documents.updated_at IS '직원번호';
COMMENT ON COLUMN users.documents.updater_id IS '직원번호';

-- 자격증 테이블
CREATE TABLE users.certificates (
    certificate_id SERIAL PRIMARY KEY,
    staff_id INT NOT NULL,
    certificate_name VARCHAR(50) NOT NULL,
    organization VARCHAR(50) NOT NULL,
    issue_date DATE,
    original_name VARCHAR(50),
    save_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creator_id VARCHAR(20),
    updated_at TIMESTAMP,
    updater_id VARCHAR(20)
);

COMMENT ON COLUMN users.certificates.certificate_id IS '자격증아이디';
COMMENT ON COLUMN users.certificates.staff_id IS '직원번호';
COMMENT ON COLUMN users.certificates.certificate_name IS '자격증이름';
COMMENT ON COLUMN users.certificates.organization IS '발급기관';
COMMENT ON COLUMN users.certificates.issue_date IS '발급일';
COMMENT ON COLUMN users.certificates.original_name IS '원본파일명';
COMMENT ON COLUMN users.certificates.save_name IS '저장파일명';
COMMENT ON COLUMN users.certificates.created_at IS '생성일';
COMMENT ON COLUMN users.certificates.creator_id IS '생성자';
COMMENT ON COLUMN users.certificates.updated_at IS '수정일';
COMMENT ON COLUMN users.certificates.updater_id IS '수정자';
```

#### 수급자 관련 테이블
```mysql
create table beneficiaries (
    beneficiary_id bigint primary key auto_increment,
    institution_id varchar(20) not null, # 대표번호 뒤 4자리 + 사업자 번호 앞 3자리 <외래키>로 사용됨
    name varchar(50) not null,
    gender varchar(10),
    birth date,
    phone varchar(20),
    address text,
    RFID varchar(255),
    supply_status varchar(20), # 수급현황 : 수급중, 상담중, 해지, 만료
    self_payment_rate int, # 본인부담률
    under_disease varchar(255), # 기저질환
    receive_method varchar(255), # 수신방법
    recognition_number varchar(255), # 인정번호
    recognition_begin_date date, # 인정시작일
    recognition_end_date date, # 인정종료일
    recognition_level varchar(20), # 인정등급
    recognition_document varchar(255), #인정 서류 
    contract_date date, # 계약일
    contract_begin_date date, # 계약시작일
    contract_end_date date, # 계약종료일
    service_type varchar(255), # 서비스 : 요양, 목욕, 간병, ...?
    basic_evaluation varchar(255), # 기초평가
    this_month_plan text, # 이번달 계획
    next_month_plan text, # 다음달 계획
    supply_revelation_date date, # 급여계시일
    supply_start_date date, # 급여시작일
    supply_end_date date, # 급여종료일
    nursing_care_worker bigint, # (담당)요양보호사
    created_at timestamp default current_timestamp,
    creator_id varchar(20),
    updated_at timestamp default current_timestamp on update current_timestamp,
    updater_id varchar(20)
);
```