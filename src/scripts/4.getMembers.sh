#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1


echo
echo

echo "--------------------------------------------"

echo
echo "CONTRACT is [ $CONTRACT ]"
echo
echo
echo near view $CONTRACT get '{"record":0}'
echo
near view $CONTRACT get '{"record":0}'
echo
echo