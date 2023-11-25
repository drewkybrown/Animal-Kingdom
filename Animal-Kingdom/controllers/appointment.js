const Appointment = require('../models/appointment');
const Record = require('../models/record');
const Pet = require('../models/pet');
const User = require('../models/users');

module.exports = {
    new: newAppt,
    create,
    index,
}

async function newAppt(req, res, next){
    try{
        const user = await User.findById(req.params.id);
        res.render('records/new',{title: 'New Medical Record', errMsg: '', user});
    }catch(err){
        console.log(err);
    }
}

async function create(req, res, next){
    const appointment = await Appointment.create(req.body);
    try{
        appointment.vet = await User.findById(req.params.id);
        await appointment.save();
        res.redirect(`/user/${req.params}/appointments`);
    }catch(err){
        console.log(err)
        res.redirect(`/user/${req.params}`);
    }
}

async function index(req, res, next){
    try{
        const user = await User.findById(req.params.id);
        const availabilities = await Appointment.find({vet: req.params.id, isAvailable: true});
        res.render('appointments/index', {title: 'Your Availabilities', availabilities, user})
    }catch(err){
        console.log(err);
    }
}