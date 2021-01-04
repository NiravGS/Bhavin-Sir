import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { injectIntl } from 'react-intl';
import {
  Col,
  Container,
  Form,
  Label,
  FormGroup,
  Modal,
  Row,
  ModalHeader,
  Input as InputReact,
} from 'reactstrap';

import Button from '../../../../../../components/button';
import Input from '../../../../../../components/Input/Input';
import IntlMessages from '../../../../../../helpers/IntlMessages';
import { useConfigDispatch } from '../ConfigProvider';
import { changeDataCheckAction, DataQualityFields } from './DataQuality';
import { filter } from 'ramda';

const filterValue = [
  { label: '=', value: '=' },
  { label: 'IN', value: 'IN' },
  { label: 'LIKE', value: 'LIKE' },
  { label: '!=', value: '!=' },
  { label: 'NOT LIKE', value: 'NOT LIKE' },
  { label: 'NOT IN', value: 'NOT IN' },
  { label: '>', value: '>' },
  { label: '<', value: '<' },
];

const Filter = ({ num, addFilter, removeFilter, columns, register, intl }) => (
  <React.Fragment>
    <Row>
      <Col className='mt-5 mb-2' xs={{ size: 4, offset: 4 }}>
        <InputReact
          key={`condition-${num}`}
          type='select'
          name={`condition[${num}]`}
          innerRef={register}
        >
          <option value='AND'>AND</option>
          <option value='OR'>OR</option>
        </InputReact>
      </Col>
    </Row>
    <Row>
      <Col xs={4}>
        <InputReact
          key={`column-${num}`}
          type='select'
          name={`column[${num}]`}
          innerRef={register}
        >
          {columns &&
            columns.map((column) => (
              <option key={`column-${num}${column.label}`} value={column.label}>
                {column.label}
              </option>
            ))}
        </InputReact>
      </Col>
      <Col xs={4}>
        <InputReact
          key={`function-${num}`}
          type='select'
          name={`function[${num}]`}
          innerRef={register}
        >
          {filterValue &&
            filterValue.map((column) => (
              <option
                key={`function-${num}${column.label}`}
                value={column.value}
              >
                {column.label}
              </option>
            ))}
        </InputReact>
      </Col>
      <Col xs={2}>
        <InputReact
          type='text'
          className='form-control'
          name={`value[${num}]`}
          innerRef={register}
        />
      </Col>
      <Col xs={2}>
        <Button color='primary' onClick={() => addFilter()}>
          +
        </Button>
        <Button color='primary' onClick={() => removeFilter(num)}>
          -
        </Button>
      </Col>
    </Row>
  </React.Fragment>
);

const AskFilter = ({ open, toggle, intl, columns, data }) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useConfigDispatch();
  const [FilterNumber, setFilterNumber] = useState([]);
  const [currentFilter, setCurrentFilter] = useState();

  useEffect( () =>  {
     if(data) {
       const filters = JSON.parse(data);
       setCurrentFilter(filters);
     }
  }, [data])

  const onSave = (data) => {
    dispatch(changeDataCheckAction(JSON.stringify(data), 'col_filter'));
    toggle();
  };

  const removeFilter = (index) => {
    setFilterNumber(FilterNumber.splice(index - 1, 1));
  };
  
  const addFilter = () => {
    const index = FilterNumber.length + 1;
    FilterNumber.push(
      <Filter
        num={index}
        intl={intl}
        columns={columns}
        register={register}
        index={1}
        addFilter={addFilter}
        removeFilter={removeFilter}
      />,
    );
    setFilterNumber([...FilterNumber]);
  };

  return (
    <Modal size='lg' isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <IntlMessages id='control.askFilter' />
      </ModalHeader>
      <Form
        className='av-tooltip tooltip-label-right'
        onSubmit={handleSubmit(onSave)}
      >
        <Container className='mt-5 mb-2'>
          <Row className='justify-content-center mb-3'>
            <Col xs={4}>
              <FormGroup>
                <Label>
                  <IntlMessages id='label.column' />
                </Label>
                <InputReact
                  key={`column-1`}
                  type='select'
                  name='column[0]'
                  innerRef={register}
                >
                  {columns &&
                    columns.map((column) => (
                      <option
                        key={`column-1${column.label}`}
                        value={column.label}
                      >
                        {column.label}
                      </option>
                    ))}
                </InputReact>{' '}
              </FormGroup>
            </Col>
            <Col xs={4}>
              <FormGroup>
                <Label>
                  <IntlMessages id='label.function' />
                </Label>
                <InputReact
                  key={`function-1`}
                  type='select'
                  name='function[0]'
                  innerRef={register}
                >
                  {filterValue &&
                    filterValue.map((column) => (
                      <option
                        key={`function-${column.label}`}
                        value={column.value}
                      >
                        {column.label}
                      </option>
                    ))}
                </InputReact>
              </FormGroup>
            </Col>
            <Col xs={2}>
              <Input
                style={{ paddingBottom: '7px' }}
                label='label.enterFilterValue'
                type='text'
                name='value[0]'
                innerRef={register}
                errors={errors}
              />
            </Col>
            <Col xs={2}>
              <Button
                style={{ marginTop: '25px' }}
                type='button'
                size='md'
                color='primary'
                onClick={() => addFilter()}
              >
                +
              </Button>
            </Col>
          </Row>
          {FilterNumber}

          <Row className='justify-content-center mb-3'>
            <Col xs={12} md='auto'>
              <Button type='submit' size='md' color='primary'>
                <IntlMessages id='control.finish' />
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </Modal>
  );
};

AskFilter.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  intl: PropTypes.object,
};

AskFilter.defaultProps = {
  asyncFetchDbInfo: {},
};

export default injectIntl(AskFilter);
