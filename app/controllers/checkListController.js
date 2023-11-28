import Check from '../models/checkListSchema.js';

const otherController = (req, res) => {
    const username = req.session.username; // Accede al username almacenado en la sesión    
    console.log(username);
    res.json({ message: "Conectó el username del inicio de sesión con checkListController!!!", username: username }); 
};

const createCheckList = async (req, res) => {
    //const { question1, question2, /* Agrega los demás campos del formulario */ } = req.body;
    const { question1, question2} = req.body;
    const user = req.session.username;
    console.log(user);
    // Crea una instancia del modelo de Checklist
    const newChecklist = new Check({
        user:user,
        question1:question1,
        question2:question2,
    }); 
    try {
        await newChecklist.save();
        console.log(user);
        res.json({ message: "Checklist guardado exitosamente", question1, question2 });
    } catch (error) {
        // Envía una respuesta de error si ocurre algún problema al guardar
        res.status(500).json({ error: 'Error al guardar el checklist' });
    }
};

const getCheckList = async (req, res) => {
    try {
        const check = await Check.find(); // Usa el modelo de usuario para buscar blood Pressure
        res.status(200).json(check);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCheckListByUsername = async (req, res) => {   
    const username = req.params.user;
    try {   
        const check = await Check.find({ username });
        if (check.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        } else{
            res.json(check);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const updateCheckList = async (req, res) => {
    const username = req.params.username;
    const { question1, question2} = req.body;

    try {
        let check = await Check.findOne({ username });
        if (!check) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }
        check.question1 = question1;
        check.question2 = question2;
        await check.save();
        res.json({ message: "Datos del check list actualizados con éxito", check });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const deleteCheckList = async (req, res) => {
    const username = req.params.username;
    try {
        const check = await Check.findOneAndDelete({ username });
        if (!check) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }
        res.json({ message: "CheckList eliminado con éxito", blood });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export { 
    otherController,
    createCheckList,
    getCheckList,
    getCheckListByUsername,
    updateCheckList,
    deleteCheckList
};