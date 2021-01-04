import * as R from 'ramda';
import { formatDefaultOption } from '../../../../components/Input/Select';
import { getIntl } from '../../../../IntlProvider';
import { databaseHasSchemaField } from '../../data-quality/setupConnection/newConnection/formLabelFields';
import { useSelectorProcess } from './processEvents';
import { useSelector } from 'react-redux';

const intlMessages = getIntl()?.messages;

export const tablesFieldSelector = (tables) => {
	return tables?.map?.((item) => formatDefaultOption(item.tableName));
};

export const columnFieldSelector = (columns = []) => R.map(R.prop('column_name'), columns);

export const mountConnectionSelect = R.map((con) => ({
	label: con.sourceName,
	value: con.id,
	hasSchema: databaseHasSchemaField(con.databaseType),
}));

const handleAddLocalFileOption = (hasLocalFile) => (options) =>
	hasLocalFile ? R.append({ label: intlMessages['label.localSystem'], value: 'localSystem' }, options) : options;

export const connectionFieldSelector = (connections, sourceType, { hasLocalFile }) =>
	R.compose(
		handleAddLocalFileOption(hasLocalFile),
		mountConnectionSelect,
		R.filter(R.propEq('sourceType', sourceType))
	)(connections);

export const hasSchemaFieldSelector = (connections, connectionId) => {
	const databaseType = connections?.find(R.propEq('connectionId', connectionId))?.databaseType;
	return databaseType && databaseHasSchemaField(databaseType);
};

export const useSystemHasSchema = (connectionId) => {
	const { processConnections } = useSelectorProcess();
	return processConnections.find(R.propEq('value', connectionId))?.hasSchema;
};


const handleEnabledDatabaseOptions = optionDisabled => databaseName => {
	const option = formatDefaultOption(databaseName)
	if (R.equals(option?.value, optionDisabled)) {
	  const label = `${option.label} (${intlMessages['label.selectedOnSource']})`
	  return { isDisabled: true, ...option, label }
	}
	return option
  }

export const databaseFieldSelector = (connections, connectionId, optionDisabled) => {
	const selectedConnection = R.find(R.propEq('id', connectionId), connections)
	return selectedConnection?.databases?.map(handleEnabledDatabaseOptions(optionDisabled))
}

export const getNotNullValues = (form) => R.pickBy(R.complement(R.isNil), form);

export const selectTargetSchemaColumns = (targetValues) => {
	const { schema, targetItems } = getNotNullValues(targetValues);
	return { schema, columns: R.values(targetItems) };
};

export const systemLabel = (systemId, processConnections) => {
	return processConnections?.find(R.propEq('value', systemId))?.label;
};

export const useFileInputsSelector = () => useSelector((state) => state?.process?.fileInputs);

export const getvaluebykey = (key, data) => data.find(({ connectionKey }) => connectionKey === key)?.connectionValue;

export const getEditConnectionValue = (data) => {
  return{
	sourceType: data.sourceType,
	type: data.type,
	connectionName: data.sourceName,
	// additionalInfo: getvaluebykey('additionalInfo', data),
	database: data.data.database,
	host: data.data.host,
	password: data.password,
	port: data.data.port,
	username: data.data.username,
 }
};
