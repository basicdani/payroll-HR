import { obracuni } from "./ObracuniPodaci";

async function get(){ return {data: [...obracuni]} }
async function getBySifra(sifra){ return {data: obracuni.find(o => o.sifra === parseInt(sifra))} }
async function dodaj(obracun){
    obracun.sifra = obracuni.length === 0 ? 1 : obracuni[obracuni.length-1].sifra + 1
    obracuni.push(obracun)
}
async function promjeni(sifra, obracun){
    const i = obracuni.findIndex(o => o.sifra === parseInt(sifra))
    obracuni[i] = {...obracuni[i], ...obracun}
}
async function obrisi(sifra){
    obracuni.splice(obracuni.findIndex(o => o.sifra === parseInt(sifra)), 1)
}
export default{ get, getBySifra, dodaj, promjeni, obrisi }
