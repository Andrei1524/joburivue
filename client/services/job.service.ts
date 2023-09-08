const JobService = {
  getJobs: async () => {
    const { pending, error, data } = await useFetchData('/jobs', {
      method: 'get',
    });
    return { pending, error, data };
  },
};

export default JobService;
