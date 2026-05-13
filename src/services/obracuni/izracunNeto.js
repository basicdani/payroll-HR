// Izracun neto place po hrvatskim propisima
export function izracunajNeto(bruto) {
    const mio1 = bruto * 0.15        // MIO I. stup 15%
    const mio2 = bruto * 0.05        // MIO II. stup 5%
    const zdravstvo = bruto * 0.165  // Doprinos zdravstvo 16.5%
    const dohodak = bruto - mio1 - mio2
    const osobniOdbitak = 560        // Osnovni osobni odbitak
    const poreznaOsnovica = Math.max(0, dohodak - osobniOdbitak)
    const porez = poreznaOsnovica * 0.20   // Porez 20%
    const prirez = porez * 0.10            // Prirez 10%
    const neto = bruto - mio1 - mio2 - zdravstvo - porez - prirez
    return Math.round(neto * 100) / 100
}
