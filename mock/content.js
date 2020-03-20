const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];
const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  "Це внутрішня річ, вони не можуть її досягти, вони не можуть її торкнутися",
   "Надія - це добра штука, можливо, найкраща, і добрі речі не вимернуть",
   "Життя - це як коробка цукерок, а результати часто несподівані",
   "У місті так багато пабів, але вона просто зайшла в мій паб",
   "У той час я думав лише про те, чого я хотів, і ніколи не хотів того, що мав",
];
const types = [
  'page',
  'articles',
  'news',
  'blog',
];
const user = [
  'Fu Xiaoxiao',
  'Qu Lili',
  'Lin Dongdong',
  'Zhou Xingxing',
  'Wu Jiahao',
  'Zhu right',
  'Fish sauce',
  'Le Ge',
  'Tan Xiaoyi',
  'Zhongni',
];

function fakeList(count) {
  // const response = [];
  const list = [];
  const pagination = [];

  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      creator: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      type: types[i % 4],
      status: Math.floor(Math.random() * Math.floor(2)),
      images: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      // status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updated_at: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      created_at: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      subDescription: desc[i % 5],
      description:
        'Під час розробки продуктів Zhongtai з\'являться різні технічні характеристики та методи реалізації, але часто існує багато подібних сторінок та компонентів, і ці подібні компоненти будуть розділені на набір стандартних специфікацій.',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        'У пункті зазначено: платформа Ant Financial Design ant.design, з мінімальним навантаженням, безперешкодно отримує доступ до екосистеми Ant Financial, надаючи досвід рішення, що охоплює дизайн та розробку. Платформа Ant Financial Design ant.design, з мінімальним навантаженням, безперебійно підключається до екосистеми Ant Financial, надаючи практичні рішення, що охоплюють дизайн та розробку.',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: 'John Qsef',
          id: 'member1',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: 'Melody Melon',
          id: 'member2',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: 'Some Another',
          id: 'member3',
        },
      ],
    });
  }

  const response = {
    list: list,
    pagination: {
      total: count,
      current: 1,
      pageSize: 50
    }
  }

  return response;
}

function getContentList(req, res) {
  const params = req.query;
  const count = params.count * 1 || 20;
  const result = fakeList(count);
  return res.json(result);
}

export default {
  'GET /api/content': getContentList,
};