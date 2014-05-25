/* **********
	The test cases for the i18n package
********** */

// Test starting
Tinytest.add('i18n-meteor - starting test', function (test) {
	test.ok();
});

// Test return before configuration
Tinytest.add('i18n-meteor - fallback on default before configuration', function (test) {
	test.equal(i18n.t('hello_world', 'hello world'), 'hello world', 'wrong fallback');
	test.equal(i18n.t('hello_world'), '', 'wrong fallback');
});

// Translation test
Tinytest.add('i18n-meteor - translation test', function (test) {
	Session.set('dictionnary', {'hello_world': 'Hello world.'});
	test.equal(i18n.t('hello_world', 'hello world'), 'Hello world.', 'wrong translation');
});

