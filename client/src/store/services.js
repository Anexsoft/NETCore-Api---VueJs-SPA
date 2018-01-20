import Axios from 'axios'
import exampleService from '../services/ExampleService'
import studentService from '../services/StudentService'

let apiUrl = 'http://localhost:64550/'

// Axios Configuration
Axios.defaults.headers.common.Accept = 'application/json'

export default {
    exampleService: new exampleService(Axios),
    studentService: new studentService(Axios, apiUrl)
}