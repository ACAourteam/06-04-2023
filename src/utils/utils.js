export function toCountTime(time) {
  const year = new Date(time).getFullYear();
  const month = new Date(time).getMonth() + 1;
  const day =
    new Date(time).getDate() < 10
      ? "0" + new Date(time).getDate()
      : new Date(time).getDate();
  const hours =
    new Date(time).getHours() < 10
      ? "0" + new Date(time).getHours()
      : new Date(time).getHours();
  const minutes =
    new Date(time).getMinutes() < 10
      ? "0" + new Date(time).getMinutes()
      : new Date(time).getMinutes();

  return `${year}/${month}/${day}/${hours}:${minutes}`;
}
