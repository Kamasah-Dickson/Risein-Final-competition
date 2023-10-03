import { BigNumber, BigNumberish } from "ethers";

export default function formatTimeRemaining(
  unixTimestamp: BigNumberish
): string {
  // Get the current time in seconds
  const now = Math.floor(Date.now() / 1000);

  // Calculate the time difference between now and the input timestamp
  const timeDifference = BigNumber.from(unixTimestamp).sub(now).toNumber();

  // Convert the time difference to seconds, minutes, hours, or days
  if (timeDifference < 60) {
    return `${timeDifference} seconds`;
  } else if (timeDifference < 3600) {
    return `${Math.floor(timeDifference / 60)} minutes`;
  } else if (timeDifference < 86400) {
    return `${Math.floor(timeDifference / 3600)} hours`;
  } else {
    return `${Math.floor(timeDifference / 86400)} days`;
  }
}
