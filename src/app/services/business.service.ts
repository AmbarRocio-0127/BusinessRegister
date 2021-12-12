import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Negocio } from '../models/negocio.mode';
@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private businessCollection: AngularFirestoreCollection<Negocio>;
  private business: Observable<Negocio[]>;

  constructor(private db: AngularFirestore) {
    this.businessCollection = db.collection<Negocio>('business');
    this.business = this.businessCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getBusiness() {
    return this.business;
  }

  getBussine(id: string) {
    return this.businessCollection.doc<Negocio>(id).valueChanges();
  }

  updateBussine(bussine: Negocio, id: string) {
    return this.businessCollection.doc(id).update(bussine);
  }

  addBussine(bussine: Negocio) {
    return this.businessCollection.add(bussine);
  }

  deleteBussine(id: string) {
    return this.businessCollection.doc(id).delete();
  }
}
