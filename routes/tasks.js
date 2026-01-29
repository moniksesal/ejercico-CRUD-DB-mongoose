const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

//Crear una tarea
router.post('/create', async (req, res) => {
    try {
        const { title } = req.body
        if (!title) {
            return res.status(400).json({ message: 'El título es obligatorio' })
        }

        const task = await Task.create({ title })
        res.status(201).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear la tarea' })
    }
})

//Traer todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find() //trae todas las tareas
        res.json(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener las tareas' })
    }
})

//Buscar tarea por id
router.get('/id/:_id', async (req, res) => {
    try {
        const { _id } = req.params //tomamos el id de la URL
        const task = await Task.findById(_id) //buscamos la tarea por su id

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' })
        }

        res.json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener la tarea' })
    }
})

//Marcar una tarea como completada
router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const { _id } = req.params

        const task = await Task.findByIdAndUpdate( //actualiza el campo completed a true
            _id,
            { completed: true },
            { new: true } //devuelve la tarea actualizada
        )
        if (!task) {
            return res.status(404).strictContentLength({ message: 'Tarea no encontrada' })
        }

        res.json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al marcar la tarea como completada' })
    }
})

//Actualizar una tarea y que solo se pueda cambiar el título de la tarea
router.put('/id/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const { title } = req.body

        if (!title) {
            return res.status(400).json({ message: 'El título es obligatorio' })
        }

        const task = await Task.findByIdAndUpdate(
            _id,
            { title },
            { new: true } //devuelve la tarea actualizada
        )

        if(!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' })
        }

        res.json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al actualizar la tarea' })
    }
})

//Eliminar una tarea
router.delete('/id/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        
        const task = await Task.findByIdAndDelete(_id)

        if (!task) {
            return res.status(400).json({ message: 'Tarea no encontrada' })
        }

        res.json({ message: 'Tarea eliminada correctamente', task })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al eliminar la tarea' })
    }
})

module.exports = router

/* Task.findByIdAndUpdate >> es un método de moongose que hace 3 cosas en una sola:
- Busca una tarea por su ID,
- La actualiza
- Devuelve un resultado

Por eso su nombre es literal:

find → buscar
ById → por id
AndUpdate → y actualizar
O sea: “buscar por id y actualizar”.
*/