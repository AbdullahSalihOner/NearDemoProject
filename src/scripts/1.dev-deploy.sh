#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"
[ -z "$MEMBER" ] && echo "Missing \$MEMBER environment variable"

echo "deleting $CONTRACT and setting $MEMBER as beneficiary"
echo
near delete $CONTRACT $MEMBER

echo --------------------------------------------
echo
echo "cleaning up the /neardev folder"
echo
rm -rf ./neardev

# exit on first error after this point to avoid redeploying with successful build
set -e

echo --------------------------------------------
echo
echo "rebuilding the contract (release build)"

yarn build:release

echo
echo
echo ---------------------------------------------------------
echo "redeploying the contract"
echo
echo 
echo ---------------------------------------------------------
echo


near dev-deploy ./build/release/simple.wasm

echo
echo
echo ---------------------------------------------------------
echo 
echo
echo "(a) find the contract (account) name in the message above"
echo "    it will look like this: [ Account id: dev-###-### ]"
echo
echo "(b) set an environment variable using this account name"
echo "    see example below (this may not work on Windows)"
echo
echo ---------------------------------------------------------
echo "run the following commands"
echo
echo 'export CONTRACT=<dev-123-456>'
echo 'export OWNER=<your own account>'
echo 

echo ---------------------------------------------------------
echo

exit 0