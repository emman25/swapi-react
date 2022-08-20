import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import DetailsItem from '../components/DetailsItem';

interface DataType {
    name: string;
    height: string;
    mass: string;
    gender: string;
    homeworld: string;

}

const Detail = () => {
    const [data, setData] = useState<DataType>()
    let location = useLocation()
    
    useEffect(() => {
        if(location.state){
            setData(location.state as DataType)
        }
    }, [location])

    let navigate = useNavigate()
    return (
        <Container>
            <button className='text-2xl bg-slate-600 text-white px-4 py-3' onClick={() => navigate(-1)}>
                Back
            </button>
            
            {DetailsItem({label: 'name', value: data?.name || ""})}

            {DetailsItem({label: 'height', value: data?.height || ""})}

            {DetailsItem({label: 'mass', value: data?.mass || ""})}

            {DetailsItem({label: 'gender', value: data?.gender || ""})}

            {DetailsItem({label: 'homeworld', value: data?.homeworld || ""})}


        </Container>
    )
}

export default Detail


