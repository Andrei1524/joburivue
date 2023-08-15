import { modalsConstants } from "~/utils/constants";

export default function ({ store }) {
  // create n objects based on the modals constants
  initModalsList(store);
}

function initModalsList(store) {
  const data = {};

  for (const key in modalsConstants) {
    data[key] = { open: false, data: null };
  }

  store.commit("modals/initModalsList", data);
}
