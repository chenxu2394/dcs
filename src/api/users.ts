import {
  RetrievedUserDetail,
  retrievedUserDetailSchema,
  UserLoginType,
  UserRegisterType
} from "@/types"
import api from "."

const RESOURCE = "/users"

export default {
  login: async (credentials: UserLoginType): Promise<string> => {
    const res = await api.post(`${RESOURCE}/login`, credentials)
    if (res.status !== 200) {
      throw new Error("Error logging in")
    }

    // console.log(res.data)
    return res.data
  },
  register: async (credentials: UserRegisterType): Promise<string> => {
    const res = await api.post(`${RESOURCE}/register`, credentials)
    if (res.status !== 200) {
      throw new Error("Error registering")
    }

    // console.log(res.data)
    return res.data
  },
  getUserDetails: async (userId: string): Promise<RetrievedUserDetail> => {
    if (userId) {
      const res = await api.get(`${RESOURCE}/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (res.status !== 200) {
        throw new Error("Error fetching user")
      }
      return res.data
    }
    throw Error("Did not fetch user info")
  },
  deleteUser: async (userId: string): Promise<void> => {
    if (userId) {
      const res = await api.delete(`${RESOURCE}/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (res.status !== 200) {
        console.log(res.data)
        throw new Error("Error deleting user")
      }
      return res.data
    }
    throw Error("Did not delete user")
  },

  updateUser: async (user: RetrievedUserDetail): Promise<RetrievedUserDetail> => {
    const res = await api.put(RESOURCE, user, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    if (res.status !== 200) {
      throw new Error("Error updating user")
    }
    const validatedUser = retrievedUserDetailSchema.safeParse(res.data)
    if (!validatedUser.success) {
      throw new Error("Error validating user")
    }
    return res.data
  },

  getAllUsers: async (): Promise<RetrievedUserDetail[]> => {
    const res = await api.get(RESOURCE, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    if (res.status !== 200) {
      throw new Error("Error fetching users")
    }
    return res.data
  }
}
