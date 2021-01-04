const data = [
	{
		id: 'gogo',
		icon: 'iconsminds-arrow-merge',
		label: 'menu.data-integration',
		to: '/app/data-integration',
		subs: [
			{
				label: 'menu.connection-new-process',
				to: '/app/data-integration/set-up-connection/create-process',
				icon: 'iconsminds-magic-wand',
			},
			{
				label: 'menu.view-all-process',
				to: '/app/data-integration/set-up-connection/view-all-processes',
				icon: 'simple-icon-organization',
			},
			{
				label: 'menu.connection-create-process',
				to: '/app/data-integration/set-up-connection/create-connection',
				icon: 'simple-icon-layers',
			},
			{
				label: 'menu.view-connections',
				to: '/app/data-integration/set-up-connection/connections',
				icon: 'simple-icon-vector',
			},
		],
	},
	{
		id: 'secondmenu',
		icon: 'iconsminds-check',
		label: 'menu.data-quality',
		to: '/app/data-quality',
		subs: [
			{
				label: 'menu.connection-new',
				to: '/app/data-quality/process',
				icon: 'iconsminds-magic-wand',
			},
			{
				label: 'menu.connection-existing',
				to: '/app/data-quality/set-up-connection/existing',
				icon: 'simple-icon-organization',
			},
			{
				label: 'menu.connection-create-process',
				to: '/app/data-quality/set-up-connection/new',
				icon: 'simple-icon-layers',
			},
			{
				label: 'menu.connection-manage-process',
				to: '/app/data-quality/set-up-connection/manage',
				icon: 'simple-icon-vector',
			},
		],
	},
	{
		id: 'data-privacy',
		icon: 'iconsminds-key-lock',
		label: 'menu.data-privacy',
		to: '/app/data-privacy',
		subs: [
			{
				label: 'menu.DiscoverPII',
				to: '/app/data-privacy/DiscoverPII',
				icon: 'simple-icon-magnifier',
			},
			{
				label: 'menu.GenerateReport',
				to: '/app/data-privacy/GenerateReport',
				icon: 'simple-icon-chart',
			},
			{
				label: 'menu.ManageDriver',
				to: '/app/data-privacy/ManageDriver',
				icon: 'simple-icon-grid',
			},
			{
				label: 'menu.AddSystem',
				to: '/app/data-privacy/AddSystem',
				icon: 'simple-icon-layers',
			},
			{
				label: 'menu.ViewSystem',
				to: '/app/data-privacy/ViewSystem',
				icon: 'simple-icon-vector',
			},
		],
	},
	// {
	//   id: 'database-converter',
	//   icon: 'iconsminds-arrow-loop',
	//   label: 'menu.database-converter',
	//   to: '/app/data-quality',
	//   subs: []
	// },
	{
		id: 'documentation',
		icon: 'iconsminds-box-with-folders',
		label: 'menu.documentation',
		to: '/documentation/docs/',
		subs: [],
		newWindow : true,
		bottom: true,
	},
	{
		id: 'contact',
		icon: 'iconsminds-business-mens',
		label: 'menu.contact',
		to: '/app/data-quality',
		subs: [],
	},
];
export default data;
