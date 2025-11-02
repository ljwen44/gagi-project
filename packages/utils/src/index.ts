export * from './helpers';
export * from '@vben-core/shared/cache';
export * from '@vben-core/shared/color';
export * from '@vben-core/shared/utils';

export const mockApi = async (columns: any) => {
  return await new Promise((resolve) => {
    const keys: string[] = columns
      .map((item: any) => item.prop)
      .filter(Boolean) as string[];
    const data = Array.from({ length: 10 }, (_, index) => {
      const result: Record<string, any> = {
        index: index + 1,
      };
      for (const key of keys) {
        result[key] = 'mock data';
      }
      return result;
    });
    resolve({
      list: data,
      count: 30,
    });
  });
};
