# If you want to move down the line, please use \n. e.g: Evan\nRaj.
# After changed, you have to restart the bot to use.
# Put the # character at the beginning of each sentence if you don't want the code to run those lines. 
# Thanks to https://www.facebook.com/ThE.WoLf.EvAn.RaJ for translate to English!

# raj.js 

evanraj.newVersionDetected=𝐘𝐨𝐮 𝐚𝐫𝐞 𝐮𝐬𝐢𝐧𝐠 𝐯𝐞𝐫𝐬𝐢𝐨𝐧 %1, 𝐭𝐡𝐞 𝐥𝐚𝐭𝐞𝐬𝐭 𝐯𝐞𝐫𝐬𝐢𝐨𝐧 𝐢𝐬 %2. 𝐏𝐥𝐞𝐚𝐬𝐞 𝐮𝐩𝐝𝐚𝐭𝐞 𝐭𝐨 𝐭𝐡𝐞 𝐥𝐚𝐭𝐞𝐬𝐭 𝐯𝐞𝐫𝐬𝐢𝐨𝐧 𝐟𝐨𝐫 𝐛𝐞𝐭𝐭𝐞𝐫 𝐛𝐨𝐭 𝐩𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞. 𝐅𝐨𝐫 𝐮𝐩𝐝𝐚𝐭𝐞 𝐭𝐲𝐩𝐞 𝐢𝐧 𝐜𝐨𝐧𝐬𝐨𝐥𝐞/𝐜𝐦𝐝: 𝐧𝐨𝐝𝐞 𝐮𝐩𝐝𝐚𝐭𝐞
evanraj.errorFormat=Malformed module!
evanraj.nameExist=Module's name is similar to another module!
evanraj.notFoundLanguage=Module %1 don't support your language
evanraj.notFoundPackage=Can't find package %1 support for module %2, installing...
evanraj.cantInstallPackage=Can't install package %1 for module %2, error: %3
evanraj.loadedPackage=Installed whole package successfully for module %1
evanraj.loadedConfig=Installed config successfully for module %1
evanraj.cantLoadConfig=Can't install config of module %1, error: %2
evanraj.cantOnload=Can't launch setup of module %1, error: %1
evanraj.successLoadModule=Successfully installed module %1
evanraj.failLoadModule=Can't install module %1, error: %2
evanraj.finishLoadModule=Installed %1 module commands and %2 module events successfully 
evanraj.foundPathAppstate=Found appstate file now logging in...
evanraj.notFoundPathAppstate=Error can't find appstate file maybe file is malformed!
evanraj.checkListGban=Checking global ban list...
evanraj.banDevice=Your device has been banned from EVAN RAJ Project, please contact to facebook https://www.facebook.com/ThE.WoLf.EvAn.RaJ to know more information or asking for unban key, if you already have unban key, please fill it below.
evanraj.keyNotSameFormat=Wrong format, code must contain 6 number.
evanraj.codeInputExpired=Your code is wrong or out of date.
evanraj.unbanDeviceSuccess=Your device is unbanned now, please restart to use.
evanraj.userBanned=You had been banned from EVAN RAJ Project when %1 with reason: %2. Please contact to facebook https://www.facebook.com/ThE.WoLf.EvAn.RaJ to have more information!
evanraj.finishCheckListGban=Checked global ban list
evanraj.handleListenError=handleListene has occurred some unexpected error, error : %1
evanraj.warningSourceCode=DETECTED THAT SOURCE CODE'S STRUCTURE HAD BEEN CHANGED , STOP NOW!
evanraj.refreshListen=Refreshed handleListener...
evanraj.successConnectDatabase=Connected to database successfully!
evanraj.failConnectDatabase=Failed to connect to database, error: %1

# includes/listen.js

listen.startLoadEnvironment=Proceed to load the environment variable ...
listen.loadedEnvironmentThread=Loaded thread environment variable successfully 
listen.loadedEnvironmentUser=Loaded user environment variable successfully 
listen.successLoadEnvironment=Loaded environment variable successfully 
listen.failLoadEnvironment=Can't load environment variable, error: %1

# includes/controller/currencies.js

currencies.needObjectOrArray=Have to be an Array or an Object or maybe both
currencies.needObject=Have to be an Object
currencies.needNumber= Have to be a number

# includes/controller/threads.js

threads.needObjectOrArray=Have to be an Array or an Object or maybe both
threads.needObject=Have to be an Object 

# includes/controller/users.js

users.needObjectOrArray=Have to be an Array or an Object or maybe both
users.needObject=Have to be an Object

# includes/handle/handleCommand.js

handleCommand.userBanned=⛔️~You are Banned 🤭!~🚫\n%1\n%2\nContact BOT Owner EVAN RAJ 🖤 For Unban ⚠️
handleCommand.threadBanned=⛔️Your Thread/Box/Group Has Been Banned!⛔️\n%1\n%2 Please Contact Owner EVAN RAJ For Unban ⚠️
handleCommand.commandNotExist=Please type the full command 😹 %1 Yes Or Not ? 🙄
handleCommand.commandThreadBanned=Your thread is unable to use command "%1"
handleCommand.commandUserBanned=You are unable to use command "%1"
handleCommand.threadNotAllowNSFW=Your thread is not allowed to use NSFW commands
handleCommand.cantGetInfoThread=Can't get your thread's info, error: %1
handleCommand.permssionNotEnough=📑 This command 📝 is allowed only for my Owner ✋❌ "%1"
handleCommand.cantSetMessageReaction=Having some unexpected error at setMessageReaction, error: %1
handleCommand.executeCommand=[ %1 ] Command used: %2 by user: %3 at thread: %4 | Args included: %5 | Processing time: %6ms
handleCommand.commandError=Having some unexpected error when using command %1, error: %2

# includes/handle/handleCommandEvent.js

handleCommandEvent.moduleError=Having some unexpected error when using command %1, error: %2

# includes/handle/handleCreateDatabase.js

handleCreateDatabase.newThread=new thread: %1
handleCreateDatabase.newUser=new user %1

# includes/handle/handleEvent.js

handleEvent.executeEvent=[ %1 ] Event was executed: %2 at thread: %3 | Processing time: %4ms
handleEvent.eventError=Having some error when executing event %1, error: %12

# includes/handle/handleReaction.js

handleReaction.missingValue=Missing value to respond to your problem
handleReaction.executeError=Having some error when responding to your problem, error: %1

# includes/handle/handleReply.js

handleReply.missingValue=Missing value to respond to your problem
handleReply.executeError=Having some error when responding to your problem, error: %1

# includes/handle/handleSchedule.js

handleSchedule.exectuteError=Having some error when schedule at module %1, error: %2

# utils/index.js

utils.throwError=ℹ️ [!] This command is not working, try another one. Use %1help %2 for more usage 😉 ℹ️

# updater.js

updater.latestVersion=You are using the latest version
updater.cantFindVersion=You are using an undefined version (%1), please check your package.json file again
updater.newVersions=There are %1 new versions to update, starting to update...
updater.updateSuccess=Update successfully %1
updater.configChanged=The %1 has been changed, please check your config.json file again
updater.installingPackages=Installing dependencies for bot...
updater.installSuccess=Installed dependencies successfully, restart the bot to use the new version
updater.backupSuccess=Successfully backed up changed files, see in the %1 folder
updater.restartToApply=. Restart the bot to apply the new version
updater.skipFile=There is a new version of the %1 file, but you have skipped this file during the update process with the comment %2 in this file
