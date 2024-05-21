const express = require('express');
const app = express();
const formRoutes = express.Router();
 
let Form = require('../model/Form');
 
//api to add form
formRoutes.route('/add').post(function(req, res){
    console.log(`aqui`)
    let form = new Form (req.body);
    form.save()
        .then(form =>{
            res.status(200).json({ 'status': 'success', 'mssg': 'form added successfully'});
        })
        .catch(err =>{
            res.status(409).send({ 'status': 'failure', 'mssg' : 'unable to save database'});
        });
});
 
//api to get form
formRoutes.route('/getall').get(function(req,res){
    try {
        const forms = Form.find();
        res.status(200).json({ 'status': 'success', 'forms': forms });
    } catch (err) {
        res.status(400).json({ 'status': 'failure', 'msg': 'Something went wrong' });
    };

    // const forms = Form.find();
    //     if (err) {
    //         res.status(400).json({'status': 'failure', 'mssg': 'Something went wrong '});
    //     }
    //     else{
    //         res.status(200).json({'status': 'success', 'forms': forms});
    //     }
    });


 
//api to get form
formRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Form.findById(id, function (err, form){
        if (err) {
            res.status(400).send({'status': 'failure', 'mssg': 'Something went wrong'});
        }
        else{
            res.status(200).json({'status': 'success', 'forms': forms});
        }
    });
});
 
//api to update route
formRoutes.route('/update/:id').put(async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);

        if (!form) {
            return res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        }

        form.title = req.body.title;
        form.description = req.body.description;
        form.year = req.body.year;

        await form.save();
        res.status(200).json({ 'status': 'success', 'mssg': 'Update Complete' });
    } catch (err) {
        res.status(500).json({ 'status': 'failure', 'mssg': 'An error occurred', 'error': err });
    }
});

 
//api for delete
formRoutes.route('/delete/:id').delete(function(req,res){
    Form.findByIdAndRemove({_id: req.params.id},function(err,){
        if (err){
            res.status(400).send({'status' : 'failure', 'mssg': 'Something went wrong'});
        }
        else {
            res.status(200).json({'status': 'success', 'mssg': 'Delete successfully'});
        }
    });
});
 
module.exports = formRoutes;