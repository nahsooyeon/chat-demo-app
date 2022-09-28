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
  if (typeof compared === "undefined") {
    return (result = dayjs(mainDate).format("YYYY. M. D"));
  }
  if (mainDate.getDate() === comparedDate?.getDate()) {
    return result;
  } else {
    return (result = dayjs(mainDate).format("YYYY. M. D"));
  }
};
