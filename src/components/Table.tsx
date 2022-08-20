import React, { useEffect, useState } from "react";
import { Space, Table, TableProps, Tag } from "antd";
import { DataType } from "../pages/Index";

export type Columns = {
    title: string;
    dataIndex: string;
    key: string;
};

export type Data = {
    email: string;
};

type TableCompoinentProps = {
    columns: Array<DataType[]>;
    data: Array<DataType>;
    onClickItem: (email: string) => void;
};
const pagination: TableProps<any>["pagination"] = {
    position: ["topLeft"],
};

type TablePaginationPosition =
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight";

const TableComponent = ({
    columns,
    data,
    totalRecords,
    current,
    onClickItem,
    onChangeItem
}: any) => {
    const [top, setTop] = useState<TablePaginationPosition>("topLeft");
    const [bottom, setBottom] = useState<TablePaginationPosition>("bottomRight");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    console.log(totalRecords)
    console.log(current)


    return (
        <div className="flex flex-col justify-center h-screen py-2">
            <Table
                rowKey="id"
                columns={columns}
                dataSource={data}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            onClickItem(record);

                        },
                    };
                }}
                rowClassName={(record, index) => {
                    return "cursor-pointer";
                }}
                className="w-full h-full"
                pagination={{
                    current: current,
                    pageSize: 10,
                    total: totalRecords,
                    onChange: (page, pageSize) => {
                        onChangeItem(page)
                        console.log(page)
                        // setPage(page);
                        // setPageSize(pageSize);
                    },
                }}
            // pagination={{
            //   current: page,
            //   pageSize: pageSize,
            //   onChange: (page, pageSize) => {
            //     setPage(page);
            //     setPageSize(pageSize);
            //   },
            // }}
            />
        </div>
    );
};

export default TableComponent;
