export const formatRemoteType = (type: string) => {
  if (type === "remote_allowed") {
    return "Remote Allowed";
  } else if (type === "work_remotely") {
    return "Work Remotely";
  }
};

// TODO: refactor to switch case
export const formatJobType = (jobType) => {
  if (jobType === "full_time") {
    return "Full-time";
  } else if (jobType === "part_time") {
    return "Part-time";
  } else if (jobType === "freelance") {
    return "Freelance";
  } else if (jobType === "internship") {
    return "Internship";
  } else if (jobType === "temporary") {
    return "Temporary";
  }
};

export const parseEscapedText = (escapedText) => {
  return escapedText;
  // const parser = new DOMParser();
  // const dom = parser.parseFromString(
  //   "<!doctype html><body>" + escapedText,
  //   "text/html"
  // );
  // return dom.body.textContent;
};

export const formatMoney = (value: number) => {
  return Math.abs(value) > 999
    ? Math.sign(value) * Number((Math.abs(value) / 1000).toFixed(1)) + "k"
    : Math.sign(value) * Math.abs(value);
};

export const formatCurrencySign = (currency) => {
  switch (currency) {
    case "euro":
      return "€";

    case "ron":
      return "RON";
  }
};
