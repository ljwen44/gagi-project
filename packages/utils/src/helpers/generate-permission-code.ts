export function extractPermissionCodes(permissions: any[]) {
  const result: string[] = [];

  function traverse(node: any) {
    if (node && node.permissionCode) {
      result.push(node.permissionCode);
    }

    if (node && node.children && node.children.length > 0) {
      node.children.forEach((child: any) => traverse(child));
    }
  }

  if (Array.isArray(permissions)) {
    permissions.forEach((node) => traverse(node));
  }

  return result;
}
