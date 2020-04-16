const container = document.querySelector('.container');
//gives all the seats in the row class which didnt have the class occupied in it
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');