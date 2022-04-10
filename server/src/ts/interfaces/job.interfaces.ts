interface JobInterface {
  title: string;
  type: string;
  level: string;
  description: string;
  tags: string;
  location: string;
  remoteType: string;
  howToApply: string;
  applicationTarget: string;
  currency: string;
  minSalary: number;
  maxSalary: number;
}

export { JobInterface };
