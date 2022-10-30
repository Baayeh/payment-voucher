import React from 'react'
import { Outlet } from 'react-router-dom'

const root = () => {
  return (
    <main>
      <Outlet />
    </main>
  )
}

export default root
