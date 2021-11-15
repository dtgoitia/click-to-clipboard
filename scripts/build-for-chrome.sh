#!/usr/bin/env bash

CHROME_BIN="google-chrome-stable"
JS_EXTENSION_DIR="_transpiled_js"
DIST_DIR="dist"

# build extension
npm run build

# Change manifest to only be available at the allowed URLs
#  *://*/*  -->  https://karatstudio.karat.io/pad/*
text_to_replace="\"\*:\/\/\*\/\*\""
allowed_url="\"https:\/\/karatstudio\.karat\.io\/pad\/\*\", \"https:\/\/karatstudio\.karat\.io\/interview\/\*\""  # The extension will only appears when the user navigates to this URL
manifest_file="${JS_EXTENSION_DIR}/manifest.json"
sed -i "s/${text_to_replace}/${allowed_url}/g" $manifest_file

# pack extension into a .crx file
$CHROME_BIN --pack-extension=$JS_EXTENSION_DIR || true

# clean up unnecessary files
[ -d $DIST_DIR ] && rm -rf $DIST_DIR
packed_extension_key_path="${JS_EXTENSION_DIR}.pem"
rm $packed_extension_key_path

# move packed extension to dist folder
mkdir -p $DIST_DIR
packed_extension_path="${JS_EXTENSION_DIR}.crx"
mv $packed_extension_path "${DIST_DIR}/clic-to-clipboard.crx"

# report
echo "Done!"
