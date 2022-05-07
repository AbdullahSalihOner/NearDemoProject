#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$MEMBER" ] && echo "Missing \$MEMBER environment variable"

read -p "Enter MemberId: " id
echo
echo "You entered $id"

echo
echo 
echo near call \$CONTRACT pay '{"id":"$id","amount":"0000000000000000000000000"}' --account_id $MEMBER
echo
echo \$CONTRACT is $CONTRACT
echo \$MEMBER is $MEMBER
echo "--------------------------------------------"

echo
echo "--------------------------------------------"
near call $CONTRACT pay '{"id":'"$id"',"amount":"'"0000000000000000000000000"'"}' --account_id $MEMBER