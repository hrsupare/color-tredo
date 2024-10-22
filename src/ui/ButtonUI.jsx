import { Button } from "@material-tailwind/react"
// eslint-disable-next-line react/prop-types
const ButtonUI = ({children,onClick}) => {
  return (
    <Button className="bg-deep-purple-700" onClick={onClick} >{children}</Button>
  )
}

export default ButtonUI
