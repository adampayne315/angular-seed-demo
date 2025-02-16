import { Router } from 'express';
import { getRealms, createRealm, addVassal, transferVassal } from '../controllers/realmController';

const router = Router();

router.get('/realms', getRealms);
router.post('/realms', createRealm);
router.post('/realms/:realmId/vassals', addVassal);
router.post('/realms/transfer', transferVassal);

export default router;