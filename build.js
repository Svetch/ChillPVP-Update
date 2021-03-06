const builder = require('electron-builder')
const Platform = builder.Platform
function getCurrentPlatform(){
    switch(process.platform){
        case 'win32':
            return Platform.WINDOWS
        case 'darwin':
            return Platform.MAC
        case 'linux':
            return Platform.linux
        default:
            console.error('Cannot resolve current platform!')
            return undefined
    }
}

builder.build({
    targets: (process.argv[2] != null && Platform[process.argv[2]] != null ? Platform[process.argv[2]] : getCurrentPlatform()).createTarget(),
    //publish:"always",
    config: {
        appId: 'ChillPVP-Update',
        productName: 'ChillPVP-Update',
        artifactName: '${productName}.${ext}',
        copyright: 'Copyright © 2020-2020 ChillPVP Kft.',
        publish: [
            {
                provider: "github",
                owner: "Svetch",
                repo:"ChillPVP-Update"
            }],
        directories: {
            buildResources: 'src/build',
            output: 'build'
        },
        win: {
            target: [
                {
                    target: 'nsis',
                    arch: 'x64',
                }
            ]
        },
        nsis: {
            oneClick: false,
            perMachine: false,
            allowElevation: true,
            allowToChangeInstallationDirectory: true
        },
        mac: {
            target: 'dmg',
            category: 'public.app-category.games'
        },
        linux: {
            target: 'AppImage',
            maintainer: 'ChillPVP',
            vendor: 'ChillPVP',
            synopsis: 'Modded Minecraft Updater',
            description: 'Custom launcher which allows users to join modded servers. All mods, configurations, and updates are handled automatically.',
            category: 'Game'
        },
        compression: 'maximum',
        files: [
            '!{dist,.gitignore,.vscode,docs,dev-app-update.yml,.travis.yml,.nvmrc,.eslintrc.json,build.js}'
        ],
        extraResources: [
            'libraries'
        ],
        asar: true
    }
}).then(() => {
    console.log('Build complete!')
}).catch(err => {
    console.error('Error during build!', err)
})