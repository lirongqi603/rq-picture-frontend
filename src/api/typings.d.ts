declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number
    data?: boolean
    message?: string
  }

  type BaseResponseCreateTaskResponse_ = {
    code?: number
    data?: CreateTaskResponse
    message?: string
  }

  type BaseResponseInt_ = {
    code?: number
    data?: number
    message?: string
  }

  type BaseResponseIPageUserQueryListVo_ = {
    code?: number
    data?: IPageUserQueryListVo_
    message?: string
  }

  type BaseResponseListPictureVo_ = {
    code?: number
    data?: PictureVo[]
    message?: string
  }

  type BaseResponseListSpace_ = {
    code?: number
    data?: Space[]
    message?: string
  }

  type BaseResponseListSpaceCategoryAnalyzeResponse_ = {
    code?: number
    data?: SpaceCategoryAnalyzeResponse[]
    message?: string
  }

  type BaseResponseListSpaceLevelVo_ = {
    code?: number
    data?: SpaceLevelVo[]
    message?: string
  }

  type BaseResponseListSpaceSizeAnalyzeResponse_ = {
    code?: number
    data?: SpaceSizeAnalyzeResponse[]
    message?: string
  }

  type BaseResponseListSpaceTagAnalyzeResponse_ = {
    code?: number
    data?: SpaceTagAnalyzeResponse[]
    message?: string
  }

  type BaseResponseListSpaceUserAnalyzeResponse_ = {
    code?: number
    data?: SpaceUserAnalyzeResponse[]
    message?: string
  }

  type BaseResponseListSpaceUserVo_ = {
    code?: number
    data?: SpaceUserVo[]
    message?: string
  }

  type BaseResponseListSpaceVo_ = {
    code?: number
    data?: SpaceVo[]
    message?: string
  }

  type BaseResponseLong_ = {
    code?: number
    data?: number
    message?: string
  }

  type BaseResponsePagePicture_ = {
    code?: number
    data?: PagePicture_
    message?: string
  }

  type BaseResponsePagePictureVo_ = {
    code?: number
    data?: PagePictureVo_
    message?: string
  }

  type BaseResponsePageSpace_ = {
    code?: number
    data?: PageSpace_
    message?: string
  }

  type BaseResponsePageSpaceVo_ = {
    code?: number
    data?: PageSpaceVo_
    message?: string
  }

  type BaseResponsePicture_ = {
    code?: number
    data?: Picture
    message?: string
  }

  type BaseResponsePictureTagCategory_ = {
    code?: number
    data?: PictureTagCategory
    message?: string
  }

  type BaseResponsePictureVo_ = {
    code?: number
    data?: PictureVo
    message?: string
  }

  type BaseResponseQueryTaskResponse_ = {
    code?: number
    data?: QueryTaskResponse
    message?: string
  }

  type BaseResponseSpace_ = {
    code?: number
    data?: Space
    message?: string
  }

  type BaseResponseSpaceUsageAnalyzeResponse_ = {
    code?: number
    data?: SpaceUsageAnalyzeResponse
    message?: string
  }

  type BaseResponseSpaceVo_ = {
    code?: number
    data?: SpaceVo
    message?: string
  }

  type BaseResponseString_ = {
    code?: number
    data?: string
    message?: string
  }

  type BaseResponseUserInfoVo_ = {
    code?: number
    data?: UserInfoVo
    message?: string
  }

  type BaseResponseUserLoginVo_ = {
    code?: number
    data?: UserLoginVo
    message?: string
  }

  type BatchUpdatePictureRequest = {
    category?: string
    nameFormat?: string
    pictureIdList?: number[]
    spaceId?: number
    tagList?: string[]
  }

  type BatchUploadPictureRequest = {
    /** 搜索内容 */
    searchText?: string
    /** 搜索页码 */
    searchPage?: number
    /** 搜索数量 */
    searchNum?: number
    /** 图片名称前缀 */
    namePrefix?: string
    /** 图片类型 */
    category?: string
    /** 图片标签 */
    tagList?: string[]
  }

  type CreateTaskRequest = {
    input?: Input
    model?: string
    parameters?: Parameters
  }

  type CreateTaskResponse = {
    code?: string
    message?: string
    output?: Output
    request_id?: string
  }

  type DeletedRequest = {
    id?: number
  }

  type getAiTaskProgressUsingGETParams = {
    /** taskId */
    taskId: string
  }

  type getInfoUsingGETParams = {
    /** id */
    id: number
  }

  type getPictureByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getPictureVoByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getSpaceByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getSpaceVoByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type Input = {
    image_url?: string
  }

  type IPageUserQueryListVo_ = {
    current?: number
    pages?: number
    records?: UserQueryListVo[]
    size?: number
    total?: number
  }

  type Output = {
    task_id?: string
    task_status?: string
  }

  type Output1 = {
    end_time?: string
    output_image_url?: string
    submit_time?: string
    task_id?: string
    task_metrics?: TaskMetrics
    task_status?: string
  }

  type PagePicture_ = {
    current?: number
    pages?: number
    records?: Picture[]
    size?: number
    total?: number
  }

  type PagePictureVo_ = {
    current?: number
    pages?: number
    records?: PictureVo[]
    size?: number
    total?: number
  }

  type PageSpace_ = {
    current?: number
    pages?: number
    records?: Space[]
    size?: number
    total?: number
  }

  type PageSpaceVo_ = {
    current?: number
    pages?: number
    records?: SpaceVo[]
    size?: number
    total?: number
  }

  type Parameters = {
    angle?: number
    best_quality?: boolean
    bottom_offset?: number
    left_offset?: number
    limit_image_size?: boolean
    output_ratio?: string
    right_offset?: number
    top_offset?: number
    xScale?: number
    yScale?: number
  }

  type Picture = {
    category?: string
    createTime?: string
    editTime?: string
    id?: number
    introduction?: string
    isDelete?: number
    name?: string
    picColor?: string
    picFormat?: string
    picHeight?: number
    picScale?: number
    picSize?: number
    picWidth?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    spaceId?: number
    tags?: string
    thumbnailUrl?: string
    updateTime?: string
    url?: string
    userId?: number
  }

  type PictureEditRequest = {
    /** 图片id */
    id: number
    /** 图片名称 */
    name?: string
    /** 简介 */
    introduction?: string
    /** 分类 */
    category?: string
    /** 标签 */
    tags?: string[]
    /** 空间id */
    spaceId?: number
  }

  type PictureQueryRequest = {
    /** 图片id */
    id?: number
    /** 图片名称 */
    name?: string
    /** 简介 */
    introduction?: string
    /** 分类 */
    category?: string
    /** 标签 */
    tags?: string[]
    /** 用户ID */
    userId?: number
    /** 关键字搜索 */
    searchText?: string
    /** 图片体积 */
    picSize?: number
    /** 图片宽度 */
    picWidth?: number
    /** 图片高度 */
    picHeight?: number
    /** 图片宽高比例 */
    picScale?: number
    /** 图片格式 */
    picFormat?: string
    /** 审核状态 */
    reviewStatus?: number
    /** 审核信息 */
    reviewMessage?: string
    /** 审核人 ID */
    reviewerId?: number
    /** 空间 ID */
    spaceId?: number
    /** 是否进查询公共图库 */
    isPublic?: boolean
    /** 编辑开始时间 */
    editStartTime?: string
    /** 编辑结束时间 */
    editEndTime?: string
    /** 图片主色调 */
    picColor?: string
    /** 页码 */
    current?: number
    /** 每页条数 */
    pageSize?: number
    /** 排序字段 */
    sortField?: string
    /** 排序规则 */
    sortOrder?: string
  }

  type PictureReviewRequest = {
    /** 图片id */
    id?: number
    /** 审核状态 */
    reviewStatus?: number
    /** 审核信息 */
    reviewMessage?: string
    /** 页码 */
    current?: number
    /** 每页条数 */
    pageSize?: number
    /** 排序字段 */
    sortField?: string
    /** 排序规则 */
    sortOrder?: string
  }

  type PictureTagCategory = {
    /** 标签列表 */
    tagList?: string[]
    /** 分类列表 */
    categoryList?: string[]
  }

  type PictureUpdateRequest = {
    /** 图片id */
    id: number
    /** 图片名称 */
    name?: string
    /** 简介 */
    introduction?: string
    /** 分类 */
    category?: string
    /** 标签 */
    tags?: string[]
  }

  type PictureVo = {
    /** id */
    id?: number
    /** 图片 url */
    url?: string
    /** 图片名称 */
    name?: string
    /** 简介 */
    introduction?: string
    /** 分类 */
    category?: string
    /** 标签 */
    tags?: string[]
    /** 图片体积 */
    picSize?: number
    /** 图片宽度 */
    picWidth?: number
    /** 图片高度 */
    picHeight?: number
    /** 图片宽高比例 */
    picScale?: number
    /** 图片格式 */
    picFormat?: string
    user?: UserInfoVo
    /** 创建时间 */
    createTime?: string
    /** 编辑时间 */
    editTime?: string
    /** 更新时间 */
    updateTime?: string
    /** 审核状态：0-待审核; 1-通过; 2-拒绝 */
    reviewStatus?: number
    /** 审核信息 */
    reviewMessage?: string
    /** 审核人 ID */
    reviewerId?: number
    /** 审核时间 */
    reviewTime?: string
    /** 缩略图 url */
    thumbnailUrl?: string
    /** 空间ID */
    spaceId?: number
    /** 相似度 */
    similarity?: number
    /** 主色调 */
    picColor?: string
    /** 权限列表 */
    permissionList?: string[]
  }

  type QueryTaskResponse = {
    code?: string
    message?: string
    output?: Output1
    request_id?: string
  }

  type Space = {
    createTime?: string
    editTime?: string
    id?: number
    isDelete?: number
    maxCount?: number
    maxSize?: number
    spaceLevel?: number
    spaceName?: string
    spaceType?: number
    totalCount?: number
    totalSize?: number
    updateTime?: string
    userId?: number
  }

  type SpaceAddRequest = {
    /** 空间名称 */
    spaceName?: string
    /** 空间级别：0-普通版 1-专业版 2-旗舰版 */
    spaceLevel?: number
    /** 空间图片的最大总大小 */
    maxSize?: number
    /** 空间图片的最大数量 */
    maxCount?: number
    /** 空间类型 */
    spaceType?: number
  }

  type SpaceCategoryAnalyzeRequest = {
    /** 空间id */
    spaceId?: number
    /** 是否查询全部 */
    isAll?: boolean
    /** 是否查询公共图库 */
    isPublic?: boolean
  }

  type SpaceCategoryAnalyzeResponse = {
    category?: string
    count?: number
    totalSize?: number
  }

  type SpaceEditRequest = {
    /** id */
    id?: number
    /** 空间名称 */
    spaceName?: string
    /** 空间级别：0-普通版 1-专业版 2-旗舰版 */
    spaceLevel?: number
  }

  type SpaceLevelVo = {
    maxCount?: number
    maxSize?: number
    name?: string
    value?: number
  }

  type SpaceQueryRequest = {
    /** id */
    id?: number
    /** 空间名称 */
    spaceName?: string
    /** 空间级别：0-普通版 1-专业版 2-旗舰版 */
    spaceLevel?: number
    /** 空间图片的最大总大小 */
    maxSize?: number
    /** 空间图片的最大数量 */
    maxCount?: number
    /** 当前空间下图片的总大小 */
    totalSize?: number
    /** 当前空间下的图片数量 */
    totalCount?: number
    /** 创建用户 id */
    userId?: number
    /** 空间类型 */
    spaceType?: number
    /** 页码 */
    current?: number
    /** 每页条数 */
    pageSize?: number
    /** 排序字段 */
    sortField?: string
    /** 排序规则 */
    sortOrder?: string
  }

  type SpaceRankAnalyzeRequest = {
    topN?: number
    /** 空间id */
    spaceId?: number
    /** 是否查询全部 */
    isAll?: boolean
    /** 是否查询公共图库 */
    isPublic?: boolean
  }

  type SpaceSizeAnalyzeRequest = {
    /** 空间id */
    spaceId?: number
    /** 是否查询全部 */
    isAll?: boolean
    /** 是否查询公共图库 */
    isPublic?: boolean
  }

  type SpaceSizeAnalyzeResponse = {
    count?: number
    sizeRange?: string
  }

  type SpaceTagAnalyzeRequest = {
    /** 空间id */
    spaceId?: number
    /** 是否查询全部 */
    isAll?: boolean
    /** 是否查询公共图库 */
    isPublic?: boolean
  }

  type SpaceTagAnalyzeResponse = {
    count?: number
    tag?: string
  }

  type SpaceUpdateRequest = {
    /** id */
    id?: number
    /** 空间名称 */
    spaceName?: string
    /** 空间级别：0-普通版 1-专业版 2-旗舰版 */
    spaceLevel?: number
    /** 空间图片的最大总大小 */
    maxSize?: number
    /** 空间图片的最大数量 */
    maxCount?: number
  }

  type SpaceUsageAnalyzeRequest = {
    /** 空间id */
    spaceId?: number
    /** 是否查询全部 */
    isAll?: boolean
    /** 是否查询公共图库 */
    isPublic?: boolean
  }

  type SpaceUsageAnalyzeResponse = {
    countUsageRatio?: number
    maxCount?: number
    maxSize?: number
    sizeUsageRatio?: number
    usedCount?: number
    usedSize?: number
  }

  type SpaceUserAddRequest = {
    spaceId?: number
    spaceRole?: string
    userId?: number
  }

  type SpaceUserAnalyzeRequest = {
    timeDimension?: string
    userId?: number
    /** 空间id */
    spaceId?: number
    /** 是否查询全部 */
    isAll?: boolean
    /** 是否查询公共图库 */
    isPublic?: boolean
  }

  type SpaceUserAnalyzeResponse = {
    count?: number
    period?: string
  }

  type SpaceUserEditRequest = {
    id?: number
    spaceRole?: string
  }

  type SpaceUserQueryRequest = {
    id?: number
    spaceId?: number
    spaceRole?: string
  }

  type SpaceUserVo = {
    createTime?: string
    id?: number
    space?: SpaceVo
    spaceId?: number
    spaceRole?: string
    user?: UserInfoVo
    userId?: number
  }

  type SpaceVo = {
    /** id */
    id?: number
    /** 空间名称 */
    spaceName?: string
    /** 空间级别：0-普通版 1-专业版 2-旗舰版 */
    spaceLevel?: number
    /** 空间图片的最大总大小 */
    maxSize?: number
    /** 空间图片的最大数量 */
    maxCount?: number
    /** 当前空间下图片的总大小 */
    totalSize?: number
    /** 当前空间下的图片数量 */
    totalCount?: number
    /** 创建用户 id */
    userId?: number
    /** 创建时间 */
    createTime?: string
    /** 编辑时间 */
    editTime?: string
    /** 更新时间 */
    updateTime?: string
    userVo?: UserInfoVo
    /** 空间类型：0-私有 1-团队 */
    spaceType?: number
    /** 权限列表 */
    permissionList?: string[]
  }

  type TaskMetrics = {
    failed?: number
    succeeded?: number
    total?: number
  }

  type testDownloadFileUsingGETParams = {
    /** filepath */
    filepath?: string
  }

  type UploadPictureRequest = {
    /** id */
    id?: number
    /** 图片url */
    url: string
    /** 空间ID */
    spaceId: string
  }

  type uploadPictureUsingPOSTParams = {
    /** 图片类型 */
    category?: string
    /** 图片id */
    id?: number
    /** 图片名称 */
    name?: string
    /** 图片空间id */
    spaceId?: number
    /** 图片标签 */
    tagList?: string[]
    /** 图片地址 */
    url?: string
  }

  type UserAddRequest = {
    /** 用户账号 */
    userAccount: string
    /** 用户昵称 */
    userName?: string
    /** 用户头像 */
    userAvatar?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色：user/admin */
    userRole: string
  }

  type UserInfoVo = {
    /** id */
    id?: number
    /** 账号 */
    userAccount?: string
    /** 用户昵称 */
    userName?: string
    /** 用户头像 */
    userAvatar?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色：user/admin */
    userRole?: string
  }

  type UserLoginRequest = {
    /** 用户账号 */
    userAccount: string
    /** 用户密码 */
    userPassword: string
  }

  type UserLoginVo = {
    /** id */
    id?: number
    /** 账号 */
    userAccount?: string
    /** 用户昵称 */
    userName?: string
    /** 用户头像 */
    userAvatar?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色：user/admin */
    userRole?: string
    /** 创建时间 */
    createTime?: string
  }

  type UserQueryListVo = {
    /** id */
    id?: number
    /** 账号 */
    userAccount?: string
    /** 用户昵称 */
    userName?: string
    /** 用户头像 */
    userAvatar?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色：user/admin */
    userRole?: string
    /** 创建时间 */
    createTime?: string
  }

  type UserQueryRequest = {
    /** 账号 */
    userAccount?: string
    /** 用户昵称 */
    userName?: string
    /** 页码 */
    current?: number
    /** 每页条数 */
    pageSize?: number
    /** 排序字段 */
    sortField?: string
    /** 排序规则 */
    sortOrder?: string
  }

  type UserRegisterRequest = {
    /** 账号 */
    userAccount: string
    /** 密码 */
    userPassword: string
    /** 确认密码 */
    checkPassword: string
  }

  type UserUpdateRequest = {
    /** 主键 */
    id: number
    /** 用户账号 */
    userAccount: string
    /** 用户昵称 */
    userName?: string
    /** 用户头像 */
    userAvatar?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色：user/admin */
    userRole: string
  }
}
