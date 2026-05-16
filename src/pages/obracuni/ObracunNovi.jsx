import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import ObracuniService from "../../services/obracuni/ObracuniService"
import { izracunajNeto } from "../../services/obracuni/izracunNeto"

export default function ObracunNovi(){
    const navigate = useNavigate()
    const [bruto, setBruto] = useState(0)
    const [isplaceno, setIsplaceno] = useState(false)

    const netoPreview = bruto > 0 ? izracunajNeto(parseFloat(bruto)) : 0

    async function dodaj(obracun){
        await ObracuniService.dodaj(obracun).then(()=>{ navigate(RouteNames.OBRACUNI) })
    }

    function odradiSubmit(e){
        e.preventDefault()
        const p = new FormData(e.target)
        const brutoVal = parseFloat(p.get('brutoPlaca'))
        dodaj({
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

    return (
        <>
            <h3>Unos novog obračuna plaće</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime i prezime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>
                <Form.Group controlId="radnoMjesto">
                    <Form.Label>Radno mjesto</Form.Label>
                    <Form.Select name="radnoMjesto">
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
                    <Form.Control type="number" name="radniSati" defaultValue={160} min="0" max="200" />
                </Form.Group>
                <Form.Group controlId="prekovremeni">
                    <Form.Label>Prekovremeni sati</Form.Label>
                    <Form.Control type="number" name="prekovremeni" defaultValue={0} min="0" />
                </Form.Group>
                <Form.Group controlId="staz">
                    <Form.Label>Godine radnog staža</Form.Label>
                    <Form.Control type="number" name="staz" defaultValue={0} min="0" max="50" />
                </Form.Group>
                <Form.Group controlId="isplaceno">
                    <Form.Check label="Isplaćeno" name="isplaceno"
                        checked={isplaceno} onChange={(e)=>setIsplaceno(e.target.checked)} />
                </Form.Group>
                <Row className="mt-4">
                    <Col><Link to={RouteNames.OBRACUNI} className="btn btn-danger">Odustani</Link></Col>
                    <Col><Button type="submit" variant="success">Dodaj obračun</Button></Col>
                </Row>
            </Form>
        </>
    )
}
