# i18n-meteor

i18n-meteor is a small internationalization package for meteor. Unlike many others, it is not based on a collection. The collection based solution implies that you have to open and close connections to your server, which consume ressources.

The second reason is that the browsers cannot cache the translation collection and will re-download it each time they land on the application.

## How to install ?

Like any package from [atmosphere](https://atmospherejs.com/), you have to use the following command in your meteor app folder :

	mrt add i18n-meteor

## Setup the static files

Create a folder in your `public`folder or choose to serve the files from an other server. Add a translation file by supported language. A translation file should be a json valid file and look like that :

	{
		"hello_world": "Hello world.",
		"today": "today",
		"switch_language": "Switch the language."
	}

> For convention, I make the translation keys begin by the name of the view they are going to be used in. My keys look like that `login_changeEmail` or `home_mainTitle`. The weird underscore plus camelCase thing may feel like an heresy to you, but it is convenient. I promise.

The name of the files will be the abbreviated name for the language and end with the version. They should look like that : `en.json`, `en_0.1.json`, `fr_2.12.json`…

> You do not have to set a version, but it can be usefull since the files are going to be cached by the browsers.

If you use [moment js](http://momentjs.com/), you can add a `moment` folder to your translation folder with all the available translations for moment. That way, you can add moment without the languages, which will be significantly lighter. Those files are available [here](https://github.com/moment/moment/tree/develop/lang).

## Setup the options client side

When your translation files are set, you can setup the package options :

	if (Meteor.isClient) { // uniquement sur le client
		Meteor.startup(function(){ // quand meteor démarre
			i18n.supportedLanguages = {
				en:'english',
				fr:'français'
			};
			i18n.filesDirectory = 'i18n/';
			i18n.momentIsUsed = true;
			i18n.profileLangueIsUsed = true;
			i18n.version = '';
		});
	}

`supportedLanguages` is an object containing as much pair of key value as your application support languages. The key will be used to target the translation files. The first language will be the default one.

`filesDirectory` is the path to the folder containing your static files. For instance, `i18n/` means that the files are in a folder i18n, itself in the public folder. It could be an url like `https://mydomain.com/myfiles/`.

`momentIsUsed` a boolean to tell if moment js is used. If true, it will activate the moment language switch when changing the language

`profileLangueIsUsed` if your user can login and you want to allow them to choose a language, you have to set this boolean to true. Then the language has to be defined in `Meteor.user().profile.language`

`version` to add a version to your translation files. If you don't set it, the package will look for the file `en.json`. If you set it to `_0.1` for example, it will look for the `en_0.1.json` file.

## Initialize the package

When the options are ready, you can initialize the package with the following code :

	i18n.init();

It will setup the initial language by preference ordrer.

1. the user profile.language if set
2. the navigator.language if it exists in your supported languages
3. the default language (the first defined in the supported language object)

## Use the package

### In a template

	{{t "string" "default_string"}}

Will display a translated version of `string` or fallback to the default one if the string is not found.

### In your code

	i18n.t("string", "default_string")

Will return a translated version of `string` or fallback to the default one if the string is not found.

### To change the language

	i18n.setLanguage("en")

Will set the language to en and load the files if they haven't been already.

> Because the template helpers and code helpers are linked to the `Session` object, when the language change, all the translated object will be updated.

## Use case

There is a minimal example [here](https://github.com/fabien-h/i18n-meteor/tree/master/example).