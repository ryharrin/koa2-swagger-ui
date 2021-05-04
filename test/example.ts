import Koa from 'koa';
import KoaRouter from 'koa-router';

import { koaSwagger } from '../lib';

const app = new Koa();
const router = new KoaRouter();

const config = {
  exposeSpec: true,
  swaggerOptions: {
    spec: {},
    validatorUrl: null,
  },
};
app.use(koaSwagger(config));

export default app;

router.get('/moredocs', koaSwagger({ routePrefix: false }));
router.get(
  '/custom-css',
  koaSwagger({
    ...config,
    routePrefix: false,
    customcss: '#swagger-ui { background-color: red; }',
  }),
);

app.use(router.routes()).use(router.allowedMethods());

// istanbul ignore next
if (module.parent === null) {
  app.listen(3000);
  console.log('listening on: http://localhost:3000/docs');
}
