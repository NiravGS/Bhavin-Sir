import React, { useState } from 'react';
import { Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import LayoutBase from '../../../../../components/LayoutContainer';
import { ReactTable, SearchInput, TableItem, useFilterTable } from '../../../../../components/tableCard';
import Button from '../../../../../components/button';
import IntlMessages from '../../../../../helpers/IntlMessages';
import { useASyncDeleteProcess, useConnections } from './request';

const connectionColumns = [
	{ Header: 'Connection', accessor: 'sourceName', Cell: TableItem },
	{ Header: 'Source Type', accessor: 'sourceType', Cell: TableItem },
	{ Header: 'Database Type', accessor: 'type', Cell: TableItem }
  ]

const ActionModal = ({ open, toggle, titleLabel, editLabel, deleteLabel, onDelete, onEdit }) => (
	<Modal isOpen={open} toggle={toggle}>
		<ModalHeader toggle={toggle}>{titleLabel}</ModalHeader>
		<ModalFooter>
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} md="auto">
						<Button size="lg" color="warning" onClick={onDelete}>
							<IntlMessages id={deleteLabel} />
						</Button>
					</Col>
					<Col xs={12} md="auto">
						<Button size="lg" color="primary" onClick={onEdit}>
							<IntlMessages id={editLabel} />
						</Button>
					</Col>
				</Row>
			</Container>
		</ModalFooter>
	</Modal>
);

const DeleteModal = ({ open, toggle, onDelete, loadingDelete }) => (
	<Modal isOpen={open} toggle={toggle}>
		<ModalHeader toggle={toggle}>
			<IntlMessages id="label.ask-delete-process" />
		</ModalHeader>
		<ModalBody>
			<label>Are you sure you want to remove the System ?</label>
		</ModalBody>
		<ModalFooter>
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} md="auto">
						<Button size="lg" color="secondary" onClick={toggle}>
							<IntlMessages id="control.cancel" />
						</Button>
					</Col>
					<Col xs={12} md="auto">
						<Button loading={loadingDelete} size="lg" color="primary" onClick={onDelete}>
							<IntlMessages id="label.delete" />
						</Button>
					</Col>
				</Row>
			</Container>
		</ModalFooter>
	</Modal>
);

const Connections = () => {
	const { data } = useConnections();
	const history = useHistory();

	const { dataFiltered, setSeachTableText } = useFilterTable(data, ['connectionName']);
	const [actionModalOpen, setactionModalOpen] = useState(false);
	const [deleteModalOpen, setdeleteModalOpen] = useState(false);

	const [selectedData, setselectedData] = useState({});
	const [runDelete, loadingDelete] = useASyncDeleteProcess();

	const onDelete = async () => {
		await runDelete(selectedData.connectionId);
		setdeleteModalOpen(false);
		setactionModalOpen(false);
		history.go(0);
	};

	const onEdit = () => {
		history.push(`/app/data-integration/set-up-connection/update-connection/${selectedData.id}`);
	};

	return (
		<LayoutBase withoutCard label="connections">
			<Row>
				<Col xs="auto" className="mt-2">
					<SearchInput placeholder="label.name" onChangeInput={setSeachTableText} />
				</Col>
			</Row>
			<Row className="mt-2">
				<Col>
					<ReactTable
						data={dataFiltered}
						columns={connectionColumns}
						defaultPageSize={data.length < 10 ? 5 : 10}
						filterable
						showPageJump
						showPageSizeOptions
						divided
						onClickRow={(row) => {
							setactionModalOpen(true);
							setselectedData(row);
						}}
					/>
				</Col>
			</Row>

			{actionModalOpen && (
				<ActionModal
					open={actionModalOpen}
					toggle={() => setactionModalOpen(!actionModalOpen)}
					deleteLabel="Delete"
					editLabel="Edit"
					titleLabel={selectedData && selectedData.connectionName}
					onDelete={() => setdeleteModalOpen(true)}
					onEdit={onEdit}
				/>
			)}

			{deleteModalOpen && (
				<DeleteModal
					open={deleteModalOpen}
					toggle={() => setdeleteModalOpen(!deleteModalOpen)}
					onDelete={onDelete}
					loadingDelete={loadingDelete}
				/>
			)}
		</LayoutBase>
	);
};

Connections.propTypes = {};

export default Connections;
