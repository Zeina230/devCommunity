import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <section>
        <div>
            <h1>404 - Page Not Found</h1>
            <Link href="/" className="border rounded bg-white text-black">Go Back Home</Link>
        </div>
    </section>
  )
}

export default NotFound