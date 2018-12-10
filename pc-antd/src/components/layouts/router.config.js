export default [
      { path: '/', redirect: '/search' },
      {
        path: '/search',
        name: 'app.searchpage',
      },
      {
        path: '/abnormals',
        name: 'machine.abnormal',
      },
      {
        path: '/machines',
        name: 'machine.all',
      },
      {
        path: '/distribution',
        name: 'machine.distribution',
      },
];
