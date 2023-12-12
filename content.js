
getData();
let getAllData = [];
let colorClick = document.querySelectorAll('.aac-overview-shades .aac-card-shade-swatch');
let code = document.querySelector('#aac-hex-name');
let lastId = null;
let newColorSelect = document.querySelectorAll('.aac-col-pal-cont .aac-card-shade-swatch');
let countValue = 0;
let colorClickLength = colorClick.length;
let newColorSelectLength = newColorSelect.length;

if(colorClick){
    setTimeout(() => {
        setInterval(() => {
            
            if(countValue < colorClickLength){

                colorClick[countValue].click();
                

                setTimeout(() => {
                    const filteredData = getAllData.filter((item) => {
                        return item.code === code.innerHTML;
                    });
                    if(filteredData.length > 0){
                        console.log('Color Match!! Not Inserted');
                        if(countValue == 2){
                            countValue = colorClickLength;
                        }else{
                            countValue++;
                        }
                    }else {
                        let postData = {
                            id: lastId+1,
                            code: document.querySelector('#aac-hex-name').innerHTML,
                            name: document.querySelector('#aac-artyclick-name').innerHTML,
                        };
                        insertData(postData);
                    }
                }, 100);  
                
            }else{
                let newColorValue = getRandomInt(1, 20);
                newColorSelect[newColorValue].click();
                countValue = 0;

            }
        }, 500);
    }, 1000);
}


// Function to generate a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}






// let code = document.querySelector('#aac-hex-name');
// let name = document.querySelector('#aac-artyclick-name');
// let showData = document.querySelector('.dataDisplay');
// let getAllData = [];
// let lastId = null;

// document.addEventListener('mouseup', function(event) {
    // setTimeout(() => {
    //     if(code && name){
    //         const filteredData = getAllData.filter((item) => {
    //             return item.code === code.innerHTML;
    //         });
    //         if(filteredData.length > 0){
    //             console.log('Color Match!! Not Inserted');
    //         }else {
    //             let postData = {
    //                 id: lastId+1,
    //                 code: document.querySelector('#aac-hex-name').innerHTML,
    //                 name: document.querySelector('#aac-artyclick-name').innerHTML,
    //             };
    //             insertData(postData);
    //         }
    //     }
    // }, 100);
// });



function insertData(postData){
    fetch('http://localhost:3000/colors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('insert success:', data);
        getData();
    })
    .catch((error) => {
        console.error('Error inserting data:', error);
    });
}

function getData(){
    fetch('http://localhost:3000/colors', { 
        method: 'GET'
    })
    .then(function(response) { return response.json(); })
    .then(data => {
        getAllData = data;
        lastId = Math.max(...data.map((item) => item.id));
        console.log('Last ID:', lastId);
        // json.map(data => {
        // })
    })
    .catch((error) => {
        console.error('Error Get data:', error);
    });
}