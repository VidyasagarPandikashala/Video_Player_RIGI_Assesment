import { Outlet } from 'react-router-dom'

import NavBar from './ui/shared-components/navbar/NavBar'

const Root = () => {
  // console.log(movieDetailArray);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
export default Root
