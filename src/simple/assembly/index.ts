import { u128 } from 'near-sdk-as';
import { Member } from './model';

export function create(memberType: string): Member {
  return Member.createMember(memberType);
}

export function cancel(id: u32): void {
  Member.cancelMember(id);
}

export function getById(id: u32): Member {
  return Member.getById(id);
}

export function get(record: u32,limit: u32 = 96): Member[] {
  return Member.getMembers(record,limit);
}

export function pay(id: u32, amount:u128): Member{
  return Member.payFee(id,amount);
}

export function freeze(id: u32): Member {
  return Member.freezeMember(id);
}

export function activate(id: u32): Member {
  return Member.activateMember(id);
}