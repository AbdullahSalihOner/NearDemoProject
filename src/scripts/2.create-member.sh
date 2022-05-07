
#!/usr/bin/env bash
#!/bin/bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$MEMBER" ] && echo "Missing \$MEMBER environment variable" && exit 1


echo "MEMBER TYPES;"
echo 1 is "1month"
echo 2 is "6month"
echo 3 is "12month"

echo -p "Enter MemberTypeId: " 
read ID
echo "You entered $ID"

echo
echo 'About to call create() on the contract'
echo near call \$CONTRACT create '{"memberType":"1month"}' --accountId 
echo
echo \$CONTRACT is $CONTRACT
echo \$MEMBER is $MEMBER
echo "--------------------------------------------"
echo "--------------------------------------------"

if [[ $ID -eq 1 ]]
then  
  echo "You created 1month membership."
  near call $CONTRACT create '{"memberType":"1month"}' --account_id $MEMBER
elif [[ $ID -eq 2 ]]  
then 
  echo "You created 6month membership."
  near call $CONTRACT create '{"memberType":"6month"}' --account_id $MEMBER
elif [[ $ID -eq 3 ]]
then
  echo "You created 1month membership."
  near call $CONTRACT create '{"memberType":"12month"}' --account_id $MEMBER
fi


