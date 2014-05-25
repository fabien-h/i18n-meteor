/* **********
	We are only working client side
********** */
if (Meteor.isClient) {

	// Initialize i18n package on startup
	Meteor.startup(function(){

		// Setup the configurations
		i18n.supportedLanguages = {
			en:'english',
			fr:'français'
		};
		i18n.filesDirectory = 'i18n/';
		i18n.momentIsUsed = false;

		// Call the initialization function
		i18n.init();
	});

	Template.test.helpers({
		today: function() {
			return i18n.t('today', 'default_today') + ' : ' + moment(new Date()).format('dddd mm MMMM YYYY');
		}
	});

	Template.test.events({
		'click #switchLanguageButton': function() {
			if( i18n.currentLanguage === 'en') i18n.setLanguage('fr');
			else i18n.setLanguage('en');
		}
	});

}
