#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$MEMBER" ] && echo "Missing \$MEMBER environment variable" && exit 1


read -p "Enter MemberId: " id
echo
echo "You entered $id"



echo
echo 'About to call activate() on the contract'
echo near call $CONTRACT cancel '{"id":"$id"}' --account_id  $MEMBER 
echo
echo
echo \$CONTRACT is $CONTRACT
echo \$MEMBER is $MEMBER
echo "--------------------------------------------"

echo
near call $CONTRACT cancel '{"id":'"$id"'}' --account_id $MEMBER