/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { Guide, ExternalLink } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import './index.scss';
import { config } from '../../../package';
const { slug, slugCamelCase, upgradeLink } = config;

const WelcomeGuide = () => {
	const isActive = useSelect(
		( select ) =>
			select( 'core/edit-post' ).isFeatureActive( `${ slugCamelCase }Guide` ),
		[]
	);
	const { toggleFeature } = useDispatch( 'core/edit-post' );

	if ( ! isActive ) {
		return null;
	}

	return (
		<>
			<Guide
				className={ `${ slug }-welcome-guide` }
				onFinish={ () => toggleFeature( `${ slugCamelCase }Guide` ) }
				pages={ [
					{
						image: <img src="/wp-content/plugins/sidebar/src/assets/img/welcome-guide-background.jpg" />,
						content: (
							<div className={ `wp-block-${ slug }` } >
							<div className="p-10 pt-0">
								<h1 className="mt-0">{ __( 'Thank you for choosing the Sidebar plugin!', 'sidebar' ) }</h1>
								<p>{ __( 'Quickly learn how to get the most bang for your buck out using the Sidebar plugin.', 'sidebar' ) }</p>
							</div>
						</div> ),
					},
				] }
			/>
		</>
	);
}

export default WelcomeGuide;
