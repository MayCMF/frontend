import component from './uk-UA/component';
import globalHeader from './uk-UA/globalHeader';
import menu from './uk-UA/menu';
import pwa from './uk-UA/pwa';
import settingDrawer from './uk-UA/settingDrawer';
import settings from './uk-UA/settings';
export default {
  'navBar.lang': 'Мови',
  'layout.user.link.help': 'Довідка',
  'layout.user.link.privacy': 'Політика конфіденційності',
  'layout.user.link.terms': 'Термінологія',
  'app.preview.down.block': 'Завантажте цю сторінку у свій локальний проект',
  'app.welcome.link.fetch-blocks': 'Отримати весь блок',
  'app.welcome.link.block-list': 'Швидке створення стандартних сторінок на основі розробки `block`',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
