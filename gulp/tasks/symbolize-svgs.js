/* eslint-disable indent */
import {
	gulp,
	plugins,
	config,
	dirs,
	taskTarget,
	join,
} from '../config/shared-vars';

const symbolize_svgs = () => {
	return (
		gulp
			.src([dirs.source, dirs.images, 'SVGs', '**/*.svg'].join('/'))

			//convert svg files in "SVGs" folder into a single svg sprite
			.pipe(
				plugins.svgSymbols({
					id: 'svg-%f',
					title: '%f icon', //default title can be overidden by providing a title in the svg
				})
			)

			//minify the svg if in production mode
			// .pipe(plugins.if(args.production, plugins.imagemin({
			// 	progressive: true,
			// 	svgoPlugins: [
			// 		{removeViewBox: false},
			// 		{cleanupIDs: false},
			// 		{removeUselessDefs: false},
			// 	],
			// })))
			.pipe(gulp.dest(dirs.temporary))
	);
};

const display_svg_help_messages = (done) => {
	const dest = dirs.temporary;
	const finalDest = [dest, 'svg-symbols.svg'].join('/');

	//letting the user know what is going on
	console.log(`
${plugins.util.colors.bold('Generated SVG sprite')}

Converted svgs from here: ${plugins.util.colors.yellow(
		[dirs.source, dirs.images, 'SVGs'].join('/')
	)}
Into an svg sprite that can be found here: ${plugins.util.colors.yellow(
		finalDest
	)}
Full SVGs are still available here: ${plugins.util.colors.yellow(
		[taskTarget, dirs.assets, dirs.images.replace(/^_/, ''), 'SVGs'].join('/')
	)}

Use an SVG from the sprite by using ${plugins.util.colors.green(
		'+svg("svg-file-name")'
	)} in your pug files
`);
	done();
};

gulp.task(
	'symbolize-svgs',
	gulp.series(symbolize_svgs, display_svg_help_messages)
);
