const router = require('express').Router();

const routes = ['session', 'user', 'campaign', 'charity', 'filter','category', 'dashboard','create', 'search'];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}


module.exports = router;
