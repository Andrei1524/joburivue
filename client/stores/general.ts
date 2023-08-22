import { AlertInterface } from 'interfaces/general';

export const useGeneralStore = defineStore('general-store', () => {
  const alert = ref<AlertInterface>({ text: '', show: false });

  function setAlert(payload: AlertInterface) {
    alert.value!.text = payload.text;
    alert.value!.show = payload.show;
  }

  return { alert, setAlert };
});

// In Setup Stores:

// ref()s become state properties
// computed()s become getters
// function()s become actions
