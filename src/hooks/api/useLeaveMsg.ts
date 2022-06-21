import type { Ref } from 'vue';
import { ref } from 'vue';
import type { IMsgData, MsgType } from '@/api/leaveMsgApi';
import { reqLeaveMsg } from '@/api/leaveMsgApi';
import { OK_CODE } from '@/app/keys';
import { watch } from 'vue';

const useLeaveMsg = (
  size: Ref<number>,
  page: Ref<number>,
  userID: Ref<number>,
  msgType: MsgType,
  immediate = false
) => {
  const message = ref([] as IMsgData[]);

  const total = ref(0);
  const loading = ref(false);

  const refresh = () => {
    if (userID.value <= 0) return;
    loading.value = true;
    reqLeaveMsg(userID.value, msgType, page.value, size.value)
      .then(({ data, code }) => {
        if (code === OK_CODE) {
          total.value = data.total || 0;
          message.value = data.list || [];
        }
      })
      .finally(() => (loading.value = false));
  };

  //一但数组里的数据任何一项发生了改变，重新执行refresh函数刷新数据。
  watch(
    [userID, page, size],
    () => {
      refresh();
    },
    { immediate }
  );

  return {
    total,
    loading,
    message,
    refresh,
  };
};

export default useLeaveMsg;
