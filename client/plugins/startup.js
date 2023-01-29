import { modalsConstants } from "~/utils/constants";

export default function ({ store }) {
  const data = {};

  for (const key in modalsConstants) {
    data[key] = { open: false, data: null };
  }

  store.commit("modals/initModalsList", data);
}
