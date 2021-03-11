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

Just extract the resources from your maps and MPQs from your Warcraft III directory to the respective folders. You must also generate the data of each map(s) using [wc3-dota-data-extractor](https://github.com/jp06/wc3-dota-data-extractor) by loading a map into it and putting the output `data.json` to `resources/dota-map/<map_version>/data.json`. You must also process all the folders and files inside the `resources` folder to be lowercase, or you're gonna encounter trouble if you try to host it at an OS where paths are case-sensitive. I've been bitten by this, and spent quite some time trying to figure out why on earth some assets are not loading when I deployed this.

Here's the batch script snippet I used for Windows to turn all file and folder names to lowercase in the directory. Just put it inside a `.bat` file and run. Source (but with an `a-d` switch that excludes directories): https://superuser.com/a/1103766
```bat
:: You can run the file inside the `resources` directory to lowercase everything there
:: or replace the `.` inside the parenthesis with a directory you prefer before running
for /r %%D in (.) do @for /f "eol=: delims=" %%F in ('dir /l/b "%%D"') do @ren "%%D\%%F" "%%F"
```

Or you can just download [this](https://github.com/jp06/wc3-dota-info-api/releases/download/v1.0/resources.7z) to save you some trouble and extract and merge the `resources` folder to the main directory. This contains data and resources for v7.00e4 and files from RoC and TFT that should be enough allow you to serve all WC3 resources needed to the front end. The only BLP files that have their WEBP counterparts are the button icons.