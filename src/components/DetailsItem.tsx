import React from 'react'

const DetailsItem = ({ label, value }: { label: string, value: string }) => {
    return <div className='bg-gray-50 flex space-x-4 items-center p-4'>
        <div className='text-2xl font-light capitalize w-2/12'>
            {label}
        </div>
        <div className='text-4xl'>
            {value}
        </div>
    </div>;
}

export default DetailsItem