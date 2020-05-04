"use strict";

export class Exhibitionist {
  constructor() {
    this.voyeurs = [];
  }

  addVoyeur(voyeur) {
    this.voyeurs.push(voyeur);
  }

  removeVoyeur(voyeur) {
    this.voyeurs.remove(voyeur);
  }

  notify(data) {
    if (this.voyeurs.length > 0) {
      this.voyeurs.forEach(voyeur => voyeur.update(data));
    }
  }
}

