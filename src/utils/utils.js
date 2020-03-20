import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import moment from 'moment';
import md5 from 'md5';
import uuid from 'uuid/v4';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(({ path }) => path && pathRegexp(path).exec(pathname));
  if (authority) return authority;
  return undefined;
};

// Formatted timestamp
export function formatTimestamp(val, format) {
  let f = 'YYYY-MM-DD HH:mm:ss';
  if (format) {
    f = format;
  }
  return moment.unix(val).format(f);
}

// Parsing timestamp
export function parseTimestamp(val) {
  return moment.unix(val);
}

// Parsing date
export function parseDate(val) {
  return moment(val);
}

// Formatted date
export function formatDate(val, format) {
  let f = 'YYYY-MM-DD HH:mm:ss';
  if (format) {
    f = format;
  }
  return moment(val).format(f);
}

// Md5 encryption
export function md5Hash(value) {
  return md5(value);
}

// Create a UUID
export function newUUID() {
  return uuid();
}
