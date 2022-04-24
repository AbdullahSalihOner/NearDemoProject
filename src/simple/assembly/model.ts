import{
    PersistentUnorderedMap,
    math,
    u128,
    ContractPromiseBatch,
    context,
} from "near-sdk-as";


export const memberRecords = new PersistentUnorderedMap<u32,Member>(
    "memberRecords",
);


export const THREE_NEAR = u128.from("3000000000000000000000000");//premium cost
export const EIGHT_NEAR = u128.from("8000000000000000000000000");//1 month registration fee
export const FORTY_NEAR = u128.from("40000000000000000000000000");//6 month registration fee
export const SEVENTY_NEAR = u128.from("70000000000000000000000000");//12 month registration fee
export const TOTAL_NEAR = u128.from("96000000000000000000000000");//The total amount that must be on the card for registration
export const CONTRACT_NAME = "dev-1650368125305-75689629725772";


@nearBindgen
export class Member{
    id: u32;
    memberType: string;
    member: string;
    premium: boolean;
    credits: u128;
    active: boolean;


    constructor(memberType: string){
        this.id = math.hash32<string>(memberType);
        this.member = context.sender;
        this.memberType = memberType;
        this.premium = context.attachedDeposit >= THREE_NEAR;//For premium membership but I  cannot finish yet 
        this.active = true; // after createMember sitiuation is active so TRUE 
        this.credits = TOTAL_NEAR;

    }



    
    static createMember(memberType: string): Member {
        //There are three types of membership
        //near call $CONTRACT create '{"memberType":"1month"}' --accountId asoner.testnet   
        //near call $CONTRACT create '{"memberType":"6month"}' --accountId asoner2.testnet   
        //near call $CONTRACT create '{"memberType":"12month"}' --accountId asoner3.testnet  
        const memberRecord = new Member(memberType);

        memberRecords.set(memberRecord.id, memberRecord);
        return memberRecord;

       
    }



    // Call record with Id
    static getById(id: u32): Member {
        //near view $CONTRACT getById '{"id":member_id}'
        //1642111412
        
        return memberRecords.getSome(id);
    }



    //Call all records
    static getMembers(record: u32, limit: u32): Member[] {
        //near view $CONTRACT get '{"record":0}' 


        // and collect all members until we reach the record + limit 
        return memberRecords.values(record, record+limit);
    }









    //Payment system
    static payFee(id: u32, amount: u128): Member {

    
    //near call $CONTRACT pay '{"id":1642111412,"amount":"0000000000000000000000000"}' --accountId $CONTRACT   *ONLY THE MEMBERSHİP CAN PAY*
    //near call $CONTRACT pay '{"id":1642111412,"amount":"0000000000000000000000000"}' --accountId asoner.testnet

    const memberRecord = memberRecords.getSome(id);
    const isPremium = memberRecord.premium
    const membership = memberRecord.member;
    const caller = context.sender;
    let credit = memberRecord.credits;
    const type = memberRecord.memberType;
    
        //we create a warning for credits and members
    assert(membership == caller, "ONLY THE MEMBERS CAN PAY");
    assert(credit >= amount, "your credit is insufficient");
    
    //Membership's price change acording to type of membership
    if (type == "1month") {
        amount = EIGHT_NEAR;
    } 
    else if (type == "6month") {
        amount = FORTY_NEAR;
    }
    else if (type == "12month"){
        amount = SEVENTY_NEAR;
    }
    
    //Still I cann not add premium members system, I wıll add
    const fitnessCenter = ContractPromiseBatch.create(caller);
    fitnessCenter.transfer(amount);

    memberRecord.credits = u128.sub(credit, amount);
    memberRecords.set(memberRecord.id, memberRecord);

    return memberRecord;

    }




    //Membership activating
    static activateMember(id: u32): Member{
    //near call $CONTRACT activate '{"id":117239162 }' --accountId asoner3.testnet

    //we fetch the id to use
    const memberRecord = this.getById(id);


    //Member can activate membership
    memberRecord.active = true;
    memberRecords.set(id, memberRecord); 

    return memberRecord;
    }




    //Membership freezing
    static freezeMember(id: u32): Member {
    //near call $CONTRACT freeze '{"id":117239162 }' --accountId asoner3.testnet
    

    //we fetch the id to use
    const memberRecord = this.getById(id);

    
    //we assign the value of memberType to use
   const type = memberRecord.memberType;
    //We create a warning for 1month member type 
   assert(type!="1month","1month type of membership can not be freezed");
   
    //we change active stiuation
   memberRecord.active = false;
   memberRecords.set(id, memberRecord); 

   return memberRecord;

    }



    //Mambership Canceling
    static cancelMember(id: u32): void{
        // near call $CONTRACT cancel '{"id":117239162 }' --accountId asoner3.testnet

    const memberRecord = memberRecords.getSome(id);
    const member = memberRecord.member;
    const caller = context.sender;
        //WE create a warning for wrong user
    assert(
        member == caller || CONTRACT_NAME == caller,
        "ONLY MEMBER CAN CANCEL THE MEMBERSHIP"
    );
    memberRecords.delete(id);
    }
}