/* **********
	Setup the meta datas of the package
********** */
Package.describe({
	name: 'i18n-meteor',
	summary: 'A very simple i18n package for meteor using static files.',
	internal: false
});

/* **********
	Tell meteor what to use to compile the package
********** */
Package.on_use(function (api) {
	api.use(['underscore', 'templating', 'handlebars'], 'client');
	api.add_files('i18n-meteor.js', 'client');
	api.export('i18n', 'client');
});

/* **********
	Tell meteor what to use to test the package
********** */
Package.on_test(function (api) {
	api.use(['i18n-meteor','tinytest', 'moment']);
	api.add_files('i18n-meteor_tests.js', 'client');
});

