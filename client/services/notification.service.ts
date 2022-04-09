export const NotificationService = {
  showError(vm: any, response: any) {
    if (response.response.data.errors) {
      vm.$buefy.toast.open({
        duration: 5000,
        message: response.response.data.errors.map((error: any, i: number) =>
          i > 0 ? "\n" + error.msg : error.msg
        ),
        position: "is-top-right",
        type: "is-danger",
      });
    } else {
      vm.$buefy.toast.open({
        duration: 5000,
        message: response.response.data.message,
        position: "is-top-right",
        type: "is-danger",
      });
    }
  },

  showSuccess(vm: any, response: any) {
    vm.$buefy.toast.open({
      duration: 5000,
      message: "Success!",
      position: "is-top-right",
      type: "is-success",
    });
  },
};
