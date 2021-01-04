import React from 'react'
import { Container, Label, Row } from 'reactstrap'

import Accordion from '../../../../components/common/Accordion'
import { ReactTable, TableItem } from '../../../../components/tableCard'

const AlltableData = [
    {
        tableName: 'table 1',
        tableCoulmn: [
            { Header: 'Coulmn', accessor: 'coulmn', Cell: TableItem },
            { Header: 'PII Type Found', accessor: 'piitype', Cell: TableItem }
        ],
        tableData: [{
            'piitype': 'piitype1',
            'coulmn': 'coulmn1',
        },
        {
            'piitype': 'piitype2',
            'coulmn': 'coulmn3',
        },
        {
            'piitype': 'piitype3',
            'coulmn': 'coulmn2',
        }]
    },
    {
        tableName: 'table 2',
        tableCoulmn: [
            { Header: 'Coulmn', accessor: 'coulmn', Cell: TableItem },
            { Header: 'PII Type Found', accessor: 'piitype', Cell: TableItem }
        ],
        tableData: [{
            'piitype': 'piitype1',
            'coulmn': 'coulmn1',
        },
        {
            'piitype': 'piitype2',
            'coulmn': 'coulmn3',
        },
        {
            'piitype': 'piitype3',
            'coulmn': 'coulmn2',
        }]
    }
]


export default function OutputSystem({ system, database, schema }) {
    return (
        <Container className="mt-5">
            <Label className="h6 font-weight-bold">Output</Label>
            <Row className="justify-content-around">
                <div>
                    <Label>System : </Label><Label className="font-weight-bold ml-1">{system}</Label>
                </div>
                <div>
                    <Label>Database : </Label><Label className="font-weight-bold ml-1">{database}</Label>
                </div>
                <div>
                    <Label>Schema : </Label><Label className="font-weight-bold ml-1">{schema}</Label>
                </div>
            </Row>
            <Accordion.Group>
                {
                    AlltableData.map(({ tableName, tableCoulmn, tableData }, index) => <Accordion.Item className="h-100" key={index} title={tableName}>
                        <ReactTable
                            data={tableData}
                            columns={tableCoulmn}
                            defaultPageSize={tableData.length < 10 ? 5 : 10}
                            showPageJump
                            showPageSizeOptions
                            divided
                        />
                    </Accordion.Item>
                    )
                }
            </Accordion.Group>
        </Container>
    )
}