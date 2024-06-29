## `pc`

两端，教练端和学员端



汽车的行驶，`ue5`，有现成（https://www.bilibili.com/cheese/play/ep662808?csource=common_hp_history_null&spm_id_from=333.999.top_right_bar_window_history.content.click）



需要补充的功能：到点的语音播报，道路的建模（**关卡设计，重难点**）以及，视频通话和相关交互，权限判断的处理

视频通话的技术点：

1. **实时通讯**： 实时视频和音频通讯一般依赖于`WebRTC`技术，这需要一个信令服务器来建立点对点连接，以及可能需要一个中继服务器（如TURN服务器）来处理防火墙和NAT穿越问题
2. **数据管理**： 服务器负责管理多个客户端之间的视频通信数据流，以及权限控制和用户管理等功能。
3. **第三方插件**：` UE5`可以利用现有的`WebRTC`插件来简化开发过程，**但仍然需要自行搭建和配置服务器以处理信令和数据流**

可以使用https://www.aliyun.com/product/rtc，阿里云音视频通信服务。价格：416小时的通话，一年，138元。4160小时一年1388元。



移动端可以有设备id加手机号，`pc`端，用Windows硬件信息、注册表信息或网卡MAC地址等，不合理。





## 移动端

两端，教练端和学员端（交互界面需要很大的调整，甚至重做）

**未知： `ue5`移动端打包是很麻烦了，它对移动端的适配又是怎么样的**

不管`pc`端还是移动端，使用到的模型都需要，根据移动设备的性能进行适当的优化和细节调整。( 需要考虑开源项目的模型 )

- 可以使用压缩格式如`ETC2、ASTC`等,降低纹理占用的内存空间。同时也要注意材质参数的复杂度,尽量保持简单高效。







如何在Unreal Engine 5中实现VIP账号与设备ID绑定的机制:

1. **获取设备唯一标识**
   - 在`UE5`中,可以使用`FPlatformMisc::GetUniqueDeviceId()`函数来获取设备的唯一标识符。
   - 对于`Android`设备,这个函数会返回设备的`ANDROID_ID`。
   - 对于`iOS`设备,这个函数会返回设备的`UDID`。
2. **账号-设备ID绑定数据库设计**
   - 在`UE5`中,您可以使用`Unreal's Online Subsystem`来管理用户账号信息。
   - 您可以在用户账号表中添加一个额外的字段来存储设备`ID`,形成账号-设备ID的绑定关系。



需要补充的功能：到点的语音播报，道路的建模（关卡设计）以及，视频通话

1. **`WebRTC`**： `WebRTC`提供了跨平台的视频、音频和数据共享能力，适用于建立移动设备间的实时通信
2. **信令服务器**： 用于协调和控制视频通话的开始和结束，以及交换必要的网络信息来建立`P2P`连接。常见的信令协议包括`SIP、XMPP`等。
3. **TURN/STUN服务器**： 当直接`P2P`连接无法建立时，TURN和STUN服务器帮助在NAT和防火墙后进行连接。
4. **移动平台特定支持**：
   - `iOS`：使用苹果的`AVFoundation`框架来处理视频和音频流。
   - `Android`：使用`Android`的`MediaCodec、Camera API`等来处理视频通话。



打包发布问题：

`ios`正规流程发布100刀700多，安卓25刀一次性注册，，200多，付费10刀一年。不合规的话，用安装包，`ios`比较麻烦


