/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal Dependencies
 */
import { config } from '../../../package';
const { slug } = config;

// We can pass the plugin settings object via the
// class-plugin-settings.php file in the wp_localize_script.
// Uncomment to populate state from wp_localize_scripts.
const plugin = sidebarSettings;

//this holds all initial state that we pass through via php
//using the wp_localize_scripts
// Uncomment to populate state from wp_localize_scripts.
const INITIAL_STATE = {
	settings: plugin.settings,
};

// Uncomment to populate state from wp_localize_scripts.
const DEFAULT_STATE = {
	settings: INITIAL_STATE.settings,
};

// Uncomment if using resolver to populate store
// const DEFAULT_STATE = {
// 	settings: {},
// };

const name = `${ slug }/settings`;
const settings = {
	//reducers specify how the application's state changes
	//in response to actions sent to the store.
	//remember actions only describe what happened, but don't describe how the application's state changed.
	//all application state is stored as a single object, it's good to think about it's shape before writing any code.
	//the reducer should ONLY calculate the next state and return it.
	//THAT'S IT

	//reducers manage their own parts of the global state.
	//the state parameter of every reducer corresponds to the part of state it manages
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'UPDATE_PLUGIN_SETTINGS':
				console.log( action.settings );
				return {
					//previous state
					...state,
					//new state
					//we are returning the previous settings state
					//AND the newly added settings state
					settings: {
						...state.settings,
						...action.settings,
					},
				};
			default:
				//return previous state for any unknown action
				return state;
		}
	},
	//	actions
	//	actions are payloads of information, objects, that send data
	//	from your application to your store.
	//	they are the ONLY source of information for the store.
	//	you send them to the store using store.dispatch()
	//	in WordPress this looks like dispatch('my-store').setPrice('hammer', 9.75)
	actions: {
		updatePluginSettings( settings ) {
			return {
				type: 'UPDATE_PLUGIN_SETTINGS',
				settings,
			};
		},
		fetchFromAPI( path ) {
			return {
				type: 'FETCH_FROM_API',
				path,
			};
		},
	},
	selectors: {
		// get plugin settings
		getPluginSettings( state ) {
			const { settings } = state;
			return settings;
		},
	},
	// Controls are used to save data to an external resource
	// for an action.
	controls: {
		FETCH_FROM_API( action ) {
			return apiFetch( { path: action.path } );
		},
	},
	// Resolvers are used to grab data from an external resource
	// for a selector.  The name of a resolver should be the same
	// name as the selector it is used for and passed the same args as
	// the selector, except for the state argument.
	// Uncomment to have resolver populate store.
	// If you want to populate settings from a resolver, here's a good example of how to do it https://mattwatson.codes/blog/working-with-gutenberg-and-the-wordpress-rest-api/
	// resolvers: {
	// 	* getPluginSettings() {
	// 		const path = `${ slug }/v1/settings/`;
	// 		const pluginSettings = yield settings.actions.fetchFromAPI( path );
	// 		console.log( pluginSettings );
	// 		return pluginSettings;
	// 	},
	// },
};

export { name, settings };
