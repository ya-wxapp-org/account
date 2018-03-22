import pify from '@ya-wxapp-org/pify';
import Sync, { register } from '@ya-wxapp-org/sync';

register('account', true);
register('info', true);

class Account {
  constructor(req, modal, timeout = 5 * 86400000) {
    this.$req = req;
    this.$modal = modal || {
      title: '微信授权失败',
      content: '请允许授权'
    };
    this.timeout = timeout;
  }
  /**
   *      Is Account Token Timeout?
   *                  |
   *                /  \
   * Get New Account   Return Account
   *          |
   *   checkSession && checkInfo
   *                |     <--- Try Agign -----
   *              /  \   |                  |
   *            /    GetInfo  ---- If Reject By User
   *           /    /
   *   Fetch Account
   */

  async init() {
    if (Sync.account && Date.now() < Sync.account.time_valid) {
      return Sync.account;
    } else {
      try {
        const checkResult = await pify(wx.checkSession)();
        if (!Sync.info) {
          throw Error('Not Info');
        }
      } catch (_e) {
        const { code } = await pify(wx.login)();
        const { result: open_id } = await this.$req.getSession({
          code,
          channel: Sync.channel
        });
        // TODO: 强制授权
        const { iv, encryptedData: encrypted_data } = await this.getInfo();
        Sync.info = { iv, open_id, encrypted_data, channel: Sync.channel };
      }
      const { result: account } = await this.$req.getAccount(Sync.info);
      if (account) {
        account.time_valid = new Date().getTime() + this.timeout;
        Sync.account = account;
      }
      return Sync.account;
    }
  }

  async getInfo() {
    try {
      return await pify(wx.getUserInfo)({
        withCredentials: true,
        lang: 'zh_CN'
      });
    } catch (e) {
      const { authSetting } = await pify(wx.openSetting)();

      // Notice User
      if (!authSetting['scope.userInfo']) {
        await pify(wx.showModal)(this.$modal);
      }

      return await this.getInfo();
    }
  }
}

export default function newAccount(req, modal, timeout) {
  return new Account(req, modal, timeout);
}
