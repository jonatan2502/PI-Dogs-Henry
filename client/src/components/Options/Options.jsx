import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTemperaments } from '../../redux/actions'
import Styles from '../Options/Options.module.css'


export default function Options(props) {
    const temperaments = useSelector((state) => state.temperaments).sort()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTemperaments())
    }, [])

    return (
        <div>
            <label>Order by: </label>
            <select name='orderBy' onChange={(e)=>props.handleOrderBy(e)}>
                <optgroup label='Name'>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                </optgroup>
                <optgroup label='Weight'>
                    <option value='asc'>Min first</option>
                    <option value='desc'>Max first</option>
                </optgroup>
            </select>
            <label>Temperament: </label>
            <select name='filterBy' onChange={(e)=>props.handleFilter(e)}>
                <option value=''>All</option>
                {
                    temperaments.map(e => <option key={e} value={e}>{e}</option>)
                }
                
            </select>
        </div>
    )
}