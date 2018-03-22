# @ya-wxapp-org/account

[![NPM version](https://img.shields.io/npm/v/@ya-wxapp-org/account.svg?style=flat)](https://npmjs.com/package/@ya-wxapp-org/account) [![NPM downloads](https://img.shields.io/npm/dm/@ya-wxapp-org/account.svg?style=flat)](https://npmjs.com/package/@ya-wxapp-org/account)

## Install

```bash
yarn add @ya-wxapp-org/account
```

## Usage

```js
const newAccount = require('@ya-wxapp-org/account');

const account = newAccount($req, $modal, timeout);
// $req: {
//    getSession: 根据小程序文档实现的获取open_id的接口，返回值包裹在result内,
//    getAccount: 账号信息，返回值包裹在result内
// }
// $modal: { title: '拒绝授权时的提示标题', content: '拒绝授权的时候的提示内容' }
// timeout: 账号信息过期时间  默认为 5 * 86400000 毫秒
```

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

**@ya-wxapp-org/account** © [fimars](https://github.com/fimars), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by fimars with help from contributors ([list](https://github.com/fimars/@ya-wxapp-org/account/contributors)).

> [github.com/fimars](https://github.com/fimars) · GitHub [@fimars](https://github.com/fimars) · Twitter [@fimars](https://twitter.com/fimars)
