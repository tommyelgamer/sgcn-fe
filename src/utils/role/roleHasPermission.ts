import EPermission from './permission/permission.type';
import { ERoleName, rolePermission } from './role.enum';

export const roleHasPermission = (role: ERoleName, permission: EPermission): boolean => {
  return rolePermission[role].some((permissionString: string) => permissionString === permission);
};
