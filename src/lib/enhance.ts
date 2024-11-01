import type { Writable } from "svelte/store";



  // Enhance the form with a custom callback
  export const handleEnhance = (loading: Writable<boolean>) => {
    loading.set(true); // Set loading to true when the form starts submitting

    return ({ update }) => {
      // Update the form data and reset loading state after completion
      return update({ invalidateAll: false }).finally(() => {
        loading.set(false); // Set loading to false when done
      });
    };
  };