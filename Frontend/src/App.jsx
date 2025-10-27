import React from 'react'
import AppRoutes from './routes/AppRoutes.jsx'
import UserContext, { UserProvider } from './context/userContext.jsx'

const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App