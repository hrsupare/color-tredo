import { Input } from "@material-tailwind/react";

const NumberInputForm = ({type,label,name}) => {
  return (
    <Input color="purple" type={type} label={label} name={name} />
  )
}

export default NumberInputForm