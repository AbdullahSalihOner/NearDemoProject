#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1

echo
echo

read -p "Enter MemberId: " id
echo
echo "You entered $id"

echo
echo --------------------------------------------
echo
echo "CONTRACT is [ $CONTRACT ]"
echo
echo
echo near view $CONTRACT getById '{"id":"$1"}'
echo

near view $CONTRACT getById '{"id":'"$id"'}'