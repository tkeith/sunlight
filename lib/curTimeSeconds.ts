import curTimeMs from "./curTimeMs";

export default function curTimeSeconds() {
  return Math.floor(curTimeMs() / 1000)
}
