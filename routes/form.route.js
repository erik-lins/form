const express = require('express');
const formRoutes = express.Router();
const Form = require('../model/Form'); // Supondo que 'Form' seja o seu modelo Mongoose

// API para adicionar formulário
formRoutes.route('/add').post(async (req, res) => {
    try {
        let form = new Form(req.body);
        await form.save();
        res.status(200).json({ 'status': 'success', 'mssg': 'Form added successfully' });
    } catch (err) {
        console.error('Error adding form:', err);
        res.status(409).send({ 'status': 'failure', 'mssg': 'Unable to save to database' });
    }
});

// API para obter todos os formulários
formRoutes.route('/getall').get(async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json({ 'status': 'success', 'forms': forms });
    } catch (err) {
        console.error('Error getting forms:', err);
        res.status(400).json({ 'status': 'failure', 'mssg': 'Something went wrong' });
    }
});

// API para obter um formulário pelo ID
formRoutes.route('/:id').get(async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        }
        res.status(200).json({ 'status': 'success', 'form': form });
    } catch (err) {
        console.error('Error getting form by ID:', err);
        res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
    }
});

// API para atualizar um formulário pelo ID
formRoutes.route('/update/:id').put(async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        }

        form.nome = req.body.nome;
        form.email = req.body.email;
        form.telefone = req.body.telefone;
        form.cep = req.body.cep;
        form.rua = req.body.rua;

        await form.save();
        res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
    } catch (err) {
        console.error('Error updating form:', err);
        res.status(500).json({ 'status': 'failure', 'mssg': 'An error occurred', 'error': err });
    }
});

// API para deletar um formulário pelo ID
formRoutes.route('/delete/:id').delete(async (req, res) => {
    try {
        const result = await Form.findByIdAndRemove(req.params.id);
        if (!result) {
            return res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        }
        res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
    } catch (err) {
        console.error('Error deleting form:', err);
        res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
    }
});

module.exports = formRoutes;
