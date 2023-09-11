<template>
  <NuxtLink
    v-if="job"
    :to="goToJobPage()"
    class="flex job-item items-center justify-between p-2 container mx-auto rounded-md"
    :class="{
      'job-item > active':
        new Date(job.plan?.expireDate) >= new Date() && showPlanExpireDate(),
      'job-item > inactive':
        job.plan !== undefined && new Date(job.plan?.expireDate) < new Date(),
    }"
  >
    <div class="flex">
      <figure class="avatar w-20 h-20 rounded mr-2">
        <img
          style="height: 100%; object-fit: cover"
          :src="returnServerHostUrl() + job.company?.logo"
        />
      </figure>

      <div class="flex flex-col justify-center">
        <h5 class="title text-xl font-bold">
          {{ parseEscapedText(job.title) }}

          <template v-if="showPlanExpireDate()">
            <span
              v-if="
                planTimeRemaining &&
                new Date(job.plan?.expireDate) >= new Date()
              "
              class="plan-time-diff > active"
              >Active &#183; {{ planTimeRemaining }} days remaining
            </span>
            <span v-else class="plan-time-diff > inactive">Expired</span>
          </template>
        </h5>
        <h6 class="text-left">
          <span class="font-semibold">{{ job.company?.name }}</span>
          {{ job.location }} <span>&#9757;</span>
          {{ formatRemoteType(job.remoteType) }}
        </h6>
      </div>
    </div>

    <div class="flex flex-col flex-wrap justify-between">
      <div class="flex">
        <JobItemTag
          :tag-type="'salary-range'"
          :value="`${formatCurrencySign(job.currency)}${formatMoney(
            job.minSalary
          )} - ${formatCurrencySign(job.currency)}${formatMoney(
            job.maxSalary
          )}`"
          class="mr-2"
        />
        <JobItemTag :tag-type="'location'" :value="'Romania'" />
      </div>
      <div>
        <span class="font-bold mr-2">{{ formatJobType(job.type) }}</span>
        {{ formattedCreatedAt() }}
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const route = useRoute();
const dayjs = useDayjs();

import {
  formatRemoteType,
  formatJobType,
  parseEscapedText,
  formatCurrencySign,
  formatMoney,
} from "~/utils/jobs";

const props = defineProps({
  job: { type: Object, required: true },
});

function planTimeRemaining() {
  if (!props.job.plan) return "";

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(
    Math.abs(
      (new Date(props.job.plan.expireDate).getTime() - new Date().getTime()) /
        oneDay
    )
  );

  return diffDays;
}

function showPlanExpireDate() {
  return props.job.plan && route.path !== "/";
}

function formattedCreatedAt() {
  return props.job.plan?.planRenewed
    ? dayjs(props.job.plan?.planRenewed).fromNow()
    : "";
}

// TODO: put global function
function returnServerHostUrl() {
  return process.env.NODE_ENV === "production"
    ? window.location.origin + "/"
    : "http://localhost:4000/";
}

function goToJobPage() {
  const routeName = route.name;

  switch (routeName) {
    case "account-jobs-list":
      return `/add-job?id=${props.job.jobId}&option=preview`;
    default:
      return `/jobs/123`; // TODO: handle routing on job id like this: company + job title
  }
}
</script>

<style lang="scss" scoped>
@import "./design/variables";

.job-item {
  background-color: #ffffff; // TODO: replace with variable
  &.active {
    border: 1px solid green;
  }

  &.inactive {
    border: 1px solid red;
  }
}

.plan-time-diff {
  font-weight: bold;
  font-size: 14px;

  &.active {
    color: green;
  }

  &.inactive {
    color: red;
  }
}
</style>
