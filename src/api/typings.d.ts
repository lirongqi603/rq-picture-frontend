declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number
    data?: boolean
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

  type DeletedRequest = {
    id?: number
  }

  type getInfoUsingGETParams = {
    /** id */
    id: number
  }

  type IPageUserQueryListVo_ = {
    current?: number
    pages?: number
    records?: UserQueryListVo[]
    size?: number
    total?: number
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
    /** 创建时间 */
    createTime?: string
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
