const Plan = require("../model/plan.model");
const Job = require("../model/job.model");

module.exports = (agenda: any) => {
  agenda.define(
    "schedule_plan_expire",
    async (agendaJobData: any, done: any) => {
      const { plan_id, job_id } = agendaJobData.attrs.data;

      await Job.findOneAndUpdate(
        { _id: job_id },
        { "plan.isPlanActive": false }
      );
      await Plan.findOneAndUpdate({ _id: plan_id }, { isPlanActive: false });
      return done();
    }
  );
};
