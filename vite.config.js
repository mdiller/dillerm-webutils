import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import svgLoader from "vite-svg-loader"
import { quasar, transformAssetUrls } from "@quasar/vite-plugin"

/** @type {import("vite").UserConfig} */
export default defineConfig({
	plugins: [
		vue({
			template: { transformAssetUrls }
		}),
		svgLoader()
	],
	root: "src",
	define: {
		"process.env": {}
	},
	build: {
		outDir: resolve(__dirname, "build"),
		emptyOutDir: true,
		lib: {
			entry: resolve(__dirname, "src/index.js"),
			name: "DillermWebUtils",
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
