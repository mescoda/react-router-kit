
import pkg from './package.json';

import babel from 'rollup-plugin-babel';

const external = (id) => {
    return !id.startsWith('.') && !id.startsWith('/');
};

const cjs = [
    {
        input: 'src/index.js',
        output: {
            file: `dist/cjs/${pkg.name}.js`,
            format: 'cjs'
        },
        external,
        plugins: [
            babel({
                exclude: '/node_modules/',
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                ie: 11
                            },

                            // disable BrowserslistConfig
                            ignoreBrowserslistConfig: true,

                            // Do not transform modules to CJS
                            modules: false
                        }
                    ],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-object-rest-spread'
                ]
            })
        ]
    }
];

const esm = [
    {
        input: 'src/index.js',
        output: {
            file: `dist/esm/${pkg.name}.js`,
            format: 'esm'
        },
        external
    }
];

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.main,
                format: 'cjs'
            },
            {
                file: pkg.module,
                format: 'esm'
            }
        ],
        external,
        plugins: [
            babel({
                exclude: '/node_modules/',
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                ie: 11
                            },

                            // disable BrowserslistConfig
                            ignoreBrowserslistConfig: true,

                            // Do not transform modules to CJS
                            modules: false
                        }
                    ],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-object-rest-spread'
                ]
            })
        ]
    }
];
