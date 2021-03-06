/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { setCategories, getCategories } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import icons from './icons';

const categories = [
	{
		slug: 'sidebar',
		title: 'Sidebar',
		icon: icons.plugin,
	},
	...getCategories().filter(
		( { categorySlug } ) => categorySlug !== 'sidebar'
	),
];
setCategories( categories );
