import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

const getFormatedDate = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  let result = "";

  if (dayjs(date).isToday()) {
    result = dayjs(date).format("A hh:mm");
  } else {
    result = dayjs(date).format("YY-MM-DD HH:mm");
  }
  return result;
};

export default getFormatedDate;
