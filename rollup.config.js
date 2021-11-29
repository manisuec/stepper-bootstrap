/* eslint-disable import/no-anonymous-default-export */
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import { babel } from '@rollup/plugin-babel';


export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.min.js',
      format: 'cjs',
      plugins: [terser()],
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.min.js',
      format: 'esm',
      plugins: [terser()],
      sourcemap: true
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    babel({ babelHelpers: 'bundled', "presets": [["@babel/preset-react", {"runtime": "automatic"}]]}),
    commonjs(),
    typescript(),
    postcss()
  ],
  external: ['react', 'react-dom']
};
