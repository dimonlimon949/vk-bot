
const commands =[] //сдесь хранятся команды

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
}; //нужно для cmd.hear

const businesses2 = require("../spisok/бизнесы.js") //списки бизнесов на $

const businesses=require('../spisok/business spisok.js') // списки бизнесов на гб

let double = require('../database/users.json') //импорт игроков

let fink = true // если стоит true то прибыль в бизнесы будет идти а если стоит false то прибыль не будет идти в бизнесы гб

let fink2 = true // если стоит true то прибыль в бизнесы будет идти а если стоит false то прибыль не будет идти в бизнесы($)

setInterval(async () => {
  if (!fink) {
    return;
  }
  if (fink) {
  double
      .filter((x) => x.bans.ban === false)
      .map((user) => {
        for (let i = 0; i < user.business.length; i++) {
          const biz =
            businesses[user.business[i].id - 1][user.business[i].upgrade - 1];

          if (user.business[i].moneys <= biz.earn * 100)
            user.business[i].moneys += Math.floor(
              (biz.earn / biz.workers) * user.business[i].workers
            );
        }
      });
  }
}, 3600000);

setInterval(async () => {
  if (!fink2) {
    return;
  }
  if (fink2) {
    double
      .filter((x) => x.bans.ban === false)
      .map((user) => {
        for (let i = 0; i < user.business2.length; i++) {
          const biz =
            businesses2[user.business2[i].id - 1][user.business2[i].upgrade - 1];

          if (user.business2[i].moneys <= biz.earn * 100)
            user.business2[i].moneys += Math.floor(
              (biz.earn / biz.workers) * user.business2[i].workers
            );
        }
      });
  }
}, 3600000);

module.exports = commands;