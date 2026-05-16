import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ObracuniService from "../../services/obracuni/ObracuniService"
import { izracunajNeto } from "../../services/obracuni/izracunNeto"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"

export default function ObracunPromjena(){
    const navigate = useNavigate()
    const params = useParams()
    const [obracun, setObracun] = useState({})
    const [isplaceno, setIsplaceno] = useState(false)
    const [bruto, setBruto] = useState(0)

    useEffect(()=>{
        ObracuniService.getBySifra(params.sifra).then((odgovor)=>{
            setObracun(odgovor.data)
            setIsplaceno(odgovor.data.isplaceno)
            setBruto(odgovor.data.brutoPlaca)
        })
    },[])

    const netoPreview = bruto > 0 ? izracunajNeto(parseFloat(bruto)) : 0

    async function promjeni(obracun) {
        await ObracuniService.promjeni(params.sifra, obracun).then(()=>{ navigate(RouteNames.OBRACUNI) })
    }

    function odradiSubmit(e){
        e.preventDefault()
        const p = new FormData(e.target)
        const brutoVal = parseFloat(p.get('brutoPlaca'))
        promjeni({
            ime: p.get('ime'),
            radnoMjesto: p.get('radnoMjesto'),
            brutoPlaca: brutoVal,
            radniSati: parseInt(p.get('radniSati')),
            prekovremeni: parseInt(p.get('prekovremeni')),
            staz: parseInt(p.get('staz')),
            neto: izracunajNeto(brutoVal),
            isplaceno: isplaceno
        })
    }

    return(
        <>
            <h3>Promjena obračuna plaće</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime i prezime</Form.Label>
                    <Form.Control type="text" name="ime" required defaultValue={obracun.ime}/>
                </Form.Group>
                <Form.Group controlId="radnoMjesto">
                    <Form.Label>Radno mjesto</Form.Label>
                    <Form.Select name="radnoMjesto" value={obracun.radnoMjesto || ''} onChange={(e)=>setObracun({...obracun, radnoMjesto: e.target.value})}>
                        <option>Direktor</option>
                        <option>Voditelj</option>
                        <option>Referent</option>
                        <option>Računovođa</option>
                        <option>Tehničar</option>
                        <option>Skladištar</option>
                        <option>Djelatnik</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="brutoPlaca">
                    <Form.Label>Bruto plaća (€)</Form.Label>
                    <Form.Control type="number" name="brutoPlaca" min="0" step="0.01"
                        defaultValue={obracun.brutoPlaca}
                        onChange={(e)=>setBruto(e.target.value)} />
                </Form.Group>
                {bruto > 0 && (
                    <div style={{padding: '10px', background: '#f0f8f0', borderRadius: '6px', marginBottom: '12px'}}>
                        <strong>Izračunati neto: {netoPreview.toFixed(2)} €</strong>
                        <small style={{display: 'block', color: '#666'}}>
                            MIO I. (15%): {(bruto*0.15).toFixed(2)}€ |
                            MIO II. (5%): {(bruto*0.05).toFixed(2)}€ |
                            Zdravstvo (16.5%): {(bruto*0.165).toFixed(2)}€
                        </small>
                    </div>
                )}
                <Form.Group controlId="radniSati">
                    <Form.Label>Radni sati</Form.Label>
                    <Form.Control type="number" name="radniSati" min="0" max="200" defaultValue={obracun.radniSati}/>
                </Form.Group>
                <Form.Group controlId="prekovremeni">
                    <Form.Label>Prekovremeni sati</Form.Label>
                    <Form.Control type="number" name="prekovremeni" min="0" defaultValue={obracun.prekovremeni}/>
                </Form.Group>
                <Form.Group controlId="staz">
                    <Form.Label>Godine radnog staža</Form.Label>
                    <Form.Control type="number" name="staz" min="0" max="50" defaultValue={obracun.staz}/>
                </Form.Group>
                <Form.Group controlId="isplaceno">
                    <Form.Check label="Isplaćeno" name="isplaceno"
                        checked={isplaceno} onChange={(e)=>setIsplaceno(e.target.checked)}/>
                </Form.Group>
                <Row className="mt-4">
                    <Col><Link to={RouteNames.OBRACUNI} className="btn btn-danger">Odustani</Link></Col>
                    <Col><Button type="submit" variant="success">Promijeni obračun</Button></Col>
                </Row>
            </Form>
        </>
    )
}
