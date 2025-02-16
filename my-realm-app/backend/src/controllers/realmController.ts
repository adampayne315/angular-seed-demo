import { Request, Response } from 'express';
import { Realm, realms, Vassal } from '../models/realm';

export const getRealms = (req: Request, res: Response) => {
  res.json(realms);
};

export const createRealm = (req: Request, res: Response) => {
  const { id, x, y, monarch } = req.body;
  console.log('Create Realm body: id=', id, ' x=', x, ' y=', y, ' monarch=', monarch); // Debugging log
  const newRealm = new Realm(id, x, y, monarch);
  console.log('New Realm: ', newRealm.toJSON());
  realms.push(newRealm);
  res.status(201).json(newRealm.toJSON());
};

export const addVassal = (req: Request<{ realmId: string }, any, { id: string; name: string }>, res: Response): void => {
  const { realmId } = req.params;
  const { id, name } = req.body;

  console.log('Current Realms:', realms); // Debugging log

  const realm = realms.find((r) => r.id === realmId);
  if (!realm) {
    res.status(404).json({ message: 'Realm not found' });
    return;
  }
  const newVassal: Vassal = { id, name };
  realm.addVassal(newVassal);
  res.status(201).json(newVassal);
};

export const transferVassal = (req: Request<any, any, { fromRealmId: string; toRealmId: string; vassalId: string }>, res: Response): void => {
  const { fromRealmId, toRealmId, vassalId } = req.body;
  const fromRealm = realms.find((r) => r.id === fromRealmId);
  const toRealm = realms.find((r) => r.id === toRealmId);
  if (!fromRealm || !toRealm) {
    res.status(404).json({ message: 'Realm not found' });
    return;
  }
  toRealm.transferVassal(fromRealm, vassalId);
  res.json({ message: 'Vassal transferred successfully' });
};