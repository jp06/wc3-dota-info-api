# WC3 DotA Info API

Simple Express API server for serving Warcraft III resources hero models, textures and icons. Back end part of [WC3 DotA Info](https://github.com/jp06/wc3-dota-info) web app.

## How to use

1. Run `npm install` once first.

2. Download this [sample resource assets](https://github.com/jp06/wc3-dota-info-api/releases/download/v1.0/resources.7z) archive and extract the contents to the `resources` directory, this contains the data and resources for 7.00e4 and files from RoC and TFT. The only BLP files that have their WEBP counterpart are the button icons. If you need to add more resources, [refer to here](https://github.com/jp06/wc3-dota-info-api/tree/main/resources#readme).

3. Run `npm start` to start listening to requests.

## Requesting a resource

To request a resource, just append the WC3 resource path to the request. You can also add a `map` query parameter to your request URL with the value of your specified map version if you need the resource from the map. You can also convert BLP textures to WEBP and place it in the same folder, so that one can request it by adding `webp=true` to the query string in the request URL.

### Examples

If you're running locally in development mode and you're trying to request `Units\Other\DranaiAkama\DranaiAkama.mdx`, send a GET request to the URL:

> http://localhost:4000/Units\Other\DranaiAkama\DranaiAkama.mdx

If you need the resource from a map of a certain version:

> http://localhost:4000/Units\Other\DranaiAkama\DranaiAkama.mdx?map=7.00e4

If you want to request a WEBP version of a BLP file:

> http://localhost:4000/ReplaceableTextures/CommandButtons\BTNTichondrius.blp?webp=true

If you want to request a WEBP version of a BLP file from a map of a certain version:

> http://localhost:4000/ReplaceableTextures/CommandButtons\BTNTichondrius.blp?map=7.00e4&webp=true

## Converting BLP files to WEBP

I'm not aware of any way surefire way to directly convert from BLP to WEBP. There is XnConvert but it doesn't support some BLP files. 

So what I did instead was convert them to PNG first before converting to WEBP. I inputted the directory of BLP files I wanted to convert to BLP Lab's batch converter, set the output file format to PNG, and set the output directory to the same folder. I then finally converted the PNG files to WEBP using XnConvert.

## To-do list

* Combine RoC and TFT resources.
* Make map version optional to prevent redundant caching of RoC/TFT resources once there are more map versions.
* Implement something to avoid redundant map resources from across map versions (maybe using hashes or something).