interface Props {
  setError: (value: boolean) => void
}

export const ModalError = ({ setError }: Props) => {
  return (
    <div className='fixed w-96 h-64 bg-white flex flex-col items-center justify-center border top-1/2 -translate-y-1/2'>
      <div>Упс! Что- то пошло не так!</div>
      <button 
        onClick={() => setError(false)} 
        className='mt-2 p-2 border'>
        Закрыть
      </button>
    </div>
  )
}
