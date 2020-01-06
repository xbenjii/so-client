import typescript from 'rollup-plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: './src/client.ts',
    output: {
        dir: 'build',
        format: 'cjs'
    },
    plugins: [
        resolve(),
        typescript()
    ]
}