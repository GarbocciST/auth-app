

export const ErrMsg = ({errorMessage}) => {
  return (
    <>
    {!!errorMessage && <span className="alert alert-danger d-block mt-2">{errorMessage}</span>}
    </>
    
  )
}
