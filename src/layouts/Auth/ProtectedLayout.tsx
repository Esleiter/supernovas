import { Navigate, useOutlet } from 'react-router-dom'
import { useAppSelector } from '../../store/useRedux'
// import SuspenseLoader from './SuspenseLoader'

export const ProtectedLayout = () => {
  const { token } = useAppSelector((state) => state.auth)

  const outlet = useOutlet()

//   if (loading) return <SuspenseLoader />

  if (!token) return <Navigate to="/login" />

  return <>{outlet}</>
}
