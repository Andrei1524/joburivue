const Plan = require("../model/plan.model");

module.exports = (agenda: any) => {
  agenda.define("schedule_plan_expire", async (plan: any, done: any) => {
    const plan_id = plan.attrs.data.plan_id;

    await Plan.findOneAndUpdate({ _id: plan_id }, { isPlanActive: false });
    return done();
  });
};
