var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase = null;

function startDB(){

    dataBase = indexedDB.open("objectDb", 1);


    dataBase.onupgradeneeded = function (e) {

        var active = dataBase.result;


        var objectDb = active.createObjectStore("restoFav", {keyPath: 'id'});
    };

    dataBase.onsuccess = function (e) {
        console.log("Success");
    };

    dataBase.onerror = function (e) {
        console.log("Error");
    };
}