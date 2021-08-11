const makeUrlFriendly = (string) => {
  return string
    .split(" ")
    .map((word) => word.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""))
    .join("-");
};

export default makeUrlFriendly;
