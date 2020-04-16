#!/bin/bash

### chmod +x ./lhh.sh
### ./lhh.sh  #执行脚本
#0:退出程序
#ww: 切换外网
#nw: 切换内网
#cors|CORS|ky|KY): 打开谷歌跨域浏览器

echo "LHH shell..."
basepath=$(cd `dirname $0`; pwd)  #当前文件所在路径
#basepath="tell application \"Terminal\" to do script \"source $basepath/app/main.sh"  ### source 为点命令
basepath="tell application \"Terminal\" to do script \". $basepath/app/main.sh"      ### . 为点命令
while :; 
do
    read str
    case $str in
    0)
        echo "退出程序"
    exit;;
    ww|WW)
        echo "切换外网"
        networksetup -setairportnetwork en0 "PingAnNet"
    continue;;
    nw|NW)
        echo "切换内网"
        networksetup -setairportpower en0 off
        sleep 1
        networksetup -setairportpower en0 on
    continue;;
    ###### pc 项目
    form|FORM)
        osascript -e "$basepath pc pss-sws-form\""
    continue;;
    sws|SWS)
        osascript -e "$basepath pc pss-esales-sws\""
    continue;;
    swsh5|SWSH5)
        osascript -e "$basepath pc pss-esales-swsh5\""
    continue;;
    re|RE)
        osascript -e "$basepath pc pss-sws-re\""
    continue;;
    doui|DOUI)
        osascript -e "$basepath pc pss-sws-doui\""
    continue;;
    net|NET)
        osascript -e "$basepath pc pss-sws-net\""
    continue;;
    doh5|DOH5)
        osascript -e "$basepath pc pss-sws-doh5\""
    continue;;
    pfs|PFS)
        osascript -e "$basepath pc pss-esales-pfs\""
    continue;;
    reh5|REH5)
        osascript -e "$basepath pc pss-sws-reh5\""
    continue;;
    ###### h5 项目
    padoapp|PADOAPP)
        osascript -e "$basepath h5 padoapp\""
    continue;;
    pfsapp|PFSAPP)
        osascript -e "$basepath h5 pss-esales-pfsapp\""
    continue;;
    formapp|FORMAPP)
        osascript -e "$basepath h5 pss-sws-formapp\""
    continue;;
    netapp|NETAPP)
        osascript -e "$basepath h5 pss-sws-netapp\""
    continue;;
    ###### 打开谷歌跨域浏览器
    cors|CORS|ky|KY)
        echo "打开谷歌跨域浏览器"
        open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/ex-liujunfan001/MyChromeDevUserData
    continue;;
    ###### git命令
    git|GIT)
        echo "撤消commit: git reset --soft HEAD^"
        echo "取消跟踪文件.classpath: git update-index --assume-unchanged .classpath"
        echo "恢复跟踪文件.classpath: git update-index --no-assume-unchanged .classpath"
        echo "查看被忽略、纳入版本库管理的文件: git ls-files -v | grep -e \"^[hsmrck]\""
    continue;;
    ######测试专用
    t|T)
        echo "测试..."
    continue;;
    *)  #Autocontinue
        echo "command not found"
    continue;;
    esac
done