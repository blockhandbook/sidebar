/**
 * External Dependencies
 */
import {
	registerBlocks,
	registerPlugins,
	registerStores,
} from 'block-fast-refresh';

/**
 * WordPress Dependencies
 */

/**
 * Internal Dependencies
 */
import './index.scss';
import './style.scss';

// Register block categories.
import './utils/register-categories';

/** Hot Block Loading & Registering Blocks for production **/
registerBlocks( {
	context: () => require.context( './blocks', true, /index\.js$/ ),
	module,
} );

/** Hot Plugin Loading & Registering Plugins for production **/
registerPlugins( {
	context: () => require.context( './plugins', true, /index\.js$/ ),
	module,
} );

/** Hot Store Loading & Registering Stores for production **/
registerStores( {
	context: () => require.context( './stores', true, /index\.js$/ ),
	module,
} );
