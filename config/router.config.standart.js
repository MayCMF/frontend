export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      {
        name: 'Registration page',
        icon: 'smile',
        path: '/user/register',
        component: './user/Register',
      },
      {
        name: 'Personal settings',
        icon: 'smile',
        path: '/user/',
        component: './user/account',
      },
    ],
  },
  {
    path: '/admin',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/admin/AdminLayout',
        authority: ['root', 'admin'],
        routes: [
          {
            path: '/admin',
            redirect: '/admin/dashboard',
          },
          {
            path: '/admin/dashboard',
            name: 'Dashboard',
            icon: 'dashboard',
            component: './Admin', // authority: ['root'],
          },
          {
            name: 'Content',
            icon: 'unordered-list',
            path: '/admin/user/settings',
            component: './admin/account/settings',
          },
          {
            name: 'Structure',
            icon: 'cluster',
            path: '/admin/user/settings',
            component: './admin/account/settings',
          },
          {
            name: 'Setting',
            icon: 'setting',
            path: '/admin/user/settings',
            component: './admin/account/settings',
          },
          {
            name: 'People',
            icon: 'usergroup-add',
            path: '/admin/user/settings',
            component: './admin/account/settings',
          },
          {
            name: 'Reports',
            icon: 'bell',
            path: '/admin/user/settings',
            component: './admin/account/settings',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BlankLayout',
        authority: ['root', 'admin'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            name: '搜索列表（项目）',
            icon: 'smile',
            path: '/home',
            component: './home',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
