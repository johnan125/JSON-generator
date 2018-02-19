const fs = require('fs');
let firstNames = require('./peopleData').firstName;
let lastNames = require('./peopleData').lastName;

let isEmpty = function(){
    try{
        let fileData = fs.readFileSync("database.json");
    }
    catch(err){
        console.log("database doesn't exist, creating one now");
        people = '{"people":[]}';
        fs.writeFileSync("database.json", people);
    }
}

let getId = function(){
    isEmpty();
    let fileData = fs.readFileSync("database.json");
    fileData.toString();
    fileData = JSON.parse(fileData);
    if(fileData.people.length === 0){
        return 0;
    }
    else{
        index = fileData.people[fileData.people.length-1].id;
        return index;
    }
}
global.counter = getId();

let Person = function(firstName, lastName, age){

    if(typeof firstName === "string" && 
        typeof lastName === "string" &&
        typeof age ==="number"
    ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        global.counter++;
        
        this.writeDataSync = function(){
            this.person = {
                firstName : this.firstName,
                lastName : this.lastName,
                age : this.age,
                id : global.counter
            }

            let fileData = fs.readFileSync("database.json");
            let flag = false;

            fileData.toString();
            fileData = JSON.parse(fileData);
            for(i = 0; i < fileData.people.length; i++){;
                if(fileData.people[i].id === this.person.id){
                    flag = true;
                }
            }

            if(flag === true){
                console.log("sorry, entry already exists");
            }else if(flag === false){
                fileData.people.push(this.person);
            }
            fileData = JSON.stringify(fileData, null, " ");
            fs.writeFileSync("database.json", fileData);
        };

        this.writeData = function(){
            this.person = {
                firstName : this.firstName,
                lastName : this.lastName,
                age : this.age,
                id : global.counter
            }
            let flag = false;
            let fileData = fs.readFile("database.json", (err, data)=>{
                data.toString();
                data = JSON.parse(data);
                for(i = 0; i < data.people.length; i ++){
                    if(data.people[i].id === this.person.id){
                        flag = true;
                    }
                    console.log(data.people[i]);
                }
                if(flag === true){
                    console.log("Sorry, entry already exists");
                }else if(flag === false){
                    data.people.push(this.person);
                    data = JSON.stringify(data, null, " ");
                    fs.writeFile("database.json", data, (err)=>{
                        console.log("written to database async");
                    });
                }
            });


        };
    }
}



let generateDataSync = function(amount){
    if(typeof amount === "number"){
    for(let i = 0; i < amount; i++){
        fIndex = Math.floor(Math.random() * Math.floor(firstNames.length));
        lIndex = Math.floor(Math.random() * Math.floor(lastNames.length));
        age = Math.floor(Math.random() * Math.floor(100));
        let person = new Person(firstNames[fIndex], lastNames[lIndex], age);
        person.writeDataSync();
    }
}else{
    console.log(`Your data is not valid`);
}
};

async function generateData(amount){
    if(typeof amount === "number"){
    let array = [];
    array.length = amount-1;
    array.forEach((item, index)=> {
        fIndex = Math.floor(Math.random() * Math.floor(firstNames.length));
        lIndex = Math.floor(Math.random() * Math.floor(lastNames.length));
        age = Math.floor(Math.random() * Math.floor(100));
        let person = new Person(firstNames[fIndex], lastNames[lIndex], age);
        person.writeData();
    })


//     for(let i = 0; i < amount; i++){
//         fIndex = Math.floor(Math.random() * Math.floor(firstNames.length));
//         lIndex = Math.floor(Math.random() * Math.floor(lastNames.length));
//         age = Math.floor(Math.random() * Math.floor(100));
//         let person = new Person(firstNames[fIndex], lastNames[lIndex], age);
//         person.writeData();
//     }
}else{
    console.log(`Your data is not valid`);
}
};



let addData = function(firstName, lastName, age, cb){
    if(typeof firstName === "string" && 
        typeof lastName === "string" &&
        typeof age ==="number"
    ){
        let person = new Person(firstName, lastName, age);
        person.writeDataSync();
    }
}

module.exports = {generateData, generateDataSync, addData};