/**
 * 空间级别枚举
 */
export enum SpaceLevelEnum {
  /** 普通版 */
  REGULAR = 0,
  /** 专业版 */
  PROFESSIONAL = 1,
  /** 旗舰版 */
  FLAGSHIP = 2,
}

/**
 * 空间级别描述映射
 */
export const SpaceLevelText: Record<SpaceLevelEnum, string> = {
  [SpaceLevelEnum.REGULAR]: '普通版',
  [SpaceLevelEnum.PROFESSIONAL]: '专业版',
  [SpaceLevelEnum.FLAGSHIP]: '旗舰版',
};

/**
 * 空间级别配置信息
 */
export interface SpaceLevelConfig {
  /** 描述文本 */
  label: string;
  /** 枚举值 */
  value: number;
  /** 文件数量限制 */
  count: number;
  /** 存储空间限制（字节） */
  size: number;
}

/**
 * 空间级别配置映射
 */
export const SpaceLevelConfigMap: Record<SpaceLevelEnum, SpaceLevelConfig> = {
  [SpaceLevelEnum.REGULAR]: {
    label: '普通版',
    value: SpaceLevelEnum.REGULAR,
    count: 100,
    size: 100 * 1024 * 1024, // 100MB
  },
  [SpaceLevelEnum.PROFESSIONAL]: {
    label: '专业版',
    value: SpaceLevelEnum.PROFESSIONAL,
    count: 1000,
    size: 1000 * 1024 * 1024, // 1GB
  },
  [SpaceLevelEnum.FLAGSHIP]: {
    label: '旗舰版',
    value: SpaceLevelEnum.FLAGSHIP,
    count: 10000,
    size: 10000 * 1024 * 1024, // 10GB
  },
};

/**
 * 根据数值获取枚举值
 * @param value 数值
 * @returns 枚举值，未找到时返回 undefined
 */
export function getSpaceLevelEnumByCode(value: number): SpaceLevelEnum | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  return Object.values(SpaceLevelEnum).includes(value as SpaceLevelEnum)
    ? (value as SpaceLevelEnum)
    : undefined;
}

/**
 * 根据枚举值获取描述文本
 * @param value 枚举值
 * @returns 描述文本
 */
export function getSpaceLevelText(value: SpaceLevelEnum): string {
  return SpaceLevelText[value] || '未知';
}

/**
 * 根据枚举值获取配置信息
 * @param value 枚举值
 * @returns 配置信息
 */
export function getSpaceLevelConfig(value: SpaceLevelEnum): SpaceLevelConfig | undefined {
  return SpaceLevelConfigMap[value];
}

/**
 * 获取枚举值
 * 格式：{
 *   label: 描述文本,
 *   value: 数值,
 *   count: 文件数量限制,
 *   size: 存储空间限制（字节）
 * }
 * 例如：[{},{},{}]
 */
export function getSpaceLevelOptions(): SpaceLevelConfig[] {
  return Object.values(SpaceLevelEnum)
    .filter(value => typeof value === 'number') // 过滤掉反向映射的字符串键
    .map(value => SpaceLevelConfigMap[value as SpaceLevelEnum]);
}

// 使用示例：
// console.log(SpaceLevelEnum.REGULAR); // 0
// console.log(SpaceLevelText[SpaceLevelEnum.PROFESSIONAL]); // "专业版"
// console.log(getSpaceLevelEnumByCode(2)); // SpaceLevelEnum.FLAGSHIP
// console.log(getSpaceLevelText(SpaceLevelEnum.FLAGSHIP)); // "旗舰版"
// console.log(getSpaceLevelConfig(SpaceLevelEnum.PROFESSIONAL)); // { label: '专业版', value: 1, count: 1000, size: 1073741824 }
// console.log(getSpaceLevelOptions()); // [{}, {}, {}]
