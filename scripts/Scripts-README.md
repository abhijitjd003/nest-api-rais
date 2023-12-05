## node-windows setup
Reference: https://github.com/coreybutler/node-windows
npm install -g node-windows@1.0.0-beta.6
npm link node-windows

## how to take build
set NODE_ENV=staging
set NODE_ENV=production
npm run build
## How to execute scripts
cd membercentral_mean
node scripts/windows-service-install.js <production|staging> app

# Examples below:
## Staging Installation:
node scripts/windows-service-install.js staging app

## Staging Uninstallation:
node scripts/windows-service-uninstall.js staging app

----- or if services not running -------
sc delete membercentralapistaging.exe

## Production Installation:
node scripts/windows-service-install.js production app

## Production Uninstallation:
node scripts/windows-service-uninstall.js production app

----- or if services not running -------
sc delete membercentralapistaging.exe
