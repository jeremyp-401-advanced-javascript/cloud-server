'use strict';

const express = require('express');
const Taco = require('../models/TacoModel');
const tacos = new Taco();

const router = express.Router();

// Route Handlers
router.get('/tacos', getAllTacos);
router.get('/tacos/:id', getOneTaco);
router.post('/tacos', createTaco);
router.put('/tacos/:id', updateTaco);
router.delete('/tacos/:id', deleteTaco);

// Get All Records
//     CRUD Operation: Read
//     REST Method: GET
//     Path: /food
//     Returns: An array of objects, each object being one entry from your database

function getAllTacos(req, res) { // ...and all the friends tacos can buy.
  const orderTacos = tacos.get();
  res.status(200).json(orderTacos);
}

// Get One Record
//     CRUD Operation: Read
//     REST Method: GET
//     Path: /food/1
//     Returns: The object from the database, which has the id matching that which is in the path

function getOneTaco(req, res) { // Not sure why you wouAAld when you can have all the tacos.
  const id = parseInt(req.params.id);
  const orderOneTaco = tacos.get(id);
  res.status(200).json(orderOneTaco);
}

// Add a Record
//     CRUD Operation: Create
//     REST Method: POST
//     Path: /food
//     Input: JSON Object in the Request Body
//     Returns: The record that was added to the database.
//         You must generate an ID and attach it to the object
//         You should verify that only the fields you define get saved as a record

function createTaco(req, res) {
  // This should use the object from the request.body
  // We do data validation in the taco class. TACO CLASS!!!
  const makeTaco = tacos.post(req.body);
  res.status(200).json(makeTaco);
}

// Update A Record
//     CRUD Operation: Update
//     REST Method: PUT
//     Path: /food/1
//     Input: JSON Object in the Request Body
//     Returns: The object from the database, which has the id matching that which is in the path, with the updated/changed data
//         You should verify that only the fields you define get saved as a record

function updateTaco(req, res) { // Like, an Asian/Mexican fusion taco? <- Copyright 2020 Me
  const id = parseInt(req.params.id);
  const tacoBody = req.body; // Huh... getAllTacos === tacoBody, but only in meatspace.
  const redefineTaco = tacos.update(id, tacoBody);
  res.status(200).json(redefineTaco); // Status 200, good to go.
}

// Delete A Record
//     CRUD Operation: Destroy
//     REST Method: DELETE
//     Path: /food/1
//     Returns: The record from the database as it exists after you delete it (i.e. null)

function deleteTaco(req, res) { // Basically, the best part of the app... any app, really.
  const id = parseInt(req.params.id);
  const eatTaco = tacos.delete(id); // Mmmmmm...
  res.status(200).json(eatTaco); // Status 200, with congratulations message, maybe.
}

module.exports = router;
