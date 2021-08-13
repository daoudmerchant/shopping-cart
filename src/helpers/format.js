const makeUrlFriendly = (string) => {
  return string
    .split(" ")
    .map((word) => word.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""))
    .join("-");
};

const capitalise = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const roundPrice = (number) => {
  return Number.parseFloat(number).toFixed(2);
};

export { makeUrlFriendly, capitalise, roundPrice };
