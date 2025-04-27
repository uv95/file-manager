export const catchError = (fn) => {
  try {
    fn();
  } catch (error) {
    console.log('💥 ERROR: ', error);
  }
};
