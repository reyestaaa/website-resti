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
                <a href="detail-resto.html?q=${data.id}">${data.name}</a>
                <p>
                    ${data.description.substring(0, 100)}...
                </p>
            </div>
            <div class="card-info">
              <div>
                <i class="rate">Rate ${data.rating} ⭐</i>
              </div>
              <div>
                <a href="detail-resto.html?q=${data.id}" class="card-link">Lihat Restoran</a>
              </div>
            </div>
        </div>
    `;
    $('#restaurant-list').append(card);
}

// get parameter from url
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}