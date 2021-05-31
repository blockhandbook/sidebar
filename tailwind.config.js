const pkg = require( './package.json' );
const { slug } = pkg.config;

const config = {
	mode: 'jit',
	important: `[class*="wp-block-${ slug }"]`,
	theme: {
		screens: {
			xl: {'max': '1279px'},
			// => @media (max-width: 1279px) { ... }
      lg: {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }
      md: {'max': '767px'},
      // => @media (max-width: 767px) { ... }
      sm: {'max': '639px'},
      // => @media (max-width: 639px) { ... }
		},
		spacing: {
			0: '0',
			px: '1px',
			0.5: '2px',
			1: '4px',
			1.5: '6px',
			2: '8px',
			2.5: '10px',
			3: '12px',
			3.5: '14px',
			4: '16px',
			5: '20px',
			6: '24px',
			7: '28px',
			8: '32px',
			9: '36px',
			10: '40px',
			11: '44px',
			12: '48px',
			14: '56px',
			16: '64px',
			20: '80px',
			24: '96px',
			28: '112px',
			32: '128px',
			36: '144px',
			40: '160px',
			44: '176px',
			48: '192px',
			52: '208px',
			56: '224px',
			60: '240px',
			64: '256px',
			72: '288px',
			80: '320px',
			96: '384px',
		},
	},
	variants: {},
	purge: {
		content: [
			'./build/*.js',
			'./src/**/*.php',
			'./node_modules/@blockhandbook/**/*.js',
			'./includes/**/*.php',
		]
	},
};

module.exports = config;
