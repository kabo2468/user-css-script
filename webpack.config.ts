import { Configuration } from 'webpack';
import WebpackUserScript from 'webpack-userscript';

const config = (env: { dev: boolean; name: string }): Configuration => {
    const isDevMode = env.dev || false;
    const name = env.name;
    if (!name) {
        console.error('name is required!');
        process.exit(1);
    }
    return {
        context: __dirname,
        mode: isDevMode ? 'development' : 'production',
        devtool: isDevMode ? 'source-map' : false,
        cache: true,
        entry: `./src/${name}/index.ts`,
        output: {
            filename: `${name.toLowerCase()}${isDevMode ? '-dev' : ''}.js`,
            path: `${__dirname}/built/${name}`,
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'esbuild-loader',
                    exclude: /node_modules/,
                    options: {
                        loader: 'ts',
                        // target: 'ES2019',
                    },
                },
            ],
        },
        plugins: [
            new WebpackUserScript({
                headers: `./src/${name}/meta.json`,
            }),
        ],
        resolve: {
            extensions: ['.ts', '.js'],
        },
    };
};

export default config;
