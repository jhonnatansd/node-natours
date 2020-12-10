const fs = require('fs');
const Tour = require('./../models/tourModel');

//Dummy data
//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        res
        .status(200)
        .json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        //const newId = tours[tours.length - 1].id + 1;
        //const newTour = Object.assign({id: newId}, req.body);//Allow us to create a new object by merging two existing objects
        const newTour = await Tour.create(req.body);

        res
        .status(200)
        .json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!'
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res
        .status(200)
        .json({
            status: 'success',
            data: {
                tour
            }
        });   
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res
        .status(204)//No content
        .json({
            status: 'success',
            data: null
        });   
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
};