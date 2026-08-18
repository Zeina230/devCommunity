import React from 'react'

const Footer = () => {
  return (
    <footer className="border-b border-cyan-200 bg-black/80 backdrop-blur">
        <nav className="max-w-6xl max-auto px-6 py-4 flex items-center justify-between">
            <p className="max-w-6xl max-auto px-6 text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Community platform</p>
        </nav>
    </footer>
  )
}

export default Footer