import { Input } from 'antd'
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react'
import Container from '../components/Container';
import TableComponent from '../components/Table'
import { useNavigate } from "react-router-dom";
import { graphqlRequest, searchGraphqlRequest, setPageAction } from '../slices/main';
import { useAppDispatch, useAppSelector } from '../app/hooks';
let Search = Input.Search

export interface DataType {
    name: string;
    height: string;
    mass: string;
    gender: string;
    homeworld: string;
}

const Index = () => {
    const [data, setData] = useState<DataType[]>([])
    const columns: ColumnsType<DataType> = [
        {
            title: "Name",
            dataIndex: "name",
        }
    ];

    let dispatcher = useAppDispatch()
    let state = useAppSelector(state => state.main)
    const [searchTerm, setSearchTerm] = useState<String>("")

    useEffect(() => {
        let body = {
            "query":
                `query Query {
                    people (page: ${state.page}) {
                        count
                        results {
                            name
                            height
                            mass
                            gender
                            homeworld
                        }
                    }
              }`
        }


        dispatcher(
            graphqlRequest({
                data: body
            })
        )
    }, [searchTerm])


    useEffect(() => {
        console.log(searchTerm)
    }, [searchTerm])

    const onChangeTerm = () => {
        let body = {
            "query":
                `query Query {
                    search (text: "${searchTerm}") {
                        count
                        results {
                            name
                            height
                            mass
                            gender
                            homeworld
                        }
                    }
              }`
        }


        dispatcher(
            searchGraphqlRequest({
                data: body
            })
        )
    }

    const onChangeItem = (page) => {

        let body = {
            "query":
                `query Query {
                    people (page: ${page}) {
                        count
                        results {
                            name
                            height
                            mass
                            gender
                            homeworld
                        }
                    }
              }`
        }

        dispatcher(
            setPageAction(page)
        )

        dispatcher(
            graphqlRequest({
                data: body
            })
        )
    }

    useEffect(() => {
        if (state.data) {
            setData(state.data)
        }

    }, [state.data])

    let navigate = useNavigate()

    return (
        
        <Container>
            <div className='flex text-4xl font-bold uppercase justify-center'>
                swapi app
            </div>
            <Search value={`${searchTerm}`} onChange={(e) => setSearchTerm(e.target.value)} onSearch={() => onChangeTerm()} placeholder={"Search Person"} allowClear />


            {TableComponent({
                data: data, columns: columns, onClickItem: (record: DataType) => {
                    navigate("/details", { state: record })
                }, onChangeItem: (page) => onChangeItem(page), totalRecords: state.total, current: state.page
            })}

        </Container>
    )
}

export default Index