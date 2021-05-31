/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { BaseControl, Button, Card, CardBody, PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { dispatch, useDispatch, useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal Dependencies
 */
import WelcomeGuide from '../../components/welcome-guide';
import icons from './icons';
import './index.scss';
import { config } from '../../../package';
const { pluginName, slug, slugCamelCase } = config;

const Plugin = ( props ) => {
	const { pluginSettings } = useSelect(
		( select ) => {
			const pluginSettings = select(
				`${ slug }/settings`
			).getPluginSettings();
			return {
				pluginSettings,
			};
	} );

	const [ configuration, setConfiguration ] = useState( !! pluginSettings?.configuration ? pluginSettings.configuration : null );

	const updatePluginSettings = async ( data, setting ) => {
		const request = apiFetch( {
			path: `${ slug }/v1/settings/${ setting }`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify( data ),
		} );

		try {
			const response = await request;
			if ( response ) {
				dispatch( 'core/notices' ).createSuccessNotice( 'Settings saved', {
					type: 'snackbar',
				} );

				dispatch( `${ slug }/settings` ).updatePluginSettings( response.settings );
			}
		} catch ( error ) {
			const errorNotice = 'Setting was not updated, please try again.';
			dispatch( 'core/notices' ).createNotice( 'error', errorNotice );
		}
	};

	const { toggleFeature } = useDispatch( 'core/edit-post' );

	return (
		<>
			<PluginSidebarMoreMenuItem
				target={ `settings` }
			>
				{ __( 'Sidebar', 'sidebar' ) }
			</PluginSidebarMoreMenuItem>
			<WelcomeGuide />
			<PluginSidebar
				title={ `${ pluginName } settings`}
				name={ `settings` }
			>
				<Card
					isBorderless
					size="small"
				>
					<CardBody>
						<p>
							<strong>
								{ __(
									'This is an example using the <PluginSidebar /> component.',
									'sidebar'
								) }
							</strong>
						</p>
						<p>
						{
							__( 'Set defaults from the editor for the rich-text-block-with-plugin-settings block.', 'sidebar' )
						}
						</p>
						<p>
						{
							__( 'Settings saved from the plugin sidebar are saved to both the global data store and to WordPress add_option().  Edit the settings in includes/RegisterPluginSettings.php file.', 'sidebar' )
						}
						</p>
						<p>
						{
							__( 'Checkout the data store in src/stores/plugin-settings/index.js.  The store data is loaded using wp_localize_script in includes/RegisterPluginSettings.php file.', 'sidebar' )
						}
						</p>
						<p>
						{
							__( 'Edit this plugin sidebar in src/plugins/plugin-settings/index.js.  The store data is loaded using wp_localize_script in includes/RegisterPluginSettings.php file.', 'sidebar' )
						}
						</p>
					</CardBody>
				</Card>
				<PanelBody title={ __( 'Default settings', 'sidebar' ) }>
					<RangeControl
						label={ __( 'Default font size', 'sidebar' ) }
						value={ !! configuration?.defaultFontSize ? configuration.defaultFontSize : '' }
						onChange={ ( newValue ) => {
							if( newValue === '' ) {
								delete configuration.defaultFontSize;
								setConfiguration( {
									...configuration,
									defaultFontSize: configuration.defaultFontSize,
								} )
							} else {
								setConfiguration( {
									...configuration,
									defaultFontSize: newValue,
								} )
							}
						} }
						initialPosition={ !! configuration?.defaultFontSize ? configuration.defaultFontSize : 0 }
						min={ 0 }
						max={ 200 }
						step={ 1 }
					/>
					<SelectControl
						label={ __( 'Default html tag type', 'sidebar' ) }
						value={ !! configuration?.defaultTagName ? configuration.defaultTagName : 'p' }
						onChange={ ( newValue ) => {
							if( newValue === '' ) {
								delete configuration.defaultTagName;
								setConfiguration( {
									...configuration,
									defaultTagName: 'p',
								} )
							} else {
								setConfiguration( {
									...configuration,
									defaultTagName: newValue,
								} )
							}
						} }
						options={
							[
								{ value: 'p', label: __( 'p', 'sidebar' ) },
								{ value: 'h1', label: __( 'h1', 'sidebar' ) },
								{ value: 'h2', label: __( 'h2', 'sidebar' ) },
								{ value: 'h3', label: __( 'h3', 'sidebar' ) },
								{ value: 'h4', label: __( 'h4', 'sidebar' ) },
								{ value: 'h5', label: __( 'h5', 'sidebar' ) },
								{ value: 'h6', label: __( 'h6', 'sidebar' ) },
								{ value: 'div', label: __( 'div', 'sidebar' ) },
							]
						}
					/>
					<Button
						isSecondary
						isSmall
						onClick={ ( ) => {
							const data = {
									configuration: {
										...configuration
									}
								};
								updatePluginSettings( data, 'configuration' );
						} }
					>
					{ __( 'Save', 'sidebar' ) }
					</Button>
				</PanelBody>
				<PanelBody
						initialOpen={ false }
						title={ __( 'How To Guide', 'sidebar' ) }
						name={ `heading` }
					>
						<BaseControl
							className={ `${ slug } mb-0 block` }
							label={ __( `Quickly learn how to get the most bang for your buck out using the ${ pluginName } plugin.`, 'sidebar' ) }
						/>
						<Button
							className={ `${ slug } mb-3 block` }
							isLink
							onClick={ () => toggleFeature( `${ slugCamelCase }Guide` )	}
						>
							{ __( 'Learn More', 'sidebar' ) }
						</Button>
					</PanelBody>
			</PluginSidebar>
		</>
	);
};

const name = `${ slug }`;
const settings = {
	icon: icons.plugin,
	render: Plugin,
};

export { name, settings };
