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
