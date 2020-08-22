
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

function AdminRepairs(props) {
    let [inputsobj, stateSet] = useState({
        description: '',
        date: '',
        propId: null
    })

    let [repairRequests, setRepair] = useState([])

    useEffect(() => {
        axios.get('/api/properties').then(res=> console.log(res.data))
        axios.get(`/api/adminrepairs`).then(res => {
            setRepair(ps => res.data)
        })
    }, [])

    const handleChange = (target) => {
        console.log(target)
        const { value, name } = target
        stateSet(ps => {
            return { ...ps, [name]: value }
        })
    }

    const onSubmit = () => {
        console.log('sdfasdfasdfasdfasdfasdf', inputsobj)
        axios.post(`/api/new/repair`, inputsobj).then(res => {
            console.log(res.data)
            setRepair(ps => [ ...ps, res.data])
        })
            .catch(err => alert(err, 'there is an error please message your property mananager'))
        stateSet((ps) => {
            return {
                ...ps,
                description: '',
                date: ''
            }
        })
    }

    return (
        <div>
            <div><p>repair form</p>
                <textarea onChange={(e) => handleChange(e.target)} name='description' value={inputsobj.description} placeholder='whats broken' />
                <input onChange={(e) => handleChange(e.target)} name='date' value={inputsobj.date} type='date' placeholder='when' />
                <button onClick={() => onSubmit()}>Submit For Review</button>
            </div>
            <div>
                {repairRequests.map(repair => (
                    <div key={repair.repair_id}>
                        <p>{repair.occurence_date}</p>
                        <p>{repair.repair_description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default withRouter(AdminRepairs
)