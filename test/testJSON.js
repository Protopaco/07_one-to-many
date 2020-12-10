
const testOwner = {
    id: '1',
    owner_name: 'Paul',
    age: 40,
    bald: true
}

const updatedTestOwner = {
    id: '1',
    owner_name: 'Paul',
    age: 40,
    bald: false
}

const testDogs = [{
    id: '1',
    dog_name: 'Paco',
    breed: 'Chihuahua',
    dog_age: 6,
    owner_id: '1'
},
{
    id: '2',
    dog_name: 'Marcus',
    breed: 'Terrier',
    dog_age: 6,
    owner_id: '1'
},
{
    id: '3',
    dog_name: 'Ben',
    breed: 'Dachschund',
    dog_age: 10,
    owner_id: '1'
}];

const updatedTestDog = {
    id: '1',
    dog_name: 'Paco',
    breed: 'Chihuahua',
    dog_age: 7,
    owner_id: '1'
}

module.exports = { testOwner, updatedTestOwner, testDogs, updatedTestDog };