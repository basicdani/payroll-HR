import { izracunajNeto } from "./izracunNeto";

export const obracuni = [
    { sifra: 1, ime: 'Ivan Horvat',        radnoMjesto: 'Direktor',     brutoPlaca: 3500, radniSati: 160, prekovremeni: 0,  staz: 25, neto: izracunajNeto(3500), isplaceno: true },
    { sifra: 2, ime: 'Marko Kovač',        radnoMjesto: 'Voditelj',     brutoPlaca: 2800, radniSati: 160, prekovremeni: 8,  staz: 15, neto: izracunajNeto(2800), isplaceno: true },
    { sifra: 3, ime: 'Ana Perić',          radnoMjesto: 'Referent',     brutoPlaca: 1800, radniSati: 160, prekovremeni: 4,  staz: 8,  neto: izracunajNeto(1800), isplaceno: true },
    { sifra: 4, ime: 'Petra Novak',        radnoMjesto: 'Računovođa',   brutoPlaca: 2200, radniSati: 160, prekovremeni: 0,  staz: 12, neto: izracunajNeto(2200), isplaceno: true },
    { sifra: 5, ime: 'Tomislav Blažević',  radnoMjesto: 'Tehničar',     brutoPlaca: 1600, radniSati: 152, prekovremeni: 0,  staz: 5,  neto: izracunajNeto(1600), isplaceno: false },
    { sifra: 6, ime: 'Lucija Marić',       radnoMjesto: 'Skladištar',   brutoPlaca: 1400, radniSati: 160, prekovremeni: 12, staz: 3,  neto: izracunajNeto(1400), isplaceno: false },
    { sifra: 7, ime: 'Nikola Šarić',       radnoMjesto: 'Voditelj',     brutoPlaca: 2600, radniSati: 160, prekovremeni: 0,  staz: 18, neto: izracunajNeto(2600), isplaceno: false }
]
