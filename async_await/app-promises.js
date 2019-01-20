const users = [
    {
        id: 1,
        name: 'Tina',
        schoolId: 101
    }, 
    {
        id: 2,
        name: 'Mina',
        schoolId: 102
    }
];
const grades = [
    {
        id: 1,
        schoolId: 101,
        grade: 80
    },
    {
        id: 2,
        schoolId: 102,
        grade: 100
    },
    {
        id: 3,
        schoolId: 102,
        grade: 70
    }
];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id === id);
        if(user) {
            resolve(user);
        }else{
            reject(`Unable to find user with id: ${id}`);
        }
    })
}

const getGrade = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter(grade => grade.schoolId === schoolId))
    })
}

const getStatus = (userId) => {
    let user;
    return getUser(userId).then(userRes => {
        user = userRes;
        return getGrade(userRes.schoolId)
    }).then(grades => {
        let average = 0;
        if(grades.length > 0){
            average = grades.map(grade => grade.grade).reduce((a,b) => a+b);
            average = average / grades.length;
        }
        return `${user.name} has ${average} in the class`;
    })
}

const getStatusAll = async(userId) => {
    const user = await getUser(userId);
    const grades = await getGrade(user.schoolId);
    console.log(user, grades);
    let average = 0;
    if(grades.length > 0){
        average = grades.map(grade => grade.grade).reduce((a,b) => a+b);
        average = average / grades.length;
    }
    return `${user.name} has ${average} in the class`;
}

getStatusAll(2).then(status => {
    console.log(status);
}).catch(er => console.log(er));