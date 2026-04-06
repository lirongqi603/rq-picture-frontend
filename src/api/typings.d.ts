declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number
    data?: boolean
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

  type DeletedRequest = {
    id?: number
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

  type IPageUserQueryListVo_ = {
    current?: number
    pages?: number
    records?: UserQueryListVo[]
    size?: number
    total?: number
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

  type Picture = {
    category?: string
    createTime?: string
    editTime?: string
    id?: number
    introduction?: string
    isDelete?: number
    name?: string
    picFormat?: string
    picHeight?: number
    picScale?: number
    picSize?: number
    picWidth?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    tags?: string
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
    /** 排序字段 */
    sortField?: string
    /** 排序方式 */
    sortOrder?: string
    /** 页码 */
    current?: number
    /** 每页条数 */
    pageSize?: number
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
  }

  type uploadPictureUsingPOSTParams = {
    /** 图片类型 */
    category?: string
    /** 图片id */
    id?: number
    /** 图片名称 */
    name?: string
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
