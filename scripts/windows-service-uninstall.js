//0. open cmd prompt as Administrator
//0.1 cd into membercentral_mean folder
//0.2 check if node is installed: node -v
//0.3 check if npm is installed: npm -v
//0.4 npm install -g node-windows@1.0.0-beta.6
//1. npm link node-windows
//2. node scripts/windows-service-uninstall.js

var Service = require('node-windows').Service;

var myArgs = process.argv.slice(2);
var appEnvironment = myArgs[0];
var appType = myArgs[1];

console.log("Environment : " +  appEnvironment);
console.log("AppType : " +  appType);

function getServiceName(appType, appEnvironment){
  var serviceName = "MemberCentralApi";
  var envSuffix = appEnvironment == 'staging' ? 'Staging' : '';
  envSuffix = appEnvironment === 'uat' ? 'UAT' : envSuffix;
  serviceName = serviceName + envSuffix; 
  switch(appType){
    case "app":
      break;
    default: break;
  }

  return serviceName;
}

var serviceName = getServiceName(appType, appEnvironment);

// appFolder="litmus-app"
// serviceName="SynopsisStaging";

console.log("ServiceName : " +  serviceName);

// Create a new service object
var svc = new Service({
  name: serviceName,
  script: require('path').join(__dirname + "/../dist/src",'main.js')
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log(svc.name + ' uninstall complete.');
  console.log(svc.name + ' service exists: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();