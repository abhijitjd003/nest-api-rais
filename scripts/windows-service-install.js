//0. open cmd prompt as Administrator
//0.1 cd into membercentral_mean folder
//0.2 check if node is installed: node -v
//0.3 check if npm is installed: npm -v
//0.4 npm install -g node-windows@1.0.0-beta.6
//1. npm link node-windows
//2. node scripts/windows-service-install.js

var Service = require('node-windows').Service;

var myArgs = process.argv.slice(2);
var appEnvironment = myArgs[0];
var appType = myArgs[1];

console.log("Environment : " +  appEnvironment);
console.log("AppType : " +  appType);

function getServiceName(appType, appEnvironment){
  var serviceName = "MemberCentralApi";
  var envSuffix = appEnvironment === 'staging' ? 'Staging' : '';
  envSuffix = appEnvironment === 'uat' ? 'UAT' : envSuffix;
  serviceName = serviceName + envSuffix; 
  switch(appType){
    case "app":
      break;
    default: break;
  }

  return serviceName;
}

function getDependentServiceNames(appType, appEnvironment){
  var dependentServices = [];
  switch(appType){
    case "app":
      break;
    default: break;
  }

  return dependentServices;
}

function getServiceDescription(appType, appEnvironment){
  var description = "MemberCentralApi Background Service";
  switch(appType){
    case "app":
      description="MemberCentralApi service runs in the background to server membercentral application via API.";
      break;
    default: break;
  }

  return description;
}

var serviceName = getServiceName(appType, appEnvironment);
var dependencies = getDependentServiceNames(appType, appEnvironment);
var description = getServiceDescription(appType, appEnvironment);

console.log("ServiceName : " +  serviceName);
console.log("DependentServiceNames : " +  dependencies);

// Create a new service object
var svc = new Service({
  name: serviceName,
  description: description,
  script: require('path').join(__dirname + "/../dist/src", 'main.js')
  // workingDirectory: require('path').join(__dirname + "/../"+appFolder+"/service")
  ,env:[{
    name: "NODE_ENV",
    value: appEnvironment
  },
  {
    name:"MEMBERCENTRAL_ENV",
    value: appEnvironment
  }],
  dependencies: [...dependencies]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

// Just in case this file is run twice.
svc.on('alreadyinstalled',function(){
  console.log(svc.name + ' service is already installed.');
});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',function(){
  console.log(svc.name+' started!');
});

// Install the script as a service.
svc.install();
