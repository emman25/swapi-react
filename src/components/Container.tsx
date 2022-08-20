import React from 'react'

const Container = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='p-20 space-y-4'>
            {children}
        </div>
    )
}

export default Container