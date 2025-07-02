const awsConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_BOKHw2GCY',
    userPoolWebClientId: '5co820i47mua52vprm3oqgk2q5',
    oauth: {
      domain: 'us-east-1bokhw2gcy.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'openid', 'phone'],
      redirectSignIn: 'http://localhost:3000/',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code',
    },
  },
};

export default awsConfig;

