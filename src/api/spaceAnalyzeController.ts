// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** spaceImageCategory POST /api/spaceAnalyze/spaceImageCategory */
export async function spaceImageCategoryUsingPost(
  body: API.SpaceCategoryAnalyzeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceCategoryAnalyzeResponse_>(
    '/api/spaceAnalyze/spaceImageCategory',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  )
}

/** spaceImageSize POST /api/spaceAnalyze/spaceImageSize */
export async function spaceImageSizeUsingPost(
  body: API.SpaceSizeAnalyzeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceSizeAnalyzeResponse_>(
    '/api/spaceAnalyze/spaceImageSize',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  )
}

/** spaceImageTag POST /api/spaceAnalyze/spaceImageTag */
export async function spaceImageTagUsingPost(
  body: API.SpaceTagAnalyzeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceTagAnalyzeResponse_>('/api/spaceAnalyze/spaceImageTag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** spaceUsage POST /api/spaceAnalyze/spaceUsage */
export async function spaceUsageUsingPost(
  body: API.SpaceUsageAnalyzeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSpaceUsageAnalyzeResponse_>('/api/spaceAnalyze/spaceUsage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** spaceUsageRank POST /api/spaceAnalyze/spaceUsageRank */
export async function spaceUsageRankUsingPost(
  body: API.SpaceRankAnalyzeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpace_>('/api/spaceAnalyze/spaceUsageRank', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** userUploadBehavior POST /api/spaceAnalyze/userUploadBehavior */
export async function userUploadBehaviorUsingPost(
  body: API.SpaceUserAnalyzeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceUserAnalyzeResponse_>(
    '/api/spaceAnalyze/userUploadBehavior',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  )
}
