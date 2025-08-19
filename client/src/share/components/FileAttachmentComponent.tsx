import {ReactDivProps} from "../types";
import {FC, useState} from "react";

type FileAttachmentModalProps = ReactDivProps & {
  open:boolean
}

export const FileAttachmentModal: FC<FileAttachmentModalProps>= ({
  open,
  className:_className,
  ...props
}) => {
   const className = ['modal', open?'modal-open':'',_className].join(' ')

  return <div {...props} className={className}></div>
}

type FileAttachmentDataType = {
  documentName:string;
  document:File
}

type FileAttachmentContentsProps = ReactDivProps & {
  componentName:string;
  toggle: ()=> void;
  setMaterials:(data:FileAttachmentDataType[])=>void;
  reset:boolean;
}

export const FileAttachmentContents: FC<FileAttachmentContentsProps> = ({
  componentName,
  toggle

})=> {
  //const [document, setDocument] = useState<FileAttachmentDataType[] | undefined>(undefined)
  const initialInputs = [0];
  const [inputs, setInputs] = useState<number[]>(initialInputs)

  const addInput = () => {
    setInputs(prev => [...prev, prev.length]);
  }

  const inputComponent =(index:number)=> (
    <div key={index} className={'flex flex-row justify-center items-center'}>
      <input name={'file'+index} type={'file'} className={'file-input bg-white border-black m-2'} accept={'image/*'}/>
      <input name={'name'+index} type={'text'} className={'input input-accent bg-white'} placeholder={'첨부파일의 이름을 적어주세요'}/>
    </div>
  )

  const closeModal = () => {
    setInputs(initialInputs)
    toggle()
  }

  return (
      <div className={'relative w-[40%]'}>
        <button className={"btn btn-sm btn-circle border-white bg-white text-black absolute right-6 top-1 cursor-pointer"} onClick={()=>closeModal()}>✕</button>
        <div className={'flex flex-col justify-center items-center bg-white text-black rounded-box'}>
          <span className={'mt-2 ml-2 mr-2 mb-1 text-lg'}>{componentName}</span>
          {inputs.map((idx)=>inputComponent(idx))}
          <button type={'button'} className={'btn btn-circle material-icons m-2 '}
            onClick={addInput}>
            add
          </button>
          <button type={'submit'} className={'btn btn-secondary m-2'} onClick={()=>{}}>확인</button>
        </div>
      </div>
  )
}

