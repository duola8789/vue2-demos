export const logger = store => {
  console.log('Logger plugin in Vuex Store is called');
  store.subscribe((mutation, state) => {
    console.log(mutation, 'mutation in plugin');
  })
};
