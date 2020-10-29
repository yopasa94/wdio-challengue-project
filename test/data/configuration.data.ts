interface IEnvironmentUrls {
  development: string;
  production: string;
}

const PAGE_URLS: IEnvironmentUrls = {
  development: 'http://dev.address.com/',
  production: 'http://prod.address.com/'
};

export default {
  PAGE_URLS,
};
