const {users} = require('./user.js');

const resources = {
  sheep: 19,
  lumber: 19,
  brick: 19,
  wheat: 19,
  ore: 19
};

// var resources = {};

const newResources = () => {
  // resources = JSON.parse(JSON.stringify(resourceMaster));
  for (var resource in resources) {
    resources[resource] = 19;
  }
}

const drawResource = (user, resource) => {
  if (resources[resource] > 0) {
    if (!users[user][resource]) {
      users[user][resource] = 1;
      resources[resource] -= 1;
    } else {
      users[user][resource] += 1;
      resources[resource] -= 1;
    }
  }
}

const spendResource = (user, resource) => {
  users[user][resource] -= 1;
  resources[resource] += 1;
}

module.exports = {
  newResources,
  drawResource,
  spendResource,
  resources
}