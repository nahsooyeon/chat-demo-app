/* 채팅방 데이터의 참가자 목록으로 받았을 때, 대화하고 있는 상대방의 이메일을 체크하는 함수 */

import { User } from "firebase/auth";

const getFriendEmail = (users: Array<string>, currentUser: User) => {
  return users?.filter((user) => user !== currentUser.email)[0];
};

export default getFriendEmail;
