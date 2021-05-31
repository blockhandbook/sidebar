<?php
/**
 * Enqueue script and style assets.
 *
 * @package Sidebar
 */

namespace Sidebar;

/**
 * Enqueue script and style assets.
 *
 * @since 1.0.0
 */
class EnqueueAssets {

	/**
	 * Register class with appropriate WordPress hooks
	 */
	public static function register() {
		$instance = new self();
		add_action( 'init', array( $instance, 'enqueue_styles' ) );
	}

	/**
	 * Enqueue styles.
	 *
	 * @return void
	 */
	public function enqueue_styles() {

		// Enqueue tailwind styles.
		wp_enqueue_style(
			SIDEBAR_PLUGIN_SLUG . '-tailwind',
			SIDEBAR_PLUGIN_URL . 'build/tailwind.css',
			array(),
			SIDEBAR_PLUGIN_VERSION
		);
	}
}
