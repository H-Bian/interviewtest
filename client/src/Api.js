import axios from 'axios'
export default {
    addItem(item, config) {
        return axios.post(`http://localhost:8005/create`, item, config)
    },
    showItem() {
        return axios.get(`http://localhost:8005/show`)

    },
    deleteItem(id) {
        return axios.delete(`http://localhost:8005/delete/${id}`)
    },
    updateItem(item, config) {
        return axios.put(`http://localhost:8005/update`, item, config)
    }

}
