import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';

// Create Express app and declare the base directory
const app = express();
const BASE_DIR = path.dirname(fileURLToPath(import.meta.url));

// Add CORS middleware
app.use(cors())

// Requesting the root path returns a JSON array of map versions under `resources/dota_map`
app.get('/', (_req, res) => {
	const mapsPath = `${BASE_DIR}/resources/dota_map`
	const dotaMaps = fs.readdirSync(mapsPath, {
		withFileTypes: true
	}).reduce((a, c) => {
		c.isDirectory() && a.push(c.name)
		return a
	}, [])

	res.json(dotaMaps)
})

// Send the file if the requested resource (the path after the base URL) exists
app.get('/*', (req, res) => {
	// Extract the map and patch version values from the query strings
	const patchVersion = req.query.patch || "1.26a"
	const mapVersion = req.query.map || "7.00e4"

	let resource = req.params[0]
	
	// If `webp` query parameter is set, replace file extension with `webp`
	if (req.query.webp) resource = resource.replace(".blp", ".webp")

	// Get filename of resource before turning it to lowercase
	const filename = path.basename(resource)
	resource = resource.toLowerCase()

	// List of subpaths to check within the resources folder
	const resourceSubpaths = [
		`dota_map/${mapVersion}/${resource}`,
		`patch/${patchVersion}/${resource}`,
		`tft/${resource}`,
		`roc/${resource}`
	]
	
	// Return the index of subpath if exists, otherwise returns a -1
	const subpathIndex = resourceSubpaths.findIndex(subpath => {
		const resourcePath = `${BASE_DIR}/resources/${subpath}`
		return fs.existsSync(path.resolve(resourcePath))
	})
	
	// Send file if exists
	if (subpathIndex > -1) {
		const subpath = resourceSubpaths[subpathIndex]
		const resourcePath = `${BASE_DIR}/resources/${subpath}`

		res.set('Cache-Control', 'public, max-age=31557600') // set an aggressive caching
		res.set('Content-Disposition', `inline; filename=${filename}`) // set the filename

		return res.sendFile(resourcePath, filename)
	}
	
	// Return a 404 message if resource is not found
	res.status(404).send(
		"<strong>Error 404: Resource not found</strong>" 
		+ (
			req.query.webp 
			? "<br/>Try removing the <code>webp</code> query string parameter from the URL" 
			: ""
		)
		+ (
			req.query.patch 
			? "<br/>Try removing the <code>patch</code> query string parameter from the URL" 
			: ""
		)
	)
});

// Listen to the port set in the environment variables, defaults to 4000 if not exists
app.listen(process.env.PORT || 4000, () => console.log("Server is running"));