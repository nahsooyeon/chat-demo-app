import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

export const getFormattedDate = (timestamp: Timestamp) => {
  const date = timestamp?.toDate();
  let result = "";

  result = dayjs(date).format("A hh:mm");

  return result;
};

export const getPassedDate = (
  main: Timestamp,
  compared: Timestamp | undefined
) => {
  let result = "";
  const mainDate = main?.toDate();
  const comparedDate = compared?.toDate();
  if (typeof mainDate === "undefined") {
    return result;
  } else if (typeof compared === "undefined") {
    /* 날짜 비교할 채팅이 없는 경우 */
    return (result = dayjs(mainDate).format("YYYY. M. D"));
  }

  if (mainDate?.getDate() === comparedDate?.getDate()) {
    /* 두 채팅의 작성 날짜가 같은 경우 빈 문자열 리턴 */
    return result;
  } else {
    /* 이전채팅의 날짜와 다음채팅의 날짜가 다를 때만 리턴 */
    return (result = dayjs(mainDate).format("YYYY. M. D"));
  }
};
