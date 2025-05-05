import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const CustomLink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to)
  let match = useMatch({ path: resolved.pathname, end: true })
  return (
    <div>
      <Link 
        className={`transition-colors ${match ? 'text-blue-500' : 'text-gray-300 hover:text-white'}`}
        to={to} 
        {...props}
      >
        {children}
      </Link>
    </div>
  )
}

export default CustomLink