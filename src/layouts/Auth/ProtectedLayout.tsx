import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useOutlet } from 'react-router-dom'
import { auth } from '../../firebase';
// import { useAppSelector } from '../../store/useRedux'
import SuspenseLoader from './SuspenseLoader'

export const ProtectedLayout = () => {
  // const { token } = useAppSelector((state) => state.auth)
  const [user, loading] = useAuthState(auth);

  const outlet = useOutlet()

  if (loading) return <SuspenseLoader />

  if (!user) return <Navigate to="/login" />

  return <>{outlet}</>
}
