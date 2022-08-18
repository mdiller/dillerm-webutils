import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [vue()],
	root: "src",
	define: {
		"process.env": {}
	},
	build: {
		outDir: resolve(__dirname, "build"),
		emptyOutDir: true,
		lib: {
			entry: resolve(__dirname, "src/components/index.js"),
			name: "dillerm",
			fileName: (format) => `dillerm.${format}.js`,
		}
	},
	rollupOptions: {
		external: ["vue"],
		output: {
			globals: {
				vue: "Vue",
			},
		},
	},
	server: {
		open: true
	}
})
