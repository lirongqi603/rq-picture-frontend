/**
 * 审核状态枚举
 */
export enum ReviewStatusEnum {
  /** 待审核 */
  PENDING = 0,
  /** 审核通过 */
  PASS = 1,
  /** 拒绝 */
  REFUSE = 2,
}

/**
 * 审核状态描述映射
 */
export const ReviewStatusText: Record<ReviewStatusEnum, string> = {
  [ReviewStatusEnum.PENDING]: '待审核',
  [ReviewStatusEnum.PASS]: '审核通过',
  [ReviewStatusEnum.REFUSE]: '拒绝',
};

/**
 * 根据数值获取枚举值
 * @param value 数值
 * @returns 枚举值，未找到时返回 undefined
 */
export function getReviewStatusEnumByCode(value: number): ReviewStatusEnum | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  return Object.values(ReviewStatusEnum).includes(value as ReviewStatusEnum)
    ? (value as ReviewStatusEnum)
    : undefined;
}

/**
 * 根据枚举值获取描述文本
 * @param value 枚举值
 * @returns 描述文本
 */
export function getReviewStatusText(value: ReviewStatusEnum): string {
  return ReviewStatusText[value] || '未知';
}

/**
 * 获取枚举值
 * 格式：{
 *   label: 描述文本,
 *   value: 数值
 * }
 * 例如：[{},{},{}]
 */
export function getReviewStatusOptions(): Array<{ label: string; value: number }> {
  return Object.values(ReviewStatusEnum)
    .filter(value => typeof value === 'number') // 过滤掉反向映射的字符串键
    .map(value => ({
      value: value as number,
      label: ReviewStatusText[value as ReviewStatusEnum],
    }));
}

// 使用示例：
// console.log(ReviewStatusEnum.PENDING); // 0
// console.log(ReviewStatusText[ReviewStatusEnum.PASS]); // "审核通过"
// console.log(getReviewStatusEnumByCode(2)); // ReviewStatusEnum.REFUSE
// console.log(getReviewStatusText(ReviewStatusEnum.REFUSE)); // "拒绝"
