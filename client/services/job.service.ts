const JobService = {
  getJobs: async () => {
    const { pending, error, data } = await useFetchData('/jobs', {
      method: 'get',
    });
    return { pending, error, data };
  },

  getJobsCreatedByUser: async (payload: any) => {
    const { pending, error, data } = await useFetchData(
      `/jobs/userJobs?userJobs=true&createdBy=${payload.value._id}`,
      {
        method: 'get',
      }
    );
    return { pending, error, data };
  },
};

export default JobService;
