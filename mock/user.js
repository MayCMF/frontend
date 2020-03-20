function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // The code will be compatible with local service mocks and static data of the deployment site

export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'Ivan Fesiuk',
    avatar: 'https://avatars2.githubusercontent.com/u/2290816',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: 'All ingenious is simple',
    title: 'Full Stack Developer',
    group: 'May CMF Developer.',
    tags: [
      {
        key: '0',
        label: 'Golang',
      },
      {
        key: '1',
        label: 'CMF',
      },
      {
        key: '2',
        label: 'ReactJS',
      },
      {
        key: '3',
        label: 'Lightway',
      },
      {
        key: '4',
        label: 'Casbin',
      },
      {
        key: '5',
        label: 'GORM',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'Ukraine',
    geographic: {
      province: {
        label: 'Lvivska',
        key: '330000',
      },
      city: {
        label: 'Lviv',
        key: '330100',
      },
    },
    address: 'Chornovola street',
    phone: '099-777-77-77',
  },
  // GET POST Can be omitted
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;

    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    if (password === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
