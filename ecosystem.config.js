// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "back",
      script: "yarn",
      args: "workspace back start:dev",
      cwd: process.cwd(),
    },
    {
      name: "front",
      script: "yarn",
      args: "workspace front dev",
      cwd: process.cwd(),
    }
  ]
};
