export const notificationServiceMixin = {
  created() {
    this.$nuxt.$on("startNotificationService", ({ type, error }) => {
      console.log("emit");

      if (type === "showError") {
        if (error.response.data.errors) {
          this.$buefy.toast.open({
            duration: 5000,
            message: error.response.data.errors.map((error: any, i: number) =>
              i > 0 ? "\n" + error.msg : error.msg
            ),
            position: "is-top-right",
            type: "is-danger",
          });
        } else {
          this.$buefy.toast.open({
            duration: 5000,
            message: error.response.data.message,
            position: "is-top-right",
            type: "is-danger",
          });
        }
      } else {
        // TODO: uncomment this if I want to handle succcess mesages in the future
        // this.$buefy.toast.open({
        //   duration: 5000,
        //   message: "Success!",
        //   position: "is-top-right",
        //   type: "is-success",
        // });
      }
    });
  },
};
