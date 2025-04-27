export const catchError = async (fn) => {
  try {
    await fn();
    console.log(`You are currently in ${process.cwd()}`);
  } catch (error) {
    // console.log('💥 ERROR: ', error);
    console.log('💥 ERROR');
  }
};
