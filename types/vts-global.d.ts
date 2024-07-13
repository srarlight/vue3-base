declare global {
    /**
     * token信息
     */
    interface ITokenInfo {
      accessToken: string
      expiresIn: string
      refreshToken: string
      now: number
    }
  
    /**
     * 用户信息
     */
    interface IUserInfo {
      account: string
      name: string
      username: string
      uid: string
      newUserFlag: string
      sendCheckFlag: boolean
      balance: number
    }
  
    /**
     * 通用返回数据结构
     */
    interface IBaseResp {
      code: number
      msg: string
      success: boolean
      notSuccess: boolean
    }
  
    /**
     * 通用文件结构
     */
    interface IBaseFile {
      id: string
      fileName: string
      remoteFileName: string
      fileType: string
      fileSize: number
      bizType: string
    }
  
    type DeepPartial<T> = {
      [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
    }
  
    type IStateTuple<T> = readonly [
      Readonly<T>,
      (state: DeepPartial<T> | ((newState: T) => void)) => void,
    ]
  }
  
  export {}
  