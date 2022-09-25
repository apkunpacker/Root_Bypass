/*
Created By @ApkUnpacker
*/

var ProName = ProcessName();
//var ProName = "Define Your Package Name Here in case 1st line not work";
function ProcessName() {
    var openPtr = Module.getExportByName('libc.so', 'open');
    var open = new NativeFunction(openPtr, 'int', ['pointer', 'int']);
    var readPtr = Module.getExportByName('libc.so', 'read');
    var read = new NativeFunction(readPtr, 'int', ['int', 'pointer', 'int']);
    var closePtr = Module.getExportByName('libc.so', 'close');
    var close = new NativeFunction(closePtr, 'int', ['int']);
    var path = Memory.allocUtf8String('/proc/self/cmdline');
    var fd = open(path, 0);
    if (fd != -1) {
        var buffer = Memory.alloc(0x1000);
        var result = read(fd, buffer, 0x1000);
        close(fd);
        result = ptr(buffer).readCString();
        return result;
    }
    return -1;
}

var FakeMaps = "/data/data/" + ProName + "/maps";
var FakeMounts = "/data/data/" + ProName + "/mounts";
var FakeMountInfo = "/data/data/" + ProName + "/mountinfo";
var MapsFile = new File(FakeMaps, "w");
var FMountFile = new File(FakeMounts, "w");
var FMInfo = new File(FakeMountInfo, "w");
var MapsBuffer = Memory.alloc(512);
var MountBuffer = Memory.alloc(512);
var MountInfoBuffer = Memory.alloc(512);
var RootPath = new Array("%s/magisk", "(null)/magisk", "(null)/su", "/.subackup", "//sys/devices/virtual/misc/vboxguest", "//sys/devices/virtual/misc/vboxuser", "//sys/module/vboxsf", "//system/priv-app/ldappstore", "/apex/com.android.art/bin/busybox", "/apex/com.android.art/bin/magisk", "/apex/com.android.art/bin/su", "/apex/com.android.runtime/bin/busybox", "/apex/com.android.runtime/bin/magisk", "/apex/com.android.runtime/bin/su", "/cache/.disable_magisk", "/cache/busybox", "/cache/magisk", "/cache/magisk.log", "/cache/recovery/xposed.zip", "/cache/su", "/data/.bluestacks.prop", "/data/.supersu", "/data/adb/", "/data/adb/.boot_count", "/data/adb/edxp/misc_path", "/data/adb/magisk", "/data/adb/magisk.db", "/data/adb/magisk.img", "/data/adb/magisk_simple", "/data/adb/riru/api_version", "/data/adb/riru/bin/rirud", "/data/app-lib/com.RootBackupKeeper13_3-1", "/data/app-lib/net.snclab.RootKeepSurvival-1", "/data/app/com.RootBackupKeeper13_3-1.apk", "/data/app/com.bluestacks.appmart-1.apk", "/data/app/com.bluestacks.bstcommandprocessor-1.apk", "/data/app/com.bluestacks.help-1.apk", "/data/app/com.bluestacks.home-1.apk", "/data/app/com.bluestacks.s2p-1.apk", "/data/app/com.bluestacks.searchapp-1.apk", "/data/app/com.devadvance.rootcloakplus-1.apk",  "/data/app/com.topjohnwu.magisk", "/data/app/com.troy1103.hideyourroot-1.apk", "/data/app/eu.chainfire.supersu-1.apk", "/data/app/superuser.apk", "/data/bluestacks.prop", "/data/busybox", "/data/data/com.RootBackupKeeper13_3", "/data/data/com.androvm.vmconfig", "/data/data/com.bluestacks.accelerometerui", "/data/data/com.bluestacks.appfinder", "/data/data/com.bluestacks.appmart", "/data/data/com.bluestacks.appsettings", "/data/data/com.bluestacks.bstcommandprocessor", "/data/data/com.bluestacks.bstfolder", "/data/data/com.bluestacks.help", "/data/data/com.bluestacks.home", "/data/data/com.bluestacks.s2p", "/data/data/com.bluestacks.searchapp", "/data/data/com.bluestacks.settings", "/data/data/com.bluestacks.setup", "/data/data/com.bluestacks.spotlight", "/data/data/com.devadvance.rootcloakplus", "/data/data/com.topjohnwu.magisk", "/data/data/com.troy1103.hideyourroot", "/data/data/com.zachspong.temprootremovejb", "/data/data/eu.chainfire.suhide", "/data/data/eu.chainfire.supersu", "/data/data/eu.chainfire.supersu/connections/", "/data/data/eu.chainfire.supersu/connections/system/", "/data/data/eu.chainfire.supersu/files/supersu.cfg", "/data/data/eu.chainfire.supersu/logs/", "/data/data/eu.chainfire.supersu/requests/", "/data/data/kingoroot.supersu", "/data/data/kingoroot.supersu/connections/", "/data/data/kingoroot.supersu/connections/system/", "/data/data/kingoroot.supersu/files/supersu.cfg", "/data/data/kingoroot.supersu/logs/", "/data/data/kingoroot.supersu/requests/", "/data/data/supersu/", "/data/data/supersu/system/", "/data/local", "/data/local/bin", "/data/local/bin/busybox", "/data/local/bin/magisk", "/data/local/bin/su", "/data/local/busybox", "/data/local/magisk", "/data/local/su", "/data/local/xbin", "/data/local/xbin/busybox", "/data/local/xbin/magisk", "/data/local/xbin/su", "/data/magisk", "/data/magisk/resetprop", "/data/misc/profiles/cur/0/com.android.ld.appstore", "/data/misc/profiles/cur/0/com.bignox.appcenter", "/data/misc/profiles/cur/0/com.ldmnq.launcher3", "/data/misc/profiles/cur/0/com.microvirt.memuime", "/data/misc/profiles/cur/0/eu.chainfire.suhide", "/data/misc/profiles/ref/com.bignox.appcenter", "/data/misc/profiles/ref/com.microvirt.memuime", "/data/misc/profiles/ref/eu.chainfire.suhide", "/data/su", "/data/su.img", "/data/system/taichi", "/data/system/thanos", "/data/user/%d/eu.chainfire.supersu/files/supersu.cfg", "/data/user/%d/eu.chainfire.supersu/logs/", "/data/user/%d/kingoroot.supersu/files/supersu.cfg", "/data/user/%d/kingoroot.supersu/logs/", "/data/user/0/com.android.ld.appstore", "/data/user/0/com.bignox.appcenter", "/data/user/0/com.ldmnq.launcher3", "/data/user_de/%d/eu.chainfire.supersu/files/supersu.cfg", "/data/user_de/%d/eu.chainfire.supersu/logs/", "/data/user_de/0/com.android.ld.appstore", "/data/user_de/0/com.bignox.appcenter", "/data/user_de/0/com.ldmnq.launcher3", "/data/user_de/0/com.microvirt.memuime", "/data/user_de/0/eu.chainfire.suhide", "/data/user_de/0/eu.chainfire.supersu/requests/", "/data/youwave_id", "/dev/.magisk.unblock", "/dev/.su.d", "/dev/.su.d.complete", "/dev/busybox", "/dev/magisk", "/dev/ptmx", "/dev/qemu_pipe", "/dev/socket/baseband_genyd", "/dev/socket/genyd", "/dev/socket/qemud", "/dev/su", "/dev/vboxguest", "/dev/vboxuser", "/fstab.andy", "/fstab.vbox86", "/init.magisk.rc", "/init.remixos.keymap.rc", "/init.remixos.rc", "/init.vbox86.rc", "/magisk/.core/bin/busybox", "/magisk/xposed/system/lib/libart-compiler.so", "/magisk/xposed/system/lib/libart-disassembler.so", "/magisk/xposed/system/lib/libart.so", "/magisk/xposed/system/lib/libsigchain.so", "/mnt/prebundledapps/bluestacks.prop.orig", "/mnt/prebundledapps/propfiles/ics.bluestacks.prop.note", "/mnt/prebundledapps/propfiles/ics.bluestacks.prop.s2", "/mnt/prebundledapps/propfiles/ics.bluestacks.prop.s3", "/mnt/sdcard/bstfolder/inputmapper/com.bluestacks.appmart.cfg", "/mnt/sdcard/buildroid-gapps-ics-20120317-signed.tgz", "/mnt/sdcard/windows/inputmapper/com.bluestacks.appmart.cfg", "/mnt/windows/bstsharedfolder", "/odm/bin/busybox", "/odm/bin/magisk", "/odm/bin/su", "/proc/%d/ns/mnt", "/proc/irq/20/vboxguest", "/proc/irq/9/vboxguest", "/proc/net/tcp", "/proc/net/udp", "/proc/self/task/", "/proc/self/task/23947", "/proc/sys/kernel/random/boot_id", "/proc/tty/drivers", "/product/bin/busybox", "/product/bin/magisk", "/product/bin/su", "/sbin", "/sbin/", "/sbin/.core/db-0/magisk.db", "/sbin/.core/img", "/sbin/.core/mirror", "/sbin/.magisk", "/sbin/.magisk/", "/sbin/busybox", "/sbin/magisk", "/sbin/magiskhide", "/sbin/magiskinit", "/sbin/magiskpolicy", "/sbin/su", "/sdcard/download/magisk_patched.img", "/sdcard/twrp", "/storage/emulated/0/android/data/com.redfinger.appstore", "/storage/emulated/0/android/data/com.topjohnwu.magisk", "/storage/emulated/0/android/media/com.topjohnwu.magisk", "/storage/emulated/0/android/obb/com.topjohnwu.magisk", "/su", "/su/bin/busybox", "/su/bin/daemonsu", "/su/bin/magisk", "/su/bin/su", "/su/xbin/busybox", "/su/xbin/su", "/subin", "/subin/daemonsu", "/subin/su", "/sys/bus/pci/drivers/vboxguest", "/sys/bus/pci/drivers/vboxguest/0000:00:04.0", "/sys/bus/pci/drivers/vboxguest/bind", "/sys/bus/pci/drivers/vboxguest/module", "/sys/bus/pci/drivers/vboxguest/new_id", "/sys/bus/pci/drivers/vboxguest/remove_id", "/sys/bus/pci/drivers/vboxguest/uevent", "/sys/bus/pci/drivers/vboxguest/unbind", "/sys/bus/platform/drivers/qemu_pipe", "/sys/bus/platform/drivers/qemu_trace", "/sys/bus/platform/drivers/vfb_redfinger", "/sys/class/bdi/vboxsf-c", "/sys/class/misc/vboxguest", "/sys/class/misc/vboxuser", "/sys/class/redfinger_audio", "/sys/class/redfinger_camera", "/sys/class/redfinger_gps", "/sys/class/redfinger_sensor", "/sys/devices/platform/hd_power", "/sys/devices/platform/vfb_redfinger.0", "/sys/devices/virtual/bdi/vboxsf-c", "/sys/devices/virtual/misc/bst_gps", "/sys/devices/virtual/misc/bst_ime", "/sys/devices/virtual/misc/bstpgaipc", "/sys/devices/virtual/misc/vboxguest", "/sys/devices/virtual/misc/vboxguest/dev", "/sys/devices/virtual/misc/vboxguest/power", "/sys/devices/virtual/misc/vboxguest/subsystem", "/sys/devices/virtual/misc/vboxguest/uevent", "/sys/devices/virtual/misc/vboxuser", "/sys/devices/virtual/misc/vboxuser/dev", "/sys/devices/virtual/misc/vboxuser/power", "/sys/devices/virtual/misc/vboxuser/subsystem", "/sys/devices/virtual/misc/vboxuser/uevent", "/sys/devices/virtual/redfinger_audio", "/sys/devices/virtual/redfinger_camera", "/sys/devices/virtual/redfinger_gps", "/sys/devices/virtual/redfinger_sensor", "/sys/fs/selinux/enforce", "/sys/module/redfinger_audio", "/sys/module/vboxguest", "/sys/module/vboxsf", "/sys/module/vboxsf/coresize", "/sys/module/vboxsf/notes", "/sys/module/vboxsf/sections", "/sys/module/vboxsf/srcversion", "/sys/module/vboxsf/uevent", "/sys/module/vboxvideo", "/sys/qemu_trace", "/system/addon.d", "/system/addon.d/51-addonsu.sh", "/system/app/Superuser.apk", "/system/app/bluestackshome.apk", "/system/app/com.mumu.launcher", "/system/app/com.mumu.store", "/system/bin", "/system/bin/.ext", "/system/bin/.ext/.su", "/system/bin/.ext/busybox", "/system/bin/.ext/magisk", "/system/bin/.ext/su", "/system/bin/.su", "/system/bin/androvm-prop", "/system/bin/androvm-vbox-sf", "/system/bin/androvm_setprop", "/system/bin/andy-prop", "/system/bin/app_process32_orig", "/system/bin/app_process32_xposed", "/system/bin/app_process64_orig", "/system/bin/app_process64_xposed", "/system/bin/app_process_init", "/system/bin/bstfolderd", "/system/bin/bstsyncfs", "/system/bin/bu", "/system/bin/busybox", "/system/bin/failsafe", "/system/bin/failsafe/busybox", "/system/bin/failsafe/magisk", "/system/bin/failsafe/su", "/system/bin/get_androvm_host", "/system/bin/install-recovery.sh", "/system/bin/magisk", "/system/bin/mount.vboxsf", "/system/bin/nox-prop", "/system/bin/nox-vbox-sf", "/system/bin/noxd", "/system/bin/noxspeedup", "/system/bin/qemu-props", "/system/bin/su", "/system/bin/suhappy", "/system/etc/.installed_su_daemon", "/system/etc/init.androvm.sh", "/system/etc/init.andy.sh", "/system/etc/init.buildroid.sh", "/system/etc/init.d/99supersudaemon", "/system/etc/init.leapdroid.sh", "/system/etc/init.tiantian.sh", "/system/etc/mumu-configs", "/system/etc/security/cacerts/", "/system/framework/XposedBridge.jar", "/system/framework/edxp.jar", "/system/lib/egl/libegl_andy.so", "/system/lib/egl/libegl_tiantianvm.so", "/system/lib/egl/libgles_bst.so", "/system/lib/egl/libglesv1_cm_tiantianvm.so", "/system/lib/egl/libglesv2_tiantianvm.so", "/system/lib/hw/audio.primary.vbox86.so", "/system/lib/hw/camera.vbox86.so", "/system/lib/hw/gps.vbox86.so", "/system/lib/hw/gralloc.vbox86.so", "/system/lib/hw/sensors.vbox86.so", "/system/lib/libc_malloc_debug_qemu.so", "/system/lib/libmemtrack_real.so", "/system/lib/libnoxd.so", "/system/lib/libnoxspeedup.so", "/system/lib/libriru_edxp.so", "/system/lib/libsupol.so", "/system/lib/libwhale.edxp.so", "/system/lib/libxposed_art.so", "/system/lib/modules/3.0.8-android-x86+/extra/vboxguest", "/system/lib/modules/3.0.8-android-x86+/extra/vboxguest/vboxguest.ko", "/system/lib/modules/3.0.8-android-x86+/extra/vboxsf", "/system/lib/modules/3.0.8-android-x86+/extra/vboxsf/vboxsf.ko", "/system/lib/vboxguest.ko", "/system/lib/vboxsf.ko", "/system/lib/vboxvideo.ko", "/system/lib64/libmemtrack_real.so", "/system/lib64/libriru_edxp.so", "/system/lib64/libsupol.so", "/system/lib64/libwhale.edxp.so", "/system/lib64/libxposed_art.so", "/system/sd/xbin", "/system/sd/xbin/busybox", "/system/sd/xbin/magisk", "/system/sd/xbin/su", "/system/su", "/system/usr/idc/androvm_virtual_input.idc", "/system/usr/keylayout/androvm_virtual_input.kl", "/system/usr/we-need-root/busybox", "/system/usr/we-need-root/magisk", "/system/usr/we-need-root/su", "/system/xbin", "/system/xbin/.su", "/system/xbin/.tmpsu", "/system/xbin/amphoras", "/system/xbin/busybox", "/system/xbin/daemonsu", "/system/xbin/magisk", "/system/xbin/mount.vboxsf", "/system/xbin/su", "/system/xbin/sugote", "/system/xbin/sugote-mksh", "/system/xbin/suhappy", "/system/xposed.prop", "/system_ext/bin/busybox", "/system_ext/bin/magisk", "/system_ext/bin/su", "/ueventd.android_x86.rc", "/ueventd.andy.rc", "/ueventd.vbox86.rc", "/vendor/bin/busybox", "/vendor/bin/install-recovery.sh", "/vendor/bin/magisk", "/vendor/bin/su", "/vendor/lib/liblog!.so", "/vendor/xbin/busybox", "/vendor/xbin/magisk", "/vendor/xbin/su", "Superuser.apk" , "air.com.hypa.io.slither", "ait.com.locationfaker", "app.cloner.clone.parallel.multiple.account", "be.rosoco", "berserker.android.apps.sshdroid", "berserker.android.apps.sshdroidpro", "br.com.bott.droidsshd", "brickstudios.gpshack", "busybox", "catch_.me_.if_.you_.can_", "cc.madkite.freedom", "cn.mm.gk", "cn.smartfire.remote", "cn.xt800.support", "com.alephzain.framaroot", "com.allinone.free", "com.amphoras.hidemyroot", "com.amphoras.hidemyrootadfree", "com.android.camera.update", "com.android.keychain", "com.android.preference.help.mole", "com.android.vending.billing.InAppBillingService.COIN", "com.android.vending.billing.inappbillingservice.lackplus", "com.android.vending.billing.inappbillingservice.lock", "com.android.vending.billing.inappbillingservice.luck", "com.android.wp.net.log", "com.anydesk.anydeskandroid", "com.app.and.mobile.locationspoofer", "com.appandmobile.locationspooferfree", "com.arachnoid.sshelper", "com.aura.oobe.samsung", "com.blackmartalpha", "com.chaozhuo", "com.charles.lpoqasert", "com.chelp.inc.appversion", "com.chelpus.lackypatch", "com.chelpus.luckypatcher", "com.cih.game_cih", "com.cxdeberry.geotag", "com.cyjh.gundam", "com.cyjh.mobileanjian", "com.devadvance.rootcloak", "com.devadvance.rootcloakplus", "com.dianxinos.superuser", "com.dimonvideo.luckypatcher", "com.dualspace.multipleaccounts.parallelspace", "com.dv.marketmod.installer", "com.enflick.android.tn2ndline", "com.excean.parallelspace", "com.excelliance.multiaccount", "com.excelliance.multiaccounts", "com.excelliance.multiaccounts.b64", "com.forgottenprojects.mocklocations", "com.formyhm.hideroot", "com.formyhm.hiderootPremium", "com.frapeti.androidbotmaker", "com.huluxia.gametools", "com.iapplize.locationmockup", "com.icecoldapps.serversultimatepro", "com.icecoldapps.sshserver", "com.icecoldapps.vncserverultimate", "com.in.parallel.accounts", "com.iplay.assistant", "com.jiubang.commerce.gomultiple", "com.joeykrim.rootcheck", "com.jumobile.smartapp", "com.kingo.root", "com.kingouser.com", "com.kingroot.kinguser", "com.koushikdutta.rommanager", "com.koushikdutta.rommanager.license", "com.koushikdutta.superuser", "com.landlordgames.tycoon", "com.lbe.parallel.intl", "com.ludashi.dualspace", "com.ludashi.multspace", "com.ludashi.superboost", "com.merlich.gpssimulator_free", "com.mjhdev.fakelocationfree", "com.mueskor.superuser.su", "com.multiple.space", "com.multipleaccounts.parallelspace", "com.mwr.dz", "com.mwr.mercury", "com.my.fake.location", "com.nanoo.darkswords", "com.network_remote_control_phone_2", "com.nickc.pixel_vnc", "com.noshufou.android.su", "com.noshufou.android.su", "com.noshufou.android.su.elite", "com.oasisfeng.greenify", "com.ocd.dev.gpsforger", "com.pace.cpubooster", "com.parallel.space.lite", "com.parallelspace.multipleaccounts.appclone", "com.polestar.domultiple", "com.polestar.superclone", "com.polliapps.fakelocation", "com.ram.memory.booster.cpu.saver", "com.ramdroid.appquarantine", "com.ramdroid.appquarantinepro", "com.repodroid.app", "com.retina22.ms6", "com.saurik.substrate", "com.sbgamehacker", "com.schumi.vncs", "com.shankarlabs.teleport", "com.sidheinteractive.slf.dr", "com.smedialink.oneclickroot", "com.solohsu.android.edxp.manager", "com.spinxbackup.backupapp", "com.sppsap_mlabss.alarm", "com.system.dbprocess", "com.teslacoilsw.quicksshd", "com.theolivetree.sshserver", "com.thinkmobile.accountmaster", "com.thirdparty.superuser", "com.tim.apps.mockgps", "com.tistory.maxxgreen.app.virtuallocation", "com.topjohnwu.magisk", "com.topjohnwu.magisk", "com.toptools.rootactivitymonitorbooster", "com.trendmicro.tmas", "com.tsng.hidemyapplist", "com.vmlite.vncserver", "com.vqs.iphoneassess", "com.wifi99.android.locationcheater", "com.wondershare.drfone", "com.x0.strai.frep", "com.xmodgame", "com.xxassistant", "com.yedapps.fakelocation.app.app.fakelocation", "com.yellowes.su", "com.yy.multi", "com.zachspong.temprootremovejb", "com.zhangkongapp.joke.bamenshenqi", "com.zhiqupk.root.global", "com.zmapp", "comod.baseappfull.fwd", "de.robv.android.xposed.installer", "de.russcity.movemygpstb", "de/robv/android/xposed/xposedbridge", "eu.chainfire.supersu", "eu.chainfire.supersu.pro", "eu.faircode.xlua", "eu.faircode.xlua.pro", "foster.parallelspace.dualspace", "fr.dvilleneuve.lockito", "fstab.andy", "fstab.goldfish", "fstab.nox", "fstab.ttvm_x86", "fstab.vbox86", "goldfish", "idv.aqua.bulldog", "in.introkun.setmacaddress", "init.android_x86_64.rc", "init.andy.rc", "init.goldfish.rc", "init.nox.rc", "init.ranchu.rc", "init.rc", "init.remixos.rc", "init.superuser.rc", "init.svc.", "init.svc.flash_recovery", "init.svc.flash_recovery_sec", "init.svc.magisk_pfs", "init.svc.magisk_pfsd", "init.svc.magisk_service", "init.ttvm_x86.rc", "init.vbox86.rc", "install-recovery.sh", "jp.clonespace.plum", "jp.netart.armoving", "jp.netart.arstalking", "kr.woot0pia.gps", "lbe.parallel.intl.excelliance.multiaccount", "libc_malloc_debug_qemu.so", "libriru", "locationplay.gpscheat", "locationplay.gpscheatfree", "magisk", "magisk.version", "magiskpolicy", "me.phh.superuser", "me.shkschneider.dropbearserver", "multiple.multiple.parallel.accounts.cloner.mochat", "net.aisence.touchelper", "net.aldycew.goroot", "net.hackerbot.hbsiteapp", "net.kdl.talkbackts", "net.kdl.tesline01", "net.kdl.teslinekeyboard", "net.kidlogger.kidloggerkeyboard", "net.kidlogger.kidloggerlight", "net.missingtricks.gbwhatsappdownloades", "net.teslineservice.kidl5", "net.xdevelop.rm", "nox-vbox-sf", "org.ajeje.fakelocation", "org.ajeje.locationspooferpro", "org.blackmart.market", "org.cheatengine.cegui", "org.creeplays.hack", "org.digimead.digi.ctrl", "org.digimead.digi.ctrl.sshd", "org.masteraxe.superuser", "org.meowcat.edxposed.manager", "org.mobilism.android", "org.onaips.vnc", "org.sbtools.gamehack", "persist.magisk.hide", "projekt.substratum", "qemu-props", "qemu_pipe", "qemu_trace", "qemud", "resetprop", "ro.boot.verifiedbootstate", "ro.magisk.disable", "ru.gavrikov.mocklocations", "sbgamehacker.net", "sinhhuynh.map.fakelocation", "superuser.apk", "supolicy", "tw.euudlm.mon", "ueventd.android_x86.rc", "ueventd.android_x86_64.rc", "ueventd.andy.rc", "ueventd.nox.rc", "ueventd.ttvm_x86.rc", "ueventd.vbox86.rc", "us.sifitich.root.all.devices", "vboxguest", "vboxuser", "whatschat.parallelspace.cloneapp.multipleaccounts", "x86.prop", "zygisk");
var Executable = ["busybox", "resetprop", "supolicy", "magiskpolicy", "magisk", "sh", "getprop", "which", "mount", "build.prop", "id", "su", "ps", "getenforce", "/system/bin/sh", "pm", "path", "PATH"];
var readPtr = Module.findExportByName("libc.so", "read");
var read = new NativeFunction(readPtr, 'int', ['int', 'pointer', "int"]);
var openPtr = Module.findExportByName("libc.so", "open");
var open = new NativeFunction(openPtr, 'int', ['pointer', 'int']);
Interceptor.replace(openPtr, new NativeCallback(function(pathname, flag) {
    var FD = open(pathname, flag);
    // console.log("open : ",FD);
    var Path = pathname.readCString();
        if (Path.indexOf("/proc/") >= 0 && Path.indexOf("maps") >= 0) {
        /* 
          No Idea Why it crash on some apk, feel fee to change "maps" to something else if crash occurred 
        */
        console.log("open : ", Path)        
        while (parseInt(read(FD, MapsBuffer, 512)) !== 0) {
            var MBuffer = MapsBuffer.readCString();
          //MBuffer = MBuffer.replaceAll(" /system/", "FakingMaps");
          //MBuffer = MBuffer.replaceAll(" /vendor/", "FakingMaps");
          //MBuffer = MBuffer.replaceAll(" /product/", "FakingMaps");
          //MBuffer = MBuffer.replaceAll(" /system_ext/", "FakingMaps");
          //MBuffer = MBuffer.replaceAll(" /data/", "FakingMaps");
            MBuffer = MBuffer.replaceAll("libriru", "FakingMaps");
            MBuffer = MBuffer.replaceAll("frida", "FakingMaps");
            MBuffer = MBuffer.replaceAll("magisk", "FakingMaps");                          
            MapsFile.write(MBuffer);
        }
        
        var filename = Memory.allocUtf8String(FakeMaps);
        return open(filename, flag);                        
    }
    if (Path.indexOf("/proc/") >= 0 && Path.indexOf("mounts") >= 0) {
        console.log("open : ", Path)
        while (parseInt(read(FD, MountBuffer, 512)) !== 0) {
            var MNTBuffer = MountBuffer.readCString();
            MNTBuffer = MNTBuffer.replaceAll("magisk", "MadeBy@ApkUnpacker");
            MNTBuffer = MNTBuffer.replaceAll("/sbin/.magisk", "MadeBy@ApkUnpacker");
            MNTBuffer = MNTBuffer.replaceAll("libriru", "MadeBy@ApkUnpacker");
            MNTBuffer = MNTBuffer.replaceAll("xposed", "MadeBy@ApkUnpacker");
            MNTBuffer = MNTBuffer.replaceAll("mirror", "MadeBy@ApkUnpacker");
            MNTBuffer = MNTBuffer.replaceAll("system_root", "MadeBy@ApkUnpacker");
            MNTBuffer = MNTBuffer.replaceAll("xposed", "MadeBy@ApkUnpacker")
            FMountFile.write(MNTBuffer);
        }
        var mountname = Memory.allocUtf8String(FakeMounts);
        return open(mountname, flag);
    }
    if (Path.indexOf("/proc/") >= 0 && Path.indexOf("mountinfo") >= 0) {
        console.log("open : ", Path)
        while (parseInt(read(FD, MountInfoBuffer, 512)) !== 0) {
            var MInfo = MountInfoBuffer.readCString();
            MInfo = MInfo.replaceAll("magisk", "MadeBy@ApkUnpacker");
            MInfo = MInfo.replaceAll("/sbin/.magisk", "MadeBy@ApkUnpacker");
            MInfo = MInfo.replaceAll("libriru", "MadeBy@ApkUnpacker");
            MInfo = MInfo.replaceAll("xposed", "MadeBy@ApkUnpacker");
            MInfo = MInfo.replaceAll("mirror", "MadeBy@ApkUnpacker");
            MInfo = MInfo.replaceAll("system_root", "MadeBy@ApkUnpacker");
            MInfo = MInfo.replaceAll("xposed", "MadeBy@ApkUnpacker")
            FMInfo.write(MInfo);
        }
        var mountinfoname = Memory.allocUtf8String(FakeMountInfo);
        return open(mountinfoname, flag);
    }
    if (Path.indexOf("/proc/") >= 0 && Path.indexOf("cmdline") < 0 && Path.indexOf("timer") < 0) {
        console.log("Opening interesting Path : ", Path);
    }
    var Hide = (RootPath.indexOf(Path) > -1);
    if (Hide) {
        console.log("Open : ", Path);
        pathname.writeUtf8String("MadeBy@ApkUnpacker");
        return open(pathname, flag);
    }
    return FD;
}, 'int', ['pointer', 'int']))

var popenPtr = Module.findExportByName("libc.so", "popen");
var popen = new NativeFunction(popenPtr, 'pointer', ['pointer', 'pointer']);
Interceptor.replace(popenPtr, new NativeCallback(function(path, type) {
    var exe = path.readCString();
    var Hide = (Executable.indexOf(exe) > -1);
    console.log("popen : ", exe);
    if (Hide) {
        console.log("popen : ", exe);
        path.writeUtf8String("pm path com.android.settings");
        return popen(path, type);
    }
    return popen(path, type);
}, 'pointer', ['pointer', 'pointer']))
var fopenPtr = Module.findExportByName("libc.so", "fopen");
var fopen = new NativeFunction(fopenPtr, 'pointer', ['pointer', 'pointer']);
Interceptor.replace(fopenPtr, new NativeCallback(function(fname, mode) {
    var retval = fopen(fname, mode);
    var Path = fname.readCString();
    var Hide = (RootPath.indexOf(Path) > -1);
    if (Hide) {
        console.log("fopen : ", Path);
        fname.writeUtf8String("MadeBy@ApkUnpacker");
        return fopen(fname, flag);
    }
    return retval;
}, 'pointer', ['pointer', 'pointer']))
var inotifyPtr = Module.findExportByName(null, "inotify_add_watch");
var inotify = new NativeFunction(inotifyPtr, 'int', ['int', 'pointer', 'uint']);
Interceptor.replace(inotifyPtr, new NativeCallback(function(fd, pathname, mask) {
    var retval = inotify(fd, pathname, mask);
    var name = pathname.readCString();
    console.log("inotify_add_watch : ",fd,pathname.readCString(),mask,retval);  
    if(name.indexOf("/proc")>=0) 
    {    
       // console.log("inotify_add_watch : ",fd,pathname.readCString(),mask,retval);  
      //  return -1;  
    }
    return retval;
   // return -1;  
}, 'int', ['int', 'pointer', 'uint']))

var accessPtr = Module.findExportByName("libc.so", "access");
var access = new NativeFunction(accessPtr, 'int', ['pointer', 'int']);
Interceptor.replace(accessPtr, new NativeCallback(function(pathname, mode) {
    var FN = access(pathname, mode);
    var Path = pathname.readCString();
    var Hide = (RootPath.indexOf(Path) > -1);
    if (Hide) {
        console.log("access : ", Path);
        pathname.writeUtf8String("MadeBy@ApkUnpacker");
        return access(pathname, mode);
    }
    return access(pathname, mode);
}, 'int', ['pointer', 'int']))
var systemPtr = Module.findExportByName("libc.so", "system");
var system = new NativeFunction(systemPtr, 'int', ['pointer']);
Interceptor.replace(systemPtr, new NativeCallback(function(command) {
    var cmd = command.readCString();
    var Hide = (Executable.indexOf(cmd) > -1);
    if (Hide) {
        console.log("system : ", command);
        command.writeUtf8String("MadeBy@ApkUnpacker");
        return system(command);
    }
    return system(command);
}, 'int', ['pointer']))
var statPtr = Module.findExportByName("libc.so", "stat");
var stat = new NativeFunction(statPtr, 'int', ['pointer', 'pointer']);
Interceptor.replace(statPtr, new NativeCallback(function(pathname, statbuf) {
    var PH = pathname.readCString();
    var Hide = (RootPath.indexOf(PH) > -1);
    if (Hide) {
        console.log("stat : ", PH);
        pathname.writeUtf8String("MadeBy@ApkUnpacker");
        return stat(pathname, statbuf);
    }
    return stat(pathname, statbuf);
}, 'int', ['pointer', 'pointer']))
Interceptor.attach(Module.findExportByName(null, "strstr"), {
    onEnter: function(args) {
        this.root = false;
        var str1 = args[0].readCString();
        var str2 = args[1].readCString();
        var Hide = (RootPath.indexOf(str1) > -1);
        var Hide2 = (RootPath.indexOf(str2) > -1);
        if (Hide == true || Hide2 == true) {
            this.root = true;
           // console.log("strstr : ", str1, str2);
        }
        if (str1.indexOf(" /system/") !== -1 || str2.indexOf(" /system/") !== -1 || str1.indexOf(" /vendor/") !== -1 || str2.indexOf(" /vendor/") !== -1 || str1.indexOf(" /product/") !== -1 || str2.indexOf(" /product/") !== -1 || str1.indexOf(" /system_ext/") !== -1 || str2.indexOf(" /system_ext/") !== -1 || str1.indexOf("linker") !== -1 || str2.indexOf("linker") !== -1) 
        {
            //this.root = true;
            //console.log("strstr : ",str1,str2); 
        }
    },
    onLeave: function(retval) {
        if (this.root) {
            retval.replace(0);
        }
    }
});

var systemPropFindPtr = Module.findExportByName("libc.so", "__system_property_find");
var systemPropFind = new NativeFunction(systemPropFindPtr, 'pointer', ['pointer']);
Interceptor.replace(systemPropFindPtr, new NativeCallback(function(command) {
    var cmd = command.readCString();
    var Hide = (RootPath.indexOf(cmd) > -1);
    if (Hide) {
        console.warn("system_Prop_Find: ", cmd, systemPropFind(command));
        command.writeUtf8String("cp");
        return systemPropFind(command);
    }
    return systemPropFind(command);
}, 'pointer', ['pointer']))

var strtokPtr = Module.findExportByName("libc.so", "strtok");
var strtok = new NativeFunction(strtokPtr, 'pointer', ['pointer', 'pointer']);
Interceptor.replace(strtokPtr, new NativeCallback(function(str, delim) {
    var exe = str.readCString();
    var exe2 = delim.readCString();
    var Hide = (Executable.indexOf(exe) > -1);
    var Hide2 = (Executable.indexOf(exe) > -1);  
    if (Hide) {
        console.log("strtok : ", exe);
        str.writeUtf8String("pm path com.android.settings");
        return strtok(str, delim);
    }
    if (Hide2) {
        console.log("strtok : ", delim);
        delim.writeUtf8String("pm path com.android.settings");
        return strtok(str, delim);
    }
    return strtok(str, delim);
}, 'pointer', ['pointer', 'pointer']))

var faccessatPtr = Module.findExportByName("libc.so", "faccessat");
var faccessat = new NativeFunction(faccessatPtr, 'int', ['int', 'pointer', 'int', 'int']);
Interceptor.replace(faccessatPtr, new NativeCallback(function(dirfd, path, mode, flag) {
    var retval = faccessat(dirfd, path, mode, flag);
    var PN = path.readCString();
    var Hide = (RootPath.indexOf(PN) > -1);  
    if (Hide) {
        console.log("faccessat : ", PN,retval);
        path.writeUtf8String("MadeBy@ApkUnpacker");
        return faccessat(dirfd, path, mode, flag);
    }
    return faccessat(dirfd, path, mode, flag);
}, 'int', ['int', 'pointer', 'int', 'int']))
try{
var getenvPtr = Module.findExportByName("libc.so", "getenv");
var getenv = new NativeFunction(getenvPtr, 'pointer', ['pointer']);
Interceptor.replace(getenvPtr, new NativeCallback(function(command) {
    var cmd = command.readCString();
    var Hide = (Executable.indexOf(cmd) > -1);
    if (Hide) {
        console.log("getenv: ", cmd, getenv(command));
        command.writeUtf8String("time");
        return getenv(command);
    }
    return getenv(command);
}, 'pointer', ['pointer']))

}catch(e) {}
var pathconfPtr = Module.findExportByName("libc.so", "pathconf");
var pathconf = new NativeFunction(pathconfPtr, 'long', ['pointer', 'int']);
Interceptor.replace(pathconfPtr, new NativeCallback(function(path, name) {
    var PN = path.readCString();
    var Hide = (RootPath.indexOf(PN) > -1);
    if (Hide) {
        console.log("pathconf : ", PN);
        pathname.writeUtf8String("MadeBy@ApkUnpacker");
        return pathconf(path, name);
    }
    return pathconf(path, name);
}, 'long', ['pointer', 'int']))

/*
 Other Exec* Method also there but not covered them because of less use
*/
try {
    var execvPtr = Module.findExportByName("libc.so", "execv");
    var execv = new NativeFunction(execvPtr, 'int', ['pointer', 'pointer']);
    Interceptor.replace(execvPtr, new NativeCallback(function(pathname, argv) {
        var PH = pathname.readCString();
        var Hide = (Executable.indexOf(PH) > -1);
         console.log("execv : ",PH);
        if (Hide) {
            console.log("execv : ", PH);
            pathname.writeUtf8String("/system/bin/cp");
            return execvPtr(pathname, statbuf);
        }
        return execvPtr(pathname, statbuf);
    }, 'int', ['pointer', 'pointer']))
} catch (e) {
    console.error(e);
}
try {
    var execvpPtr = Module.findExportByName("libc.so", "execvp");
    var execvp = new NativeFunction(execvpPtr, 'int', ['pointer', 'pointer']);
    Interceptor.replace(execvpPtr, new NativeCallback(function(pathname, argv) {
        var PH = pathname.readCString();
        var Hide = (Executable.indexOf(PH) > -1);
         console.log("execvp : ",PH);
        if (Hide) {
            console.log("execvp : ", PH);
            pathname.writeUtf8String("/system/bin/cp");
            return execvp(pathname, argv);
        }
        return execvp(pathname, argv);
    }, 'int', ['pointer', 'pointer']))
} catch (e) {
    console.error(e);
}
try {
    var execvpePtr = Module.findExportByName("libc.so", "execvpe");
    var execvpe = new NativeFunction(execvpePtr, 'int', ['pointer', 'pointer', 'pointer']);
    Interceptor.replace(execvpePtr, new NativeCallback(function(pathname, argv, envp) {
        var PH = pathname.readCString();
        var Hide = (Executable.indexOf(PH) > -1);      
        if (Hide) {
            console.log("execvpe : ", PH);
            pathname.writeUtf8String("/system/bin/cp");
            return execvpe(pathname, argv, envp);
        }
        return execvpe(pathname, argv, envp);
    }, 'int', ['pointer', 'pointer', 'pointer']))
} catch (e) {
    console.error(e);
}
Java.performNow(function() {
    try {
        var NewPKG = "com.that.package.which.not.exist";
        var PackageManagerC = Java.use("android.content.pm.PackageManager");
        var PackageManager = Java.use("android.app.ApplicationPackageManager");
        PackageManager.getPackageInfo.overload('java.lang.String', 'int').implementation = function(pkgname, flags) {
            var Hide = (RootPath.indexOf(pkgname) > -1);
            if (Hide) {
                console.log("Bypass Package: " + pkgname);
                var newpkgname = "this.is.funny.package.name";
                return this.getPackageInfo.call(this, newpkgname, flags);
            }
            return this.getPackageInfo.call(this, pkgname, flags);
        }
        PackageManager.getApplicationInfo.overload("java.lang.String", "int").implementation = function(str, flag) {
            var PKInfo = this.getApplicationInfo(str, flag);
            var Hide = (RootPath.indexOf(str) > -1);
            if (Hide) {
                console.log("AppInfo By getApplicationInfo 2", str);
                return this.getApplicationInfo.call(this, NewPKG, flag);
            }
            return PKInfo;
        }

        var APM = Java.use("android.app.ApplicationPackageManager");
        APM.getLaunchIntentForPackage.overload("java.lang.String").implementation = function(pkg) {
            var Hide = (RootPath.indexOf(pkg) > -1);
            if (Hide) {
                console.log("getLaunchIntentForPackage : ", pkg);
                var fix = "com.google.play.store";
                return this.getLaunchIntentForPackage.call(this, fix);
            }
            return this.getLaunchIntentForPackage(pkg);

        }
        APM.getPackageUidAsUser.overload("java.lang.String", "int").implementation = function(pkg, one) {
            var Hide = (RootPath.indexOf(pkg) > -1);
            if (Hide) {
                console.log("getPackageUidAsUser :", pkg);
                var fix = "com.google.play.store";
                return this.getPackageUidAsUser.call(this, fix, one);
            }
            return this.getPackageUidAsUser(pkg, one);

        }
        APM.getPackageUidAsUser.overload("java.lang.String", "int", "int").implementation = function(pkg, one, two) {
            var Hide = (RootPath.indexOf(pkg) > -1);
            if (Hide) {
                console.log("getPackageUidAsUser : ", pkg);
                var fix = "com.google.play.store";
                return this.getPackageUidAsUser.call(this, fix, one, two);
            }
            return this.getPackageUidAsUser(pkg, one, two);

        }
        APM.getPackageUid.overload("java.lang.String", "int").implementation = function(pkg, one) {
            var Hide = (RootPath.indexOf(pkg) > -1);
            if (Hide) {
                console.log("getPackageUid :", pkg);
                var fix = "com.google.play.store";
                return this.getPackageUid.call(this, fix, one);
            }
            return this.getPackageUid(pkg, one);

        }

        APM.getPackageInfoAsUser.overload("java.lang.String", "int", "int").implementation = function(pkg, one, two) {
            var Hide = (RootPath.indexOf(pkg) > -1);
            if (Hide) {
                console.log("getPackageInfoAsUser : ", pkg);
                var fix = "com.google.play.store";
                return this.getPackageInfoAsUser.call(this, fix, one, two);
            }
            return this.getPackageInfoAsUser(pkg, one, two);

        }

        APM.getApplicationInfoAsUser.overload("java.lang.String", "int", "int").implementation = function(pkg, one, two) {
            var Hide = (RootPath.indexOf(pkg) > -1);
            if (Hide) {
                console.log("getApplicationInfoAsUser : ", pkg);
                var fix = "com.google.play.store";
                return this.getApplicationInfoAsUser.call(this, fix, one, two);
            }
            return this.getApplicationInfoAsUser(pkg, one, two);

        }

        APM.getApplicationInfo.overload("java.lang.String", "int").implementation = function(pkg, one) {
            var Hide = (RootPath.indexOf(pkg) > -1);
            if (Hide) {
                console.log("getApplicationInfo : ", pkg);
                var fix = "com.google.play.store";
                return this.getApplicationInfo.call(this, fix, one);
            }
            return this.getApplicationInfo(pkg, one);

        }

        PackageManagerC.getPackageInfo.overload('java.lang.String', 'int').implementation = function(pkgname, flags) {
            var Hide = (RootPath.indexOf(pkgname) > -1);
            if (Hide) {
                console.log("Bypass Package: " + pkgname);
                var newpkgname = "this.is.funny.package.name";
                return this.getPackageInfo.call(this, newpkgname, flags);
            }
            return this.getPackageInfo.call(this, pkgname, flags);
        }

        var StubProxy = Java.use("android.content.pm.IPackageManager$Stub$Proxy");
        StubProxy.getPackageInfo.overload("java.lang.String", "int", "int").implementation = function(Str, Flag, Flag2) {
            var PKInfo = this.getPackageInfo(Str, Flag, Flag2);
            var Hide = (RootPath.indexOf(Str) > -1);
            if (Hide) {
                console.log("app Info By getPackageInfo",Str);
                return this.getPackageInfo.call(this, NewMagisk, Flag, Flag2);
            }
            return PKInfo;
        }
        StubProxy.getApplicationInfo.overload("java.lang.String", "int", "int").implementation = function(Str, Flag, Flag2) {
            var PKInfo = this.getApplicationInfo(Str, Flag, Flag2);
           var Hide = (RootPath.indexOf(Str) > -1);
            if (Hide) {
                console.log("app Info By getApplicationInfo",Str);
                return this.getApplicationInfo.call(this, NewMagisk, Flag, Flag2);
            }
            return PKInfo;
        }
        
        
        
        var ioFile = Java.use('java.io.File');
        ioFile.exists.implementation = function() {
            var name = ioFile.getName.call(this);
            var FakeReturn = (RootPath.indexOf(name) > -1);
            var FakeReturn2 = (Executable.indexOf(name) > -1);
            if (FakeReturn) {
                console.log("Binary : ", name, " Check Found");
                return false;
            }
            if (FakeReturn2) {
                console.log("Binary 2 : ", name, " Check Found");
                return false;
            }
            return this.exists.call(this);
        };
        var Context = Java.use('android.app.ContextImpl');
        Context.bindIsolatedService.overload("android.content.Intent", "int", "java.lang.String", "java.util.concurrent.Executor", "android.content.ServiceConnection").implementation = function(intent, i, str, current, service) {
            var ToS = intent.toString();
            if (ToS.indexOf("com.google.android.webview") < 0) {
                console.warn("Isolated Service Started , Probably Checks : ", intent);
            }
            return this.bindIsolatedService(intent, i, str, current, service);
        }
        var BufferedReader = Java.use('java.io.BufferedReader');
        BufferedReader.readLine.overload().implementation = function() {
            var text = this.readLine.call(this);
            if (text === null) {} else {
                var Hide = (RootPath.indexOf(text) > -1);
                if (Hide) {
                    console.log("Bypass readline : ", text);
                    var cool = "we.from.other.universe";
                    return cool;
                }
            }
            return text;
        };
    } catch (e) {
        console.error(e);
    }
})
