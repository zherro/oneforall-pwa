export default function useHandleError(notify: any) {
  return (error) => {
    notify({
      status: "error",
      description: error.message,
    });
  };
}
