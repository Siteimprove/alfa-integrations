#!/usr/bin/env bash

# This script relies on npm package.json variables and thus must be called
# through npm, yarn or the like to correctly set them.

set -eux

echo "// Generated by yarn alfa-postversion
export const name = \"$(node -e "console.log(process.env.npm_package_name)")\";
export const version = \"$(node -e "console.log(process.env.npm_package_version)")\";
"
