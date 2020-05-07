const {ipcRenderer, remote, shell, webFrame,} =require('electron');
var info = document.getElementById("info");
ipcRenderer.on('update-notofication',(sender,nitification,args)=>{
    switch (nitification) {
        case 'update-available':
            info.innerHTML ="Updating...";
            console.log('update-available');
            break;
        case 'update-downloaded':
            info.innerHTML = "Update donwloaded. Restaring app after " + i;    
            console.log('update-downloaded');
            break;
        case 'update-not-available':
            info.innerHTML = "Not update";
            console.log('update-not-available');
            break;
        case 'checking-for-update':
            info.innerHTML = "Checking for updates...";
            console.log('checking-for-update');
            break;
        case 'update-error':
            info.innerHTML = 'Error during update...';
            remote.getCurrentWindow().close();
            console.log('update-error');
            break;
        case 'download-progress':
            let message = `Download speed: ${args.bytesPerSecond/1024/1024} mb/s ${args.percentage}`;
            info.innerHTML = message;
            break;
        default:
            break;
    }
});
//afasdfcéoughsdlvfjkhgsl