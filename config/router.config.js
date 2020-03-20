export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        component: './user/login/Index',
      },
      {
        name: 'Registration page',
        icon: 'smile',
        path: '/user/register',
        component: './user/Register',
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
        routes: [
          {
            path: '/admin',
            name: 'Dashboard',
            icon: 'dashboard',
            component: './admin/Admin',
          },
          {
            path: '/admin/content',
            name: 'Content',
            icon: 'file-text',
            routes: [
              {
                path: '/admin/content',
                name: 'Content',
                icon: 'file-text',
                component: './admin/content',
              },
              {
                path: '/admin/content/add',
                name: 'Create Content',
                icon: 'file-text',
                component: './admin/content/Create',
              },
              {
                path: '/admin/content/files',
                name: 'File Manger',
                icon: 'file',
                component: './admin/Files', // authority: ['root'],
              },
              {
                path: '/admin/content/TestAdd',
                name: 'Create Test Content',
                icon: 'file-text',
                component: './admin/content/AddUpdate',
              },
            ]
          },
          {
            path: '/admin/people',
            name: 'People',
            icon: 'usergroup-add',
            routes: [
              {
                path: '/admin/people',
                name: 'Users',
                icon: 'usergroup-add',
                component: './admin/people',
              },
              {
                path: '/admin/people/roles',
                name: 'Roles',
                icon: 'file-protect',
                component: './admin/people/roles',
              },
              {
                path: '/admin/people/permissions',
                name: 'Permissions',
                icon: 'lock',
                component: './admin/people/permissions',
              },
            ],
          },
          {
            name: 'Structure',
            icon: 'cluster',
            path: '/admin/system',
            routes: [
              {
                path: '/admin/system/menu',
                name: 'Menu',
                icon: 'apartment',
                component: './test/account/permissions/Permission',
              },
              {
                path: '/admin/system/types',
                name: 'Content types',
                icon: 'file-protect',
                component: './test/account/role/Role',
              },
              {
                path: '/admin/system/taxonomy',
                name: 'Taxonomy',
                icon: 'tags',
                component: './test/account/ListTableList',
              },
              {
                path: '/admin/system/internationalization',
                name: 'Regional and languages',
                icon: 'global',
                component: './admin/Structure/i18n/languages',
              },
              {
                path: '/admin/system/countries',
                name: 'Countries',
                icon: 'global',
                component: './admin/Structure/i18n/Countries',
              },
            ],
          },
          {
            path: '/admin/reports',
            name: 'Reports',
            icon: 'robot',
            component: './admin/Admin', // authority: ['root'],
          },
        ],
      },
    ],
  },
  {
    path: '/',
    name: 'Home',
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: 'Welcome',
        component: './home',
      },
      {
        path: '/articles',
        name: 'Welcome',
        component: './home/components/Articles',
      },
      {
        path: '/articles/:id',
        name: 'Welcome',
        component: './home/components/Article',
      },
      {
        name: '查询表格',
        icon: 'smile',
        path: '/listtablelist',
        component: './test/TestTableList',
      },
    ],
  },
  {
    component: '404',
  },
];
