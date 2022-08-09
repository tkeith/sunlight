import dateFromMs from "./dateFromMs";

export default function dateFromSeconds(timeInSeconds: number) {
  return dateFromMs(timeInSeconds * 1000);
}
