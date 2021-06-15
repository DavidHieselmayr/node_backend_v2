"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express = require('express');
var Controller_1 = require("./Controller/Controller");
var express_1 = __importDefault(require("express"));
//import cors from 'cors';
// Server erzeugen
var server = express_1.default();
var cors = require('cors');
// Static Content aktivieren
// Beispiel: http://localhost:8080/index.html
server.use(express_1.default.static('public'));
// JSON Body parser aktivieren
server.use(express_1.default.json());
// CORS aktivieren
server.use(cors());
server.get('/api/echo', function (request, response) {
    response.send('Hello NodeJS');
});
server.use('/server/api/rest', Controller_1.Controller.handler());
var port = 8080;
server.listen(port, function () {
    console.log("API is listening on port " + port);
});
