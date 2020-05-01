"use eurstrict";

export class Exhibitionist {
  constructor(){
    this.voyeurs = new Map();
  }

  addVoyeur( voyeur ) {
    this.voyeurs.set(voyeur.id, voyeur);
  }

  removeVoyeur( voyeur ){
    this.voyeurs.delete( voyeur.id );
  }

  notify( data ){
    if ( this.voyeurs.length > 0 ){
      this.voyeurs.forEach( (key, obj ) => obj.update(data) );
    }
  }
}

