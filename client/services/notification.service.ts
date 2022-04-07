export default function showAlert(vm: any, error: any) {
  if (error.response.data.errors) {
    vm.$buefy.toast.open({
      queue: true,
      duration: 507700,
      message: error.response.data.errors.map((error: any, i: number) =>
        i > 0 ? "\n" + error.msg : error.msg
      ),
      position: "is-top-right",
      type: "is-danger",
    });
  }
}
