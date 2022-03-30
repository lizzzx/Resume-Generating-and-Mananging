export function toFormattedString(date) {
  return `${toFormattedDateString(date)} ${toFormattedTimeString(date)}`;
}

export function toFormattedDateString(date) {
  return `${date.getFullYear()}-${completedDateString(
    date.getMonth() + 1
  )}-${completedDateString(date.getDate())}`;
}

export function toFormattedTimeString(date) {
  return `${completedDateString(date.getHours())}:${completedDateString(
    date.getMinutes()
  )}`;
}

export function completedDateString(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number.toString();
}
