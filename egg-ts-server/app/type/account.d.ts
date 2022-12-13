export namespace Account {
    // userId
    type Uid = number

    // 权限id
    type Scope = string

    interface Decode {
        scope: Scope
        uid: Uid
        exp?: number
        iat?: number
    }

    interface UserInfo {
        nickName: string
        avatar: string
        profile: string
    }

    interface User {
        id: Uid
        info: UserInfo
        infoStr: string
        userName: string
        email: string
        password: string
        openId?: string
        roleIds: Scope
    }

    interface Role {
        id: number
        parentId: number
        menuIds: string
        children: Role[]
    }

    interface Action {
        id: number
        serialNum: number
        permission: string
    }
}
