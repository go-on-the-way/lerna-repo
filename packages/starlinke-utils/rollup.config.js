
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import { terser } from 'rollup-plugin-terser';


export default {
  plugins: [
    nodeResolve(),
    commonjs(),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['lib/**'],
      exclude: ['node_modules/**']
    }),
    babel({
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true,       // 使plugin-transform-runtime生效
    }),
    terser()
  ]
}