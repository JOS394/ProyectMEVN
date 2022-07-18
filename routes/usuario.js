import routerx from 'express-promise-router';
import UsuarioController from '../controllers/UsuarioController';

const router=routerx();

router.post('/login',UsuarioController.login);
router.post('/add',UsuarioController.add);
router.get('/query',UsuarioController.query);
router.get('/list',UsuarioController.list);
router.put('/update',UsuarioController.update);
router.delete('/remove',UsuarioController.remove);
router.put('/activate',UsuarioController.activate);
router.put('/desactivate',UsuarioController.desactivate);

export default router;