import * as T from "../types";
import {ReactDivProps} from "../types";
import {FC, useEffect, useRef, useState} from "react";

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

type FileAttachmentContentsProps = ReactDivProps & {
  componentName:string;
  toggle: ()=> void;
  setMaterials:(data:FormData|undefined)=>void;
  reset:boolean;
}

export const FileAttachmentContents: FC<FileAttachmentContentsProps> = ({
  componentName,
  toggle,
  setMaterials,
  reset
})=> {
  const [document, setDocument] = useState<T.FileAttachmentDataType[] | undefined>([])
  const initialInputs = [0];
  const [inputs, setInputs] = useState<number[]>(initialInputs)

  const ref01 = useRef<HTMLInputElement>(null);
  const ref02=useRef<HTMLInputElement>(null);



  const addInput = () => {
    setInputs(prev => [...prev, prev.length]);
    setDocument(prev=>[...(prev ?? []),{
      documentName:'',
      document:undefined,
    }])
  }

  const inputComponent =(index:number)=> (
    <div key={index} className={'flex flex-row justify-center items-center'}>
      <input onChange={e=>{
                changed(e.target.name, e.target.files && e.target.files[0] ? e.target.files[0] : undefined)
              }}
              name={'file-'+index}
              type={'file'}
              className={'file-input bg-white border-black m-2'}
              accept={'image/*'}
              ref={ref01}
      />
      <input onChange={e=>changed(e.target.name, e.target.value)}
              name={'name-'+index}
              type={'text'}
              className={'input input-accent bg-white'}
              ref={ref02}
              placeholder={'서류의 이름[(예시)성명_서류명)]'}
      />
    </div>
  )

  const changed = (name:string, value:File | string | undefined) => {
    const [prefix,index] = name.split('-');
    switch (prefix) {
      case 'file':
        setDocument(prev=>{
          if (!prev) return prev;
          const newDocs = [...prev];
          newDocs[Number(index)] = {
            ...newDocs[Number(index)],
            document: value as File
          };
          return newDocs;
        })
        break;
      case 'name':
        setDocument(prev=>{
          if(!prev) return prev;
          const newDocs = [...prev];
          newDocs[Number(index)] = {
            ...newDocs[Number(index)], documentName:value as string  // index 위치의 객체를 복사해서 documentName 필드의 값을 덮어씌움
          };
          return newDocs;
        })
        break;
    }
  }

  const submit = ()=> {
    const formData = new FormData();
    if(document) {
      document.forEach((doc)=>{
        if(doc.document) {
          formData.append(`document`,doc.document, doc.documentName || doc.document.name)
        }
      })
    }
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    setMaterials(formData)
    toggle();
  }

  const cancel = () => {
    setInputs(initialInputs)
    setDocument([])
    if (ref01.current) {
      const inputs = ref01.current.parentElement?.parentElement?.querySelectorAll('input[type="file"]');
      if (inputs) {
        inputs.forEach(input => {
          (input as HTMLInputElement).value = '';
        });
      }
    }
    if (ref02.current) ref02.current.value='';
    setMaterials(undefined)
    toggle()
  }

  useEffect(() => {
    setDocument([])
    if (ref01.current) {
      const inputs = ref01.current.parentElement?.parentElement?.querySelectorAll('input[type="file"]');
      if (inputs) {
        inputs.forEach(input => {
          (input as HTMLInputElement).value = '';
        });
      }
    }
    if (ref02.current) ref02.current.value='';
    setMaterials(undefined)
  }, [reset]);

  return (
      <div className={'relative w-[40%] min-w-[500px]'}>
        <button className={"btn btn-sm btn-circle border-white bg-white text-black absolute right-6 top-1 cursor-pointer"} onClick={toggle}>✕</button>
        <div className={'flex flex-col justify-center items-center bg-white text-black rounded-box'}>
          <span className={'mt-2 ml-2 mr-2 mb-1 text-lg'}>{componentName}</span>
          {inputs.map((idx)=>inputComponent(idx))}
          <button type={'button'} className={'btn btn-circle material-icons m-2 '}
            onClick={addInput}>
            add
          </button>
          <div className={'flex flex-row justify-center items-center'}>
            <button type={'submit'} className={'btn btn-secondary m-2'} onClick={submit}>확인</button>
            <button type={'reset'} className={'btn btn-secondary m-2'} onClick={cancel}>취소</button>
          </div>
        </div>
      </div>
  )
}

