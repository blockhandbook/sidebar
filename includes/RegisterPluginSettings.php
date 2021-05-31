<?php
/**
 * Register plugin settings & pass to plugin data store.
 *
 * @package Sidebar
 */

namespace Sidebar;

/**
 * Register global plugin settings.
 *
 * @since 1.0.0
 */
class RegisterPluginSettings {

	/**
	 * Register class with appropriate WordPress hooks.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public static function register() {
		$instance = new self();
		add_action( 'init', array( $instance, 'set_plugin_settings' ) );
		// Pass settings variable to plugin store instead of grabbing
		// settings via a resolver on page load.
		add_action( 'enqueue_block_editor_assets', array( $instance, 'init_plugin_store' ) );
	}

	/**
	 * Add global plugin options.
	 *
	 * @return void
	 */
	public function set_plugin_settings() {

		$settings = array(
			'configuration' => array(),
		);

		// add_option only adds options if they don't yet exist.
		add_option( SIDEBAR_PLUGIN_SLUG_CAMEL_CASE . 'Settings', $settings );
		// uncomment this to reset the settings object for testing.
		// delete_option( SIDEBAR_PLUGIN_SLUG_CAMEL_CASE . 'Settings' );
	}

	/**
	 * Make settings available to plugin data store.
	 *
	 * @return void
	 */
	public function init_plugin_store() {

		// Read in existing settings values from database.
		$settings = get_option( SIDEBAR_PLUGIN_SLUG_CAMEL_CASE . 'Settings' );

		// Create an object of all plugin settings that we need.
		// We will then load these in the redux store and
		// create actions for updating shared global state.
		// Load the redux store from the wp_local_script.
		wp_localize_script(
			SIDEBAR_PLUGIN_SLUG . '-block-editor',
			SIDEBAR_PLUGIN_SLUG_CAMEL_CASE . 'Settings',
			array(
				'settings' => $settings,
			)
		);
	}
}
