import React from 'react';
import { CURRENT } from './renderAuthorize'; // eslint-disable-next-line import/no-cycle

import PromiseRender from './PromiseRender';

/**
 * Common check permissions method
 * @param { Permission judgment } authority
 * @param { Your permission description } currentAuthority
 * @param { Passing components } target
 * @param { No pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
  // No decision permissions. View all by default
  // Retirement authority, return target;
  if (!authority) {
    return target;
  } // Array processing

  if (Array.isArray(authority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(item => authority.includes(item))) {
        return target;
      }
    } else if (authority.includes(currentAuthority)) {
      return target;
    }

    return Exception;
  } // string 

  if (typeof authority === 'string') {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(item => authority === item)) {
        return target;
      }
    } else if (authority === currentAuthority) {
      return target;
    }

    return Exception;
  } // Promise handle

  if (authority instanceof Promise) {
    return <PromiseRender ok={target} error={Exception} promise={authority} />;
  } // Function handle

  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority); // The return value after the function is executed is Promise

      if (bool instanceof Promise) {
        return <PromiseRender ok={target} error={Exception} promise={bool} />;
      }

      if (bool) {
        return target;
      }

      return Exception;
    } catch (error) {
      throw error;
    }
  }

  throw new Error('unsupported parameters');
};

export { checkPermissions };

function check(authority, target, Exception) {
  return checkPermissions(authority, CURRENT, target, Exception);
}

export default check;
