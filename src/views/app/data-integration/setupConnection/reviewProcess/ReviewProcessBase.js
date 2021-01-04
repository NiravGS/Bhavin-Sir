/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import moment from 'moment'
import * as R from 'ramda'
import React, { Fragment } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Label, Row, Table } from 'reactstrap'
import { ColItem } from '../../../../../components/ColItem'
import IntlMessages from '../../../../../helpers/IntlMessages'
import { getLabelByOption, ingestionTypeOptions, sourceTypes } from '../../../staticFields'
import {
  useSelectorSchedules,
  useSelectorSourceInformation,
  useSelectorTargetInformation
} from '../processEvents'
import { selectTargetSchemaColumns } from '../selector'

const InformationBlock = ({ values, prefixLabel }) => {
  return (
    <>
      <ColItem label={`${prefixLabel}Type`} content={sourceTypes.find(R.propEq('value', values?.type))?.label} />
      <ColItem label={`${prefixLabel}System`} content={values?.systemName} />
      {values?.schema && (
        <ColItem label={`${prefixLabel}Schema`} content={values?.schema} />
      )}
      {values?.database && (
        <ColItem label={`${prefixLabel}Database`} content={values?.database} />
      )}
    </>
  )
}

export const TitleRow = ({ label }) => {
  return (
    <Row>
      <Col>
        <Badge className='mb-2 mt-3' pill color='primary' size='lg'>
          <Label className='mb-0'><IntlMessages id={label} /></Label>
        </Badge>
      </Col>
    </Row>
  )
}

const TargetDatabaseView = () => {
  const { targetItems } = useSelectorTargetInformation()
  return (
    <Table striped className='mt-2'>
      <thead>
        <tr>
          <th style={{ width: '20%' }}><IntlMessages id='label.sourceTable' /></th>
          <th><IntlMessages id='label.targetTable' /></th>
          <th style={{ width: '12%' }}><IntlMessages id='label.ingestionType' /></th>
          <th style={{ width: '12%' }}><IntlMessages id='label.cdcColumns' /></th>
          <th style={{ width: '13%' }}><IntlMessages id='label.scdType' /></th>
          <th style={{ width: '12%' }}><IntlMessages id='label.scdColumns' /></th>
        </tr>
      </thead>
      <tbody>
        {R.values(targetItems)?.map(objectItem => (
          <Fragment key={objectItem.name}>
            <tr>
              <td><Label>{objectItem.name}</Label></td>
              <td><Label>{objectItem.targetTable}</Label></td>
              <td><Label>{getLabelByOption(ingestionTypeOptions, objectItem.ingestionType)}</Label></td>
              <td><Label>{objectItem?.cdcColumns?.join('; ')}</Label></td>
              <td><Label>{objectItem.scdType}</Label></td>
              <td><Label>{objectItem?.scdColumns?.join('; ')}</Label></td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </Table>
  )
}
const TargetFileView = () => {
  const targetInfo = useSelectorTargetInformation()
  const { columns } = selectTargetSchemaColumns(targetInfo)
  return (
    <Table striped className='mt-2'>
      <thead>
        <tr>
          <th><IntlMessages id='label.sourceTable' /></th>
          <th><IntlMessages id='label.targetPath' /></th>
          <th><IntlMessages id='label.type' /></th>
          <th><IntlMessages id='label.delimiter' /></th>
        </tr>
      </thead>
      <tbody>
        {columns?.map(columnItem => (
          <Fragment key={columnItem.name}>
            <tr>
              <td><Label>{columnItem.name}</Label></td>
              <td><Label>{columnItem.targetFilePath}</Label></td>
              <td><Label>{columnItem.targetFileType}</Label></td>
              <td><Label>{columnItem.targetDelimiter}</Label></td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </Table>
  )
}

const ReviewProcessBase = () => {
  const targetInfo = useSelectorTargetInformation()
  const sourceInfo = useSelectorSourceInformation()
  const schedules = useSelectorSchedules()

  return (
    <>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <TitleRow label='label.sourceInformation' />
            </CardHeader>
            <CardBody>
              <Row>
                <ColItem label='cloudType' content={sourceInfo?.cloudType} />
                <ColItem label='cloudBucket' content={sourceInfo?.cloudBucket} />
                <InformationBlock prefixLabel='source' values={sourceInfo} />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <Card>
            <CardHeader>
              <TitleRow label='label.targetInformation' />
            </CardHeader>
            <CardBody>
              <Row>
                <InformationBlock prefixLabel='target' values={targetInfo} />
                <ColItem label='rawSchema' content={targetInfo?.rawSchema} />
                <ColItem label='stageSchema' content={targetInfo?.stageSchema} />
              </Row>
              {targetInfo.type === 'fileSystem' ? (
                <TargetFileView />
              ) : (
                <TargetDatabaseView />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col xs={12} md={5}>
          <Card>
            <CardHeader>
              <TitleRow label='label.schedules' />
            </CardHeader>
            <CardBody>
              <Table>
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}><IntlMessages id='label.interval' /></th>
                    <th><IntlMessages id='label.date' /></th>
                    <th><IntlMessages id='label.time' /></th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule, index) => {
                    const keyIndex = `${index}_schedule_item`
                    const rawTime = moment(schedule?.sch_time).local()
                    return (
                      <tr key={keyIndex}>
                        <td><Label>{schedule.sch_interval}</Label></td>
                        <td>
                          <Label className='mb-0'>
                            {`${rawTime.format('YY-MM-DD')} (${rawTime.format('ddd')})`}
                          </Label>
                        </td>
                        <td>
                          <Label className='mb-0'>
                            {rawTime.format('hh:mm A')}
                          </Label>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ReviewProcessBase
