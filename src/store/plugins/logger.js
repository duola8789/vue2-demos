export const logger = store => {
  console.log('logger plugin is called');
  store.subscribe((mutation, state) => {
    console.log(mutation, 'mutation in plugin');
  })
};
