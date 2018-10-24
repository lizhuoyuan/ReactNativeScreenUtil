# ReactNativeScreenUtil
ReactNative屏幕工具适配类
直接导入引用即可.<br/>
新增iPhoneX适配, 让你不用升级ReactNative即可适配iPhoneX. <br/>
此设计类以iPhone6为基准,可自行修改.<br/>
如果各位有更好的适配或者其他适合作为工具的方法，欢迎提issue分享给大家。

个人也已经添加了一些其他常用方法,比如判断字符串(对象，数组)是否为空，时间戳转换 , AsyncStorage 的增删改查等, 觉得有的方法用不上可以手动删除,在此只做整理,方便日后使用

相关链接:

适配iPhoneX的效果及相关方法: http://blog.csdn.net/u011272795/article/details/78592605

屏幕适配工具类使用方法: http://blog.csdn.net/u011272795/article/details/73824558

#### 2018/8/15更新：
字体适配添加了是否根据手机文字缩放系数来缩放字体，避免在每个text都写相应的设置方法，详情请查看setSptext方法

#### 2018/8/15更新：
优化了适配方法setSptext和scaleSize， <br/>
添加了scaleHeight方法，根据不同手机的高度不同来进行适配，使尺寸更加合适 <br/>

#### 2018/7/12更新：
调整了适配方法setSptext和scaleSize， <br/>
最新的屏幕适配方法在android上的效果非常好，iOS未测试，如果iOS上效果不好，请使用最初的版本。<br/>
添加了判断目标是否为空的方法，详情请查阅工具中的isEmpty方法. <br/>
