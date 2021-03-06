/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { dispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { Button, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { FontSizePicker, BlockControls, InspectorControls } from '@wordpress/block-editor';
const { openGeneralSidebar } = dispatch( 'core/edit-post' );

/**
 * Internal Dependencies
 */
import { config } from '../../../package.json';
const { slug } = config;

/**
 * Module Constants
 */

const Edit = ( props ) => {
	const { pluginSettings } = useSelect(
		( select ) => {
			const pluginSettings = select(
				`${ slug }/settings`
			).getPluginSettings();
			return {
				pluginSettings,
			};
	} );

	const {
		configuration: {
			defaultTagName,
			defaultFontSize
		}
	} = pluginSettings;

	const {
		setAttributes,
		className,
		attributes: {
			// put attribute key names here to use them
			content,
			fontSize,
			tagName,
			useDefaultTagName,
			useDefaultFontSize,
		},
	} = props;

	// Need to useEffect to setAttributes for defaultFontSize and defaultTagName
	// We do this in case the default gets changed and we need to pass it along to the save function b/c we can't use hooks in the save function
	useEffect( () => {
		setAttributes( { defaultFontSize, defaultTagName } );
	} );

	return (
		<div className={ className }>
			<BlockControls></BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'sidebar' ) } className="blocks-font-size">
					{
						! useDefaultFontSize &&
						<FontSizePicker
							value={ fontSize }
							onChange={ ( size ) => {
								setAttributes( { fontSize: size } );
							} }
						/>
					}
					<ToggleControl
						label={ `Use default font size ${ useDefaultFontSize && !! defaultFontSize ? defaultFontSize : '' }${ useDefaultFontSize ? 'px' : '' }` }
						checked={ useDefaultFontSize }
						onChange={ () => setAttributes( { useDefaultFontSize: ! useDefaultFontSize } ) }
					/>
					{
						! useDefaultTagName &&
						<SelectControl
							label={ __( 'HTML tag type', 'sidebar' ) }
							value={ tagName }
							onChange={ ( tagName ) => setAttributes( { tagName } ) }
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
					}
					<ToggleControl
						label={ `Use default ${ useDefaultTagName && !! defaultTagName ? defaultTagName : !! defaultTagName ? defaultTagName : tagName } tag` }
						checked={ useDefaultTagName }
						onChange={ () => {
							setAttributes( {
								useDefaultTagName: ! useDefaultTagName,
								} );
						}	}
					/>
					<Button isLink onClick={ () => openGeneralSidebar( `${ slug }/settings` ) }>{ __( 'Edit default settings', 'sidebar' ) }</Button>
				</PanelBody>
			</InspectorControls>
			<RichText
				tagName={ useDefaultTagName && !! defaultTagName ? defaultTagName : tagName }
				style={ useDefaultFontSize ? { fontSize: defaultFontSize } : { fontSize } }
				value={ content }
				onChange={ ( content ) => setAttributes( { content } ) }
				placeholder={ __(
					'This is a rich text block with a plugin sidebar.  This block demonstrates how to use the rich text component that has saveable default settings that can be edited directly in the editor from the plugin sidebar. Edit this file in src/blocks/rich-text-block-with-plugin-sidebar/edit.js.  Click the plugin icon in the top right of the editor to check it out. This block also demonstrates how to set up a global data store for blocks.  Though it appears simple, it\'s quite the complicated block...',
					'sidebar'
				) }
			/>
		</div>
	);
}

export default Edit;
