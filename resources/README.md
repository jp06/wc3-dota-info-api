Your `resources/` directory must have the following structure:

```
├── dota_map
│   ├── 6.83d
│   │   └── ...map resources here
│   └── 7.00e4
│       └── ...map resources here
├── patch
│   └── 1.26a
│       └── ...patch resources here (from `War3patch.mpq` of patch version)
├── roc
│   └── ...RoC resources here (from `war3.mpq`)
└── tft
    └── ...TFT resources here (from `War3x.mpq`)
```

Just extract the resources from your maps and MPQs from your Warcraft III directory to the respective folders. You must also generate the data of each map(s) using [wc3-dota-data-extractor](http://) by loading a map into it and putting the output `data.json` to `resources/dota-map/<map_version>/data.json`. You must also process all the folders and files inside the `resources` folder to be lowercase, or you're gonna encounter trouble if you try to host it at an OS where paths are case-sensitive. I've been bitten by this, and spent quite some time trying to figure out why on earth some assets are not loading when I deployed this.

Or you can just download this to save you some trouble and extract the contents to the `resources` directory. This contains data and resources for 7.00e4 and files from RoC and TFT. The only BLP files that have their WEBP counterpart are the button icons.