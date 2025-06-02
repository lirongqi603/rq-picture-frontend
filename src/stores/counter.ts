import {defineStore} from "pinia";
import {ref} from "vue";
import {getUserLoginUsingGet} from "@/api/userManage";

export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<any>({
    id: '',
    userName: "未登录",
    userAvatar: "",
  });

  async function fetchLoginUser() {
    const res = await getUserLoginUsingGet();
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    }
  }

  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser;
  }

  return {loginUser, setLoginUser, fetchLoginUser};
});
