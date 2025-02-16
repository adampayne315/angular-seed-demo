export interface Vassal {
    id: string;
    name: string;
  }
  
  export class Realm {
    id: string;
    x: number;
    y: number;
    monarch: string;
    vassals: Vassal[];
  
    constructor(id: string, x: number, y: number, monarch: string) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.monarch = monarch;
      this.vassals = [];
    }
  
    // Add a new vassal to the realm
    addVassal(vassal: Vassal): void {
      this.vassals.push(vassal);
    }
  
    // Transfer a vassal from another realm to this realm
    transferVassal(realm: Realm, vassalId: string): void {
      const index = realm.vassals.findIndex((v) => v.id === vassalId);
      if (index !== -1) {
        const vassal = realm.vassals.splice(index, 1)[0];
        this.vassals.push(vassal);
      }
    }

    // Convert the Realm instance to a plain object for JSON serialization
  toJSON(): object {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      monarch: this.monarch,
      vassals: this.vassals,
    };
  }
  
  }
  
  // In-memory storage for realms
  export const realms: Realm[] = [];