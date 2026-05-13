import { useEffect, useState } from "react"
import ObracuniService from "../../services/obracuni/ObracuniService"
import { Button, Table } from "react-bootstrap"
import { FaMoneyBillWave } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function ObracuniPregled(){

    const navigate = useNavigate()
    const [obracuni, setObracuni] = useState([])

    useEffect(()=>{ ucitajObracune() },[])

    async function ucitajObracune() {
        await ObracuniService.get().then((odgovor)=>{ setObracuni(odgovor.data) })
    }

    async function obrisi(sifra) {
        if(!confirm('Sigurno obrisati obracun?')) return
        await ObracuniService.obrisi(sifra)
        ucitajObracune()
    }

    return(
        <>
        <Link to={RouteNames.OBRACUNI_NOVI} className="btn btn-success w-100 my-3">
            Dodaj novi obracun
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Ime i prezime</th>
                    <th>Radno mjesto</th>
                    <th>Bruto (€)</th>
                    <th>Radni sati</th>
                    <th>Prekovremeni</th>
                    <th>Staz (god.)</th>
                    <th>Neto (€)</th>
                    <th>Isplaceno</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {obracuni && obracuni.map((obracun)=>(
                    <tr key={obracun.sifra}>
                        <td>{obracun.ime}</td>
                        <td>{obracun.radnoMjesto}</td>
                        <td>{obracun.brutoPlaca.toFixed(2)}</td>
                        <td>{obracun.radniSati}</td>
                        <td>{obracun.prekovremeni}</td>
                        <td>{obracun.staz}</td>
                        <td><strong>{obracun.neto.toFixed(2)}</strong></td>
                        <td style={{textAlign: 'center'}}>
                            <FaMoneyBillWave
                                size={22}
                                color={obracun.isplaceno ? 'gold' : '#ccc'}
                                className={obracun.isplaceno ? 'ikona-isplaceno' : ''}
                            />
                        </td>
                        <td>
                            <Button onClick={()=>{navigate(`/obracuni/${obracun.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={()=>{obrisi(obracun.sifra)}}>
                                Obrisi
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}
