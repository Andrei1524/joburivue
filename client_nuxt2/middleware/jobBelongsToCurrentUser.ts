import _ from "lodash";
import * as JobService from "~/services/job.service";

export default async function (context) {
  const { query } = context.route;

  if (
    !_.isEmpty(query) &&
    query.id &&
    query.id.length > 0 &&
    query.option &&
    query.option.length > 0
  ) {
    const payload = `${query.id}/${query.option}`;

    try {
      await JobService.getJob(context.$axios, payload);
    } catch (error) {
      context.redirect("/");
    }
  }
}
