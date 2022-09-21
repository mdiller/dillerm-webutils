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
	publicDir: "public",
	define: {
		"process.env": {}
	},
	build: {
		// minify: false,
		outDir: resolve(__dirname, "build"),
		emptyOutDir: true,
		lib: {
			entry: resolve(__dirname, "src/index.js"),
			name: "DillermWebUtils",
			fileName: (format) => `dillerm.${format}.js`,
		},
		rollupOptions: {
			// external: ["vue"], (this also needs this fix if we wanna use it: https://github.com/vitejs/vite/issues/3001)
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name == "style.css")
						return "dillerm.css";
					return assetInfo.name;
				},
				globals: {
					vue: "Vue",
				},
			},
		},
	},
	server: {
		open: true
	}
})
