/* **********
	Initialize the namespace for the package
	-	supportedLanguages => has to be set client side example :
		{
			en:'english',
			fr:'français'
		}
	-	filesDirectory => has to be set client side, string to set the path where the package will find the translations
	-	momentIsUsed => boolean to tell if moment js is used ; has to be set client side
	-	profileLangueIsUsed => boolean to tell if there will be a Meteor.user().profile.language
	-	version => version of the translation files ; has to be set client side
	-	dictionnaries => object to cache the dictionnaries
	-	currentLanguage => the current language
********** */
i18n = {
	supportedLanguages: {},
	filesDirectory: '',
	momentIsUsed: false,
	profileLangueIsUsed: false,
	version: '',
	dictionnaries: {},
	currentLanguage: ''
};

/* **********
	The init function is called when the application starts
	It will set the starting language
********** */
i18n.init = function() {

	// Get the first key in supportedLanguages as the default language
	var d = _.keys(i18n.supportedLanguages)[0],
		stLanguage = d;

	// If there's a connected user with a profile, and the profile has a language key use it's profile.language
	if( i18n.profileLangueIsUsed && Meteor.user() ) {
		stLanguage = Meteor.user().profile.language;
	// Else, take the navigator's language
	} else {
		stLanguage = navigator.language.slice(0,2);
	}

	// If the language is not supported, falls back to english
	if( !i18n.supportedLanguages[stLanguage] ){ stLanguage = d; }

	// Sets the language
	i18n.setLanguage(stLanguage);
};

/* **********
	The setLanguage function will set the dictionnary used in the Session dictionnary object
	Will Also set the moment js language
********** */
i18n.setLanguage = function(targetLanguage) {

	// If moment is used, sets the language
	if( moment && i18n.momentIsUsed ) {
		// If language is not english, loads and execute a moment script for the language
		if( targetLanguage !== 'en' ) {
			$.getScript( i18n.filesDirectory + 'moment/' + targetLanguage + '.js', function(data){
			});
			moment.lang(targetLanguage);
		}
		// Else, set moment to english
		else moment.lang('en');
	}

	// If the dictionnary is already downloaded, applyies it
	if( i18n.dictionnaries[targetLanguage] ) Session.set('dictionnary', i18n.dictionnaries[targetLanguage]);
	// Else, load the disctionnary and applyies it
	else {
		$.get( i18n.filesDirectory + targetLanguage + version + '.json', function( response, message, rq ) {
			i18n.dictionnaries[targetLanguage] = response;
			Session.set('dictionnary', response);
		});
	}

	// Sets the current language in the i18n object
	i18n.currentLanguage = targetLanguage;

};

/* **********
	The translate function
	Can be used to translate a text in a template helper for example
********** */
i18n.t = function(t, d) {
	if( Session.get('dictionnary') ) return Session.get('dictionnary')[t] || d;
	else return d || '';
};

/* **********
	Define the Handlebars helpers
	Has to be used this way : {{t 'value' 'default'}}
********** */
UI.registerHelper('t',function(t, d){
	if( Session.get('dictionnary') ) return Session.get('dictionnary')[t] || d;
	else return d || '';
});
