import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

const NotFound = () => {

    const [sec,setSec] = useState(5)

    useEffect(() => {
        const timer = setTimeout(() => {
            if(sec > 0){
                setSec(prev => prev -1 )

            }else{
                clearTimeout(timer)
            }
            

        }, 1000);


    }, [sec])

  return (
    <>
    <h1>404 | Page Not Found</h1>
    <Link to="/"> Back to home page</Link>
    <h3>Redirecting you to Home page in {sec} seconds</h3>
    </>
  )
}

export default NotFound