(function () {
    if (!window.indexedDB) {
        console.log(`Your browser doesn't support IndexedDB`);
        return;
    }

    const request = indexedDB.open('favresto', 1);
    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };
    
    request.onsuccess = (event) => {
        const db = event.target.result;
        $('#btn-fav').on('click', (e) => {
            var idResto = $(e.target).attr('data-resto');
            getDataById(idResto).then(data => {
                insertFavResto(db, data.restaurant);
            })
        })

        $(document).ready(() => {
            getAllFavRestos(db)
        })

        
   };

     // create the favresto object store and indexes
    request.onupgradeneeded = (event) => {
        let db = event.target.result;

        // create the favresto object store 
        // with auto-increment id
        let store = db.createObjectStore('favresto', {
            autoIncrement: true,
            keyPath: "id",
        });
    };


    function getAllFavRestos(db) {
        var favResto = [];
        const txn = db.transaction('favresto', "readonly");
        const objectStore = txn.objectStore('favresto');

        objectStore.openCursor().onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                cursor.continue()
                favResto.push(cursor.value)
            }
        };
        // close the database connection
        txn.oncomplete = function () {
            if(favResto.length > 0){
                $('#alert-fav').hide()
                favResto.forEach(element => {
                    setCardToElement2(element)
                });
            }

            $('.btn-delete-fav').on('click', (e) => {
                var idResto = $(e.target).attr('data-id');
                if(confirm("Yakin untuk menghapus data dari favorit?")){
                    deleteFavResto(db, idResto)
                }
            })
        };
    }

    function insertFavResto(db, FavResto) {
        // create a new transaction
        const txn = db.transaction('favresto', 'readwrite');
    
        // get the favresto object store
        const store = txn.objectStore('favresto');
        //
        let query = store.put(FavResto);
    
        // handle success case
        query.onsuccess = function (event) {
            console.log(event);
        };
    
        // handle the error case
        query.onerror = function (event) {
            console.log(event.target.errorCode);
        }
    
        // close the database once the 
        // transaction completes
        txn.oncomplete = function () {
            alert('Restaurant added to favorites');
        };
    }

    function getFavRestoById(db, id) {
        const txn = db.transaction('favresto', 'readonly');
        const store = txn.objectStore('favresto');

        let query = store.get(id);

        var restoById = {};
        query.onsuccess = (event) => {
            if (!event.target.result) {
                console.log(`The FavResto with ${id} not found`);
            } else {
                restoById = event.target.result
            }
        };

        query.onerror = (event) => {
            console.log(event.target.errorCode);
        }

        txn.oncomplete = function () {
        };
    };

    function deleteFavResto(db, id) {
        // create a new transaction
        const txn = db.transaction('favresto', 'readwrite');

        // get the favresto object store
        const store = txn.objectStore('favresto');
        //
        let query = store.delete(id);

        // handle the success case
        query.onsuccess = function (event) {
            console.log(event);
        };

        // handle the error case
        query.onerror = function (event) {
            console.log(event.target.errorCode);
        }

        // close the database once the 
        // transaction completes
        txn.oncomplete = function () {
            alert('Berhasil hapus dari favori')
            window.location.reload()
        };

    }

 })();
