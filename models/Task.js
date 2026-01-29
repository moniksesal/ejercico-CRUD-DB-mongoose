/*Esto es el modelo de datos para mi colección de tareas en MongoDB, que es NoSQL, lo que significa que
no necesito un esquema, pero si podemos definir cómo deben ser los datos. MongoDB define la estructura
de los documentos:
- Qué campos va a tener cada tarea (title, completed) 
- Qué tipo de dato debe ser cada campo (String, boolean...)
- Si son obligatorios o no (required, default) o si tienen valores por defecto (default)
Y también agrega funcionalidades, como timestraps: true (crea createdAt y updatedAt).
También permite hacer operaciones CRUD fácilmente.
En resumen, es la plantilla de cómo se ven y se manejan mis tareas dentro de la base de datos*/

const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: false
    }
}, { timestamps: true })

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task