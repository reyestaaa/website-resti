const HitData = (url, data, type) => {
    return new Promise((resolve, reject) => {
        $.ajax({
        url: url,
        type: type,
        data: data,
        success: (response)=>{
            resolve(response);
        },
        error: (error) => {
            reject(error);
        }
        });
    });
}

var baseUrl = 'https://restaurant-api.dicoding.dev';

const getAllData = async (url = '/list') => {
    try {
        const response = await HitData(baseUrl + '/list', '', 'GET');
        return response
    } catch (error) {
        console.log(error);
    }
}

const getDataById = async (id) => {
    try {
        const response = await HitData(baseUrl + '/detail/' + id, '', 'GET');
        return response
    } catch (error) {
        console.log(error);
    }
}

const setCardToElement = (data) => {
    const card = `
        <div class="card" data-id="${data.id}">
            <img class="card-image" src="https://restaurant-api.dicoding.dev/images/small/${data.pictureId}" alt="">
            <div class="card-content">
                <a href="/">${data.name}</a>
                <p>
                    ${data.description.substring(0, 100)}...
                </p>
            </div>
            <div class="card-info">
              <div>
                <i class="rate">Rate ${data.rating} ⭐</i>
              </div>
              <div>
                <a href="/" class="card-link">Lihat Restoran</a>
              </div>
            </div>
        </div>
    `;
    $('#restaurant-list').append(card);
}

getAllData().then(data => {
    data.restaurants.forEach(element => {
        setCardToElement(element);
    });
})