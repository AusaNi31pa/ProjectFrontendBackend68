import axios from 'axios'


export const remove = async (id) => {
    await axios.delete(process.env.REACT_APP_API + '/movie/' + id)
}

export const create = async (movie) => {
    await axios.post(process.env.REACT_APP_API + '/movie', movie)
}

export const getdata = async () => {
    return await axios.get(process.env.REACT_APP_API + '/movie')
}

export const read = async (id) => {
    return await axios.get(process.env.REACT_APP_API + '/movie/' + id)
}

export const update = async (id, movie) => {
    await axios.put(process.env.REACT_APP_API + '/movie/' + id, movie)
}