# NearDemoProject-FitnessCenter

This repo is a demo of Near Smart Contract with assemblyscript. In the project I tried to create a system that does all the registration of the fitness center.

# Cloning the project
After cloning the project please run 

    yarn
in order to install all of the necessary packages for the project to run correctly.

## Building and Deploying the contract
The contract is located in under the ***assembly*** folder, after editing the contract you can run

    yarn build:release
in order to build the contract and get the ***.wasm*** file , if you want to build and deploy the contract at the same time, you can run 

    yarn dev
    
or you can run

     near dev-deploy ./build/release/simple.wasm
This will create a test account and deploy the contract into it.

after the contract is deployed, it is necessary to run the following command in the terminal in order to be able to run the contract

    export CONTRACT=ACCOUNT_ID
where the **ACCOUNT_ID** will be returned after the contract deployment


### Project Description

In this Near demo project, We will make the system that performs the membership transactions of Fitness Center.
-------------------------

# FUNCTIONS
------------------------
## Create
 -  We create member with the create function.  The type of the member is the parameter we send in the function. The amount in the wallet of each created member is 96.
        
        near call $CONTRACT create '{"memberType":"1month"}' --accountId asoner.testnet 
    
## GetById
 - We can find the member by sending the id parameter with getById
 
        near view $CONTRACT getById '{"id":member_id}'

## GetMembers
 - Call all records
 
        near view $CONTRACT get '{"record":0}'
        
## PayFee
 - Payment system
 - There are 3 different recording models, we provide it here with the if-else block.
 - Also we create warnings for credits and wrong member
 - A premium membership system will be added here later.
 
        near call $CONTRACT pay '{"id":3693724481,"amount":"3000000000000000000000000"}' --accountId asoner.testnet
        
        
 ## ActivateMember
  - Members who have 6-month and 12-month memberships, have the right to freeze and activate their memberships.

        near call $CONTRACT activate '{"id":3693724481 }' --accountId asoner.testnet
        
## FreezeMember
 - Members who have 6-month and 12-month memberships, have the right to freeze and activate their memberships.
 - 1 month members do not have the right to freeze.
